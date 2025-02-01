<script>
  import MobileFrame from "$lib/MobileFrame.svelte";
  import { selectedChannel } from "$lib/stores";
  import { onMount, onDestroy } from "svelte";
  import channel3Audio from "$lib/assets/channel3.mp3";

  let channelId;
  let audio = new Audio();
  let websocket;
  let eventReceived = false;
  let showSavingStream = true;
  let textbookDownloading = false;
  let textbookDownloaded = false;
  let showQuiz = false;
  let currentQuestionIndex = 0;
  let userAnswer = null;

  const quiz = [
    { question: "What is 2 + 2?", options: ["3", "4", "5"], correct: "4" },
    { question: "What is the capital of France?", options: ["Berlin", "Paris", "Rome"], correct: "Paris" },
    { question: "Which is a primary color?", options: ["Green", "Red", "Purple"], correct: "Red" }
  ];

  $: if ($selectedChannel) {
    channelId = $selectedChannel;
  }

  onMount(() => {
    if (!channelId) {
      window.location.href = "/";
      return;
    }

    if (channelId === 3) {
      audio.src = channel3Audio;
    } else {
      const timestamp = new Date().getTime();
      audio.src = `http://localhost:8000/stream/${channelId}?t=${timestamp}`;
    }
    audio.play().catch(err => console.error("Error playing audio:", err));

    websocket = new WebSocket(`ws://localhost:8000/ws/${channelId}`);

    websocket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.event === "timestamp_reached") {
          if (channelId === 2) {
            eventReceived = true;
            setTimeout(() => {
              eventReceived = false;
            }, 5000);
          }

          if (channelId === 1 && !textbookDownloading && !textbookDownloaded) {
            textbookDownloading = true;
            setTimeout(() => {
              textbookDownloading = false;
              textbookDownloaded = true;
            }, 10000);
          }
        }
      } catch (err) {
        console.error("WebSocket error:", err);
      }
    };

    websocket.onerror = (err) => console.error("WebSocket Error:", err);
    websocket.onclose = () => console.log("WebSocket closed.");

    if (channelId === 3) {
      setTimeout(() => {
        showQuiz = true;
      }, 6000);
    }

    setTimeout(() => {
      showSavingStream = false;
    }, 3000);
  });

  onDestroy(() => {
    audio.pause();
    audio.src = "";
    if (websocket) websocket.close();
  });

  function goBack() {
    selectedChannel.set(null);
    window.location.href = "/";
  }

  function selectAnswer(option) {
    userAnswer = option;
    setTimeout(() => {
      currentQuestionIndex++;
      userAnswer = null;
      if (currentQuestionIndex >= quiz.length) {
        showQuiz = false;
        currentQuestionIndex = 0;
      }
    }, 2000);
  }
</script>

<MobileFrame>
  {#if channelId}
    <div class="h-full w-full flex flex-col items-center p-6 bg-black text-white relative">
      <div class="w-full flex items-center justify-center py-4 border-b border-gray-700">
        <h2 class="text-2xl font-bold text-cyan-400">Streaming Channel {channelId}</h2>
      </div>

      <div class="flex-1 flex items-center justify-center">
        {#if (channelId === 2 && eventReceived) || (channelId === 3 && showQuiz)}
          <div class="w-full h-40 bg-gray-700 mt-4 flex items-center justify-center rounded-lg p-4">
            {#if channelId === 2}
              <span class="text-white">[Placeholder for Event Content]</span>
            {/if}

            {#if channelId === 3 && showQuiz}
              <div class="bg-gray-800 border border-cyan-400 rounded-lg p-4 w-64 text-center">
                <h3 class="text-xl font-bold text-cyan-400 mb-2">{quiz[currentQuestionIndex].question}</h3>
                <div class="space-y-2">
                  {#each quiz[currentQuestionIndex].options as option}
                    <button
                      class="w-full py-2 rounded-md border border-cyan-400 text-white font-semibold transition-all duration-200
                        {userAnswer === option ? (option === quiz[currentQuestionIndex].correct ? 'bg-green-500' : 'bg-red-500') : 'bg-gray-700 hover:bg-cyan-500'}"
                      on:click={() => selectAnswer(option)}
                      disabled={userAnswer}
                    >
                      {option}
                    </button>
                  {/each}
                </div>
              </div>
            {/if}
          </div>
        {:else}
        <div class="boxContainer">
          <div class="box box1"></div>
          <div class="box box2"></div>
          <div class="box box3"></div>
          <div class="box box4"></div>
          <div class="box box5"></div>
        </div>
        {/if}
      </div>

      <div class="absolute bottom-6 max-w-sm">
        <button
          class="bg-red-500 text-white px-4 py-2 rounded-lg active:scale-[0.98] transition-transform duration-200"
          on:click={goBack}
        >
          Stop Listening
        </button>
      </div>
    </div>
  {/if}
</MobileFrame>


<style>
@keyframes quiet {
  25%{
    transform: scaleY(.6);
  }
  50%{
    transform: scaleY(.4);
  }
  75%{
    transform: scaleY(.8);
  }
}

@keyframes normal {
  25%{
    transform: scaleY(1);
  }
  50%{
    transform: scaleY(.4);
  }
  75%{
    transform: scaleY(.6);
  }
}
@keyframes loud {
  25%{
    transform: scaleY(1);
  }
  50%{
    transform: scaleY(.4);
  }
  75%{
    transform: scaleY(1.2);
  }
}
body{
  display: flex;
  justify-content: center;
  background: black;
  margin: 0;padding: 0;
  align-items: center;
  height: 100vh;
}

.boxContainer{
  display: flex;
  justify-content: space-between;
  height: 64px;
  --boxSize: 8px;
  --gutter: 4px;
  width: calc((var(--boxSize) + var(--gutter)) * 5);
}

.box{
  transform: scaleY(.4);
  height: 100%;
  width: var(--boxSize);
  background: #12E2DC;
  animation-duration: 1.2s;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
  border-radius: 8px;
}

.box1{
  animation-name: quiet;
}

.box2{
  animation-name: normal;
}

.box3{
  animation-name: quiet;
}

.box4{
  animation-name: loud;
}

.box5{
  animation-name: quiet;
}
</style>
