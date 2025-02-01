<script>
  import MobileFrame from '$lib/MobileFrame.svelte';
  import { goto } from '$app/navigation';
	import PdfViewer from 'svelte-pdf';
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
  <div class="h-full w-full p-4 bg-black text-white flex flex-col items-center">
      <!-- Navbar -->
      <div class="w-full text-center border-b border-gray-700 pb-4">
          <h1 class="text-2xl font-bold text-cyan-400">English Content</h1>
      </div>

      <!-- PDF Viewer Section -->
      <div class="flex-1 w-full overflow-y-auto mt-4 flex justify-center">
        <PdfViewer url='https://raw.githubusercontent.com/vinodnimbalkar/svelte-pdf/369db2f9edbf5ab8c87184193e1404340729bb3a/public/sample.pdf' scale=1/>
      </div>

      <!-- Back Button -->
      <div class="fixed bottom-6 max-w-sm w-full px-6">
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