<script>
    import MobileFrame from '$lib/MobileFrame.svelte';
    import { goto } from '$app/navigation';
    let isClickedHome = false;

    function gotoHome() {
        isClickedHome = true;
        setTimeout(() => {
            goto('/');
            isClickedHome = false;
        }, 200);
    }
</script>

<MobileFrame>
    <div class="h-full w-full p-6 bg-black text-white flex flex-col items-center">
        <!-- Navbar -->
        <div class="w-full text-center border-b border-gray-700 pb-4">
            <h1 class="text-2xl font-bold text-cyan-400">Saved Content</h1>
        </div>

        <!-- Bookshelf Section -->
        <div class="flex-1 w-full grid grid-cols-2 gap-4 mt-6">
            {#each Array(6) as _, i}
                <div class="bg-gray-800 border border-cyan-400 rounded-lg p-4 flex flex-col items-center shadow-md">
                    <div class="w-16 h-20 bg-cyan-500 rounded-sm mb-2"></div>
                    <p class="text-sm text-white font-semibold">Book {i + 1}</p>
                </div>
            {/each}
        </div>

        <div class="absolute bottom-6 max-w-sm">
          <!-- Back Button -->
          <button 
              on:click={gotoHome}
              class="w-full text-center p-3 bg-gradient-to-r from-blue-500 to-gray-600 rounded-lg text-white font-bold
                    hover:from-blue-600 hover:to-gray-700 hover:shadow-lg
                    active:scale-[0.98] active:brightness-110
                    transition-all duration-200 {isClickedHome ? 'squish-animation' : ''}"
          >
              Back to Home
          </button>
        </div>
    </div>
</MobileFrame>

<style>
    .shelf {
        border-top: 4px solid #4ade80; /* Green shelf border */
    }
</style>