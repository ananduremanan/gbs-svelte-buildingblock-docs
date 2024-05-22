<script lang="ts">
  import Button from "@grampro/svelte-block/Button.svelte";
  import { Bug } from "lucide-svelte";

  let showBug: boolean = false;

  const showBugFunction = () => {
    showBug = true;
    setTimeout(() => {
      showBug = false;
    }, 2000);
  };
</script>

<div class="flex gap-1">
  <Button>Submit</Button>
  <Button outline class="hover:bg-orange-500 dark:text-white">Submit</Button>
  <Button class="bg-red-500 hover:bg-red-700">Submit</Button>
  <Button
    class="rounded-md border bg-gradient-to-r from-green-500 to-blue-500 px-6 py-2 text-white shadow-lg shadow-green-600 hover:scale-90 hover:from-pink-500 hover:to-yellow-500 hover:shadow-pink-600"
    >Click Me</Button
  >
  <Button
    class="bg-green-500 hover:bg-green-700 flex gap-1"
    on:click={showBugFunction}><Bug size="20" />Report Bug</Button
  >
</div>

{#if showBug}
  <div>
    <img src="/bugcss.svg" alt="" class="fixed top-10 md:w-80 md:h-80" />
  </div>
{/if}
