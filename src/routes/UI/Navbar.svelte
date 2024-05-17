<script>
  import { DarkMode } from "flowbite-svelte";
  import { Menu } from "lucide-svelte";
  import { createEventDispatcher } from "svelte";
  import Search from "./Search.svelte";

  const dispatch = createEventDispatcher();
</script>

<nav class="bg-blue-600 text-white p-4">
  <div class="container mx-auto flex justify-between items-center">
    <span class="text-lg font-semibold flex items-center gap-2"
      ><button
        on:click={() => {
          dispatch("mobile_menu_clicked", { value: true });
        }}><Menu size="20" class="md:hidden" /></button
      >GramLib</span
    >
    <span class="flex items-center">
      <Search />
      <DarkMode class="text-white hover:bg-blue-800" />
      <a
        href="https://github.com/ananduremanan/svelte-docs-template"
        target="_blank">Github</a
      >
    </span>
  </div>
</nav>
