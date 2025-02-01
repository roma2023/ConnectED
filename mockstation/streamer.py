import asyncio
import time
import json
import subprocess
from collections import defaultdict
from fastapi import FastAPI, WebSocket, UploadFile, File, Form, HTTPException
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
import shutil
import os

app = FastAPI()

# Enable CORS
origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

subjectChannels = {
    "English": 1,
    "Math": 2,
}

CHANNELS = {}

class AudioStreamManager:
    def __init__(self):
        self.clients = defaultdict(list)  # Key: channel_id, Value: list of client infos

    async def handle_websocket(self, websocket: WebSocket, channel_id: int):
        await websocket.accept()
        client_start_time = time.time()
        channel_config = CHANNELS.get(channel_id)
        if not channel_config:
            await websocket.close(code=4001, reason="Invalid channel ID")
            return

        event_states = {}
        for event_time in channel_config["events"]:
            event_states[event_time] = {
                "next_occurrence": client_start_time + event_time
            }

        client_info = {
            "websocket": websocket,
            "start_time": client_start_time,
            "event_states": event_states
        }
        self.clients[channel_id].append(client_info)
        
        try:
            while True:
                # Keep connection alive
                await websocket.receive_text()
        except:
            pass
        finally:
            self.remove_client(channel_id, client_info)

    def remove_client(self, channel_id, client_info):
        self.clients[channel_id] = [c for c in self.clients[channel_id] if c != client_info]

    async def check_events(self):
        while True:
            for channel_id in list(self.clients.keys()):
                channel_config = CHANNELS.get(channel_id)
                if not channel_config:
                    continue
                loop_duration = channel_config["loop_duration"]
                events = channel_config["events"]
                clients = self.clients[channel_id].copy()
                for client_info in clients:
                    current_time = time.time()
                    websocket = client_info["websocket"]
                    start_time = client_info["start_time"]
                    event_states = client_info["event_states"]
                    for event_time in events:
                        event_state = event_states.get(event_time)
                        if not event_state:
                            event_state = {"next_occurrence": start_time + event_time}
                            event_states[event_time] = event_state
                        next_occ = event_state["next_occurrence"]
                        if current_time >= next_occ:
                            message = json.dumps({
                                "event": "timestamp_reached",
                                "timestamp": event_time,
                                "next_occurrence": next_occ + loop_duration
                            })
                            try:
                                await websocket.send_text(message)
                            except:
                                self.remove_client(channel_id, client_info)
                                break
                            event_state["next_occurrence"] += loop_duration
            await asyncio.sleep(0.1)

manager = AudioStreamManager()

@app.on_event("startup")
async def startup_event():
    asyncio.create_task(manager.check_events())

@app.post("/upload")
async def upload_file(file: UploadFile = File(...), filename: str = Form(...), section: str = Form(...), loopTime: int = Form(...), numEvents: int = Form(...)):
    if not file.filename.endswith(".mp3"):
        return {"error": "Only MP3 files are allowed"}

    file_path = os.path.join(os.path.curdir, filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    channel_id = subjectChannels.get(section)
    if not channel_id:
        return {"error": "Invalid section"}

    CHANNELS[channel_id] = {
        "audio_file": file_path,
        "loop_duration": loopTime,
        "events": [i * (loopTime // numEvents) for i in range(1, numEvents + 1)],
        "section": section
    }

    print(f"File uploaded successfully: {file_path}")
    print(f"Channel ID: {channel_id}")
    print(f"Section: {section}")
    print(f"Loop Time: {loopTime}")
    print(f"Number of Events: {numEvents}")

    return {"message": "File uploaded successfully", "channel_id": channel_id}

@app.websocket("/ws/{section}")
async def websocket_endpoint(websocket: WebSocket, section: str):
    channel_id = subjectChannels.get(section)
    if not channel_id:
        await websocket.close(code=4001, reason="Invalid section")
        return
    await manager.handle_websocket(websocket, channel_id)

@app.get("/stream/{section}")
def audio_stream(section: str):
    channel_id = subjectChannels.get(section)
    if not channel_id:
        print(f"Section {section} not found")
        raise HTTPException(status_code=404, detail="Section not found")

    config = CHANNELS.get(channel_id)
    if not config:
        print(f"Channel {channel_id} not found")
        raise HTTPException(status_code=404, detail="Channel not found")
    if config["section"] != section:
        print(f"Access forbidden: Channel section is {config['section']}, requested section is {section}")
        raise HTTPException(status_code=403, detail="Access to this section is forbidden")

    def generate(channel_id: int):
        audio_file = config["audio_file"]
        loop_duration = config["loop_duration"]
        start_time = time.time()
        elapsed_time = start_time % loop_duration
        ffmpeg_cmd = [
            'ffmpeg',
            '-ss', str(elapsed_time),
            '-i', audio_file,
            '-f', 'mp3',
            '-acodec', 'libmp3lame',
            '-'
        ]
        proc = subprocess.Popen(ffmpeg_cmd, stdout=subprocess.PIPE, stderr=subprocess.DEVNULL)
        try:
            while True:
                data = proc.stdout.read(1024 * 4)
                if not data:
                    break
                yield data
        finally:
            proc.terminate()
            try:
                proc.wait(timeout=0.1)
            except:
                pass

    return StreamingResponse(
        generate(channel_id),
        media_type="audio/mpeg",
        headers={"Cache-Control": "no-cache"}
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
    