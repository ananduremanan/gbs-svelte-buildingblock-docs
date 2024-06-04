<script>
  import { DarkMode } from "flowbite-svelte";
  import { Menu } from "lucide-svelte";
  import { createEventDispatcher } from "svelte";
  import Search from "./Search.svelte";
  import { getLatestVersion } from "$lib";
  import { onMount } from "svelte";

  let latestVersion = "";
  onMount(async () => {
    latestVersion = await getLatestVersion();
  });

  const dispatch = createEventDispatcher();
</script>

<nav class="bg-white px-4 py-1 border-b dark:bg-black dark:text-white lg:px-8">
  <div class="container mx-auto flex justify-between items-center">
    <span class="text-lg font-semibold flex items-center gap-2"
      ><button
        on:click={() => {
          dispatch("mobile_menu_clicked", { value: true });
        }}><Menu size="20" class="md:hidden" /></button
      >
      <a href="https://gramlib.netlify.app">
        <div class="flex items-center gap-1 justify-center">
          <div>
            <div>GramLib</div>
            <div class="logo-tagline -mt-3">Svelete Component Library</div>
          </div>
        </div>
      </a>
    </span>
    <span class="flex items-center">
      <a
        href="https://www.npmjs.com/package/@grampro/svelte-block"
        class="mr-2 py-1 px-2 bg-yellow-200 rounded-lg text-xs dark:text-black"
        target="_blank">V- {latestVersion}</a
      >
      <Search />
      <DarkMode class="text-dark dark:text-white" />
      <a
        href="https://github.com/ananduremanan/svelte-docs-template"
        target="_blank">Github</a
      >
    </span>
  </div>
</nav>

<style>
  .logo-tagline {
    font-size: 8px;
  }
</style>
