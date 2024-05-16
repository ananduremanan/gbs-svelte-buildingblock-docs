<script lang="ts">
  import { MakeSound } from "@grampro/svelte-block/makesound";
  import Button from "@grampro/svelte-block/Button.svelte";

  const playClickSound = MakeSound("/sounds/click.mp3");

  const sounds = [
    { name: "Kick", sound: MakeSound("sounds/beat/kick.mp3") },
    { name: "Snare", sound: MakeSound("sounds/beat/snare.wav") },
    { name: "Cymbal", sound: MakeSound("sounds/beat/cymbal.wav") },
    { name: "Perc", sound: MakeSound("sounds/beat/perc.wav") },
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
  {#each sounds as { name }, index}
    <Button
      outline
      class={`${index === clickedIndex ? "border border-blue-500" : ""}w-30 h-15`}
      on:click={() => handleButtonClick(index, true)}
      on:keydown={handleKeyDown}>{name}</Button
    >
  {/each}
</div>

<div class="mt-4 text-xs text-gray-400">
  Use Keys 1 for Kick, 2 for snare, 3 for Cymbal and 4 for perc
</div>
