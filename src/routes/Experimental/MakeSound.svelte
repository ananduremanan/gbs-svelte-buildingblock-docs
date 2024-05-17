<script lang="ts">
  import { MakeSound } from "@grampro/svelte-block/makesound";
  import Button from "@grampro/svelte-block/Button.svelte";

  const playClickSound = MakeSound("/sounds/click.mp3");

  const sounds = [
    {
      name: "Kick",
      sound: MakeSound("sounds/beat/kick.mp3"),
      icon: "/icons/kick.webp",
    },
    {
      name: "Snare",
      sound: MakeSound("sounds/beat/snare.wav"),
      icon: "/icons/snare.webp",
    },
    {
      name: "Hi-Hat",
      sound: MakeSound("sounds/beat/cymbal.wav"),
      icon: "/icons/cymbal.webp",
    },
    {
      name: "Perc",
      sound: MakeSound("sounds/beat/perc.wav"),
      icon: "/icons/tambourine.webp",
    },
  ];

  let clickedIndex: any = null;

  function handleButtonClick(index: any, isMusic: boolean) {
    if (!isMusic) {
      playClickSound();
    } else {
      sounds[index].sound();
      clickedIndex = index;
    }
  }

  function handleKeyDown(event: any) {
    const index = Number(event.key) - 1;
    if (index >= 0 && index < sounds.length) {
      handleButtonClick(index, true);
    }
  }
</script>

<Button on:click={playClickSound}>Click to Make Sound</Button>

<div class="mt-4 grid grid-cols-2 gap-4 h-80 w-80">
  {#each sounds as { name, icon }, index}
    <Button
      outline
      class={`${index === clickedIndex ? "border-4 border-red-500" : ""}w-30 h-15 focus:outline-none hover:text-blue-700 flex flex-col items-center justify-center dark:text-white`}
      on:click={() => handleButtonClick(index, true)}
      on:keydown={handleKeyDown}
    >
      <img src={icon} alt={icon} class="w-10 h-10" />
      {name}</Button
    >
  {/each}
</div>

<div class="mt-4 text-xs text-gray-400">
  Use Keys 1 for Kick, 2 for snare, 3 for Cymbal and 4 for perc
</div>
