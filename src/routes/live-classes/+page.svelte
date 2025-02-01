<script>
    import { onMount } from "svelte";
    import { writable } from "svelte/store";
    import MobileFrame from '$lib/MobileFrame.svelte';
	  import { goto } from "$app/navigation";
    import { selectedChannel } from "$lib/stores";

    let firstVisit = writable(true);
    let showUSB = writable(false);
    let showSearching = writable(false);
    let showStations = writable(false);

    let isClickedHome = false;

    function gotoHome() {
        isClickedHome = true;
        setTimeout(() => {
            goto('/');
            isClickedHome = false;
        }, 200);
    }

    let stations = [
        { id: 1, subject: "English", frequency: "60.1 FM" },
        { id: 2, subject: "Math", frequency: "61.1 FM" },
        { id: 3, subject: "Science", frequency: "62.1 FM" }
    ];

    function tuneIn(station) {
        selectedChannel.set(station);
        goto("/stream");
    }

    onMount(() => {
        // Check if user has visited before
        if (localStorage.getItem("visited-live-classes")) {
            firstVisit.set(false);
            showStations.set(true);
        } else {
            localStorage.setItem("visited-live-classes", "true");
            firstVisit.set(true);

            // Sequence of animations
            setTimeout(() => showUSB.set(true), 1000); // Show USB after 1s
            setTimeout(() => {
                showUSB.set(false);
                showSearching.set(true);
            }, 4000); // Show searching after another 1s
            setTimeout(() => {
                showSearching.set(false);
                showStations.set(true);
            }, 6000); // Show stations after searching for 2s
        }
    });
</script>

<MobileFrame>
    <div class="h-full w-full flex flex-col items-center p-6 bg-black text-white">
        <!-- Navbar -->
      <div class="w-full flex items-center justify-between py-4 border-b border-gray-700 px-4">
          <h1 class="text-2xl font-bold text-cyan-400">ConnectED</h1>
          <div class="flex flex-col items-center">
              <div class="loader">
                  <div></div>
                  <div></div>
                  <div></div>
              </div>
              <span class="mt-1 text-white text-sm">Tuning...</span>
          </div>
      </div>

      
        <!-- USB Detection -->
        {#if $showUSB}
          <div class="flex items-center justify-center min-h-1/4">
            <div class="mt-16 flex flex-col items-center">
                <div class="mt-16 flex justify-center">
                    <span class="material-icons animate-pulse text-6xl">usb</span>
                </div>
                <p class="mt-4 text-lg">Please plug in your radio device.</p>
            </div>
            </div>
        {/if}

        <!-- Searching for Radio -->
        {#if $showSearching}
          <div class="flex items-center justify-center min-h-1/4">
            <div class="mt-16 flex flex-col items-center">
                <div class="mt-16 flex justify-center">
                    <span class="material-icons animate-pulse text-6xl">search</span>
                </div>
                <p class="mt-4 text-lg">Searching for Radio...</p>
            </div>
            </div>
        {/if}

        <!-- Available Radio Stations -->
        {#if $showStations}
            <div class="mt-8 w-full max-w-sm p-4 border border-cyan-400 rounded-lg text-center">
                <h2 class="text-xl font-bold">Available Radio Stations</h2>

                <div class="mt-4 space-y-3">
                  {#each stations as station}
                      <button 
                          class="w-full flex justify-between items-center p-3 bg-gradient-to-r from-blue-500 to-gray-600 rounded-lg text-white font-semibold active:scale-[0.98] squish-animation"
                          on:click={() => tuneIn(station.id)}
                      >
                          <span>{station.subject}</span>
                          <span class="text-gray-300 italic">{station.frequency}</span>
                      </button>
                  {/each}
              </div>
            </div>
        {/if}

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

<!-- Tailwind Animations -->
<style>
    @keyframes float {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
    }

    .animate-float {
        animation: float 3s ease-in-out infinite;
    }

    /* HTML: <div class="loader"></div> */
    .loader {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 6px;
  }

  .loader div {
    width: 8px;
    height: 8px;
    background-color: white;
    border-radius: 50%;
    animation: bounce 1.2s infinite ease-in-out;
  }

  .loader div:nth-child(1) {
    animation-delay: 0s;
  }

  .loader div:nth-child(2) {
    animation-delay: 0.2s;
  }

  .loader div:nth-child(3) {
    animation-delay: 0.4s;
  }

  @keyframes bounce {
    0%, 80%, 100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-8px);
    }
  }
</style>

