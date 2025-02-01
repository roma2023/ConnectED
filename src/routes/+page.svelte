<script>
    import MobileFrame from '$lib/MobileFrame.svelte';
    import { goto } from '$app/navigation';
    
    var isLiveClicked = false;
    var isSavedClicked = false;

    function gotoLiveClasses() {
        isLiveClicked = true;
        setTimeout(() => {
            goto('/live-classes');
            isLiveClicked = false;
        }, 200);
    }

    function gotoSavedContent() {
        isSavedClicked = true;
        setTimeout(() => {
            goto('/saved-content');
            isSavedClicked = false;
        }, 200);
    }

    function gotoEnglishTextbook() {
        goto('/english-content'); // Placeholder route
    }
</script>

<MobileFrame>
    <div class="h-full w-full flex flex-col justify-between p-6 bg-black text-white">
        <!-- Top Section -->
        <div class="flex flex-col items-center justify-center flex-grow">
            <!-- Logo -->
            <div class="mt-4">
                <img src="$lib/assets/logoNew.png" alt="ConnectED Logo" class="w-100 h-100" />
            </div>

            <!-- Title -->
            <h1 class="text-4xl font-bold text-cyan-400 mt-1">ConnectED</h1>

            <!-- Subtitle -->
            <p class="text-lg font-semibold mt-4">Jump back in...</p>

            <!-- Progress Cards -->
            <div class="mt-6 flex gap-4">
                <!-- English Card -->
                <div 
                    class="w-28 p-4 border border-cyan-400 rounded-lg text-center cursor-pointer hover:bg-gray-800 transition duration-200"
                    on:click={gotoEnglishTextbook}
                >
                    <div class="flex justify-center mb-2">
                        <!-- Google Material Book Icon -->
                        <span class="material-icons text-cyan-400 text-5xl">
                            menu_book
                        </span>
                    </div>
                    <p class="text-white font-semibold">English</p>
                    <div class="w-full bg-gray-700 h-2 mt-2 rounded">
                        <div class="bg-cyan-400 h-2 rounded" style="width: 30%;"></div>
                    </div>
                    <p class="mt-1">30%</p>
                </div>

                <!-- Math Progress Card -->
                <div class="w-28 p-4 border border-cyan-400 rounded-lg text-center">
                    <div class="flex justify-center mb-2">
                        <!-- Google Material Math Icon -->
                        <span class="material-icons text-cyan-400 text-5xl">
                            functions
                        </span>
                    </div>
                    <p class="text-white">Math</p>
                    <div class="w-full bg-gray-700 h-2 mt-2 rounded">
                        <div class="bg-cyan-400 h-2 rounded" style="width: 50%;"></div>
                    </div>
                    <p class="mt-1">50%</p>
                </div>
            </div>
        </div>

        <!-- Buttons -->
        <div class="w-full flex flex-col gap-3 mb-6">
            <button 
                class="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-lg
                transition-all duration-200 active:scale-[0.98] active:brightness-110
                {isLiveClicked ? 'squish-animation' : ''}"
                on:click={gotoLiveClasses}>
                Live Classes
            </button>
            <button 
                class="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-lg
                transition-all duration-200 active:scale-[0.98] active:brightness-110
                {isSavedClicked ? 'squish-animation' : ''}"
                on:click={gotoSavedContent}>
                Saved Content
            </button>
        </div>
    </div>
</MobileFrame>

<style>
    .squish-animation {
        animation: squish 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }

    @keyframes squish {
        50% {
            transform: scale(0.95, 0.85);
        }
        100% {
            transform: scale(1);
        }
    }
</style>