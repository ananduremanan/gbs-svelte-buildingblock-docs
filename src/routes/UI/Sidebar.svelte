<script lang="ts">
  import { page } from "$app/stores";
  import { onMount } from "svelte";

  export let showSideBar: boolean;

  let menuItemsArray: any[] = [];

  async function fetchData() {
    const modules = import.meta.glob("../components/**/*.svx");
    const menuItems = Object.keys(modules).map(
      (item) => item.replace("../components/", "").split("/")[0]
    );
    menuItemsArray = menuItems;
  }

  let current_url = "/";
  $: {
    current_url = $page.url.pathname.split("/").filter(Boolean).pop() || "/";
  }

  onMount(fetchData);
</script>

<div
  class={`h-full border-r overflow-y-auto bg-white dark:bg-gray-900 dark:text-white p-4 transition-all transform w-80 ${!showSideBar ? "hidden" : "block w-64"} md:block scrollbar`}
>
  <ul>
    <li
      class={`py-1 ${current_url === "/" ? "bg-blue-100 rounded-lg text-blue-500 dark:bg-blue-100" : ""}`}
    >
      <a
        href="/"
        class="block p-1"
        on:click={() => {
          showSideBar = !showSideBar;
        }}>Introduction</a
      >
    </li>
    {#each menuItemsArray as menu}
      <li
        class={` py-1 ${current_url === menu ? "bg-blue-100 text-blue-500 rounded-lg dark:bg-blue-100" : ""}`}
      >
        <a
          data-sveltekit-preload-data="tap"
          href={`/components/${menu}`}
          class="block p-1"
          on:click={() => {
            showSideBar = !showSideBar;
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}>{menu}</a
        >
      </li>
    {/each}
    <li
      class={` py-1 ${current_url === "Experimental" ? "bg-blue-100 rounded-lg text-blue-500 dark:bg-blue-100" : ""}`}
    >
      <a
        href="/Experimental"
        class="block p-1"
        on:click={() => {
          showSideBar = !showSideBar;
        }}>Experimental</a
      >
    </li>
  </ul>
</div>

<style>
	.scrollbar::-webkit-scrollbar {
		margin-top: 20px;
		width: 5px;
		height: 10px;
	}

	.scrollbar::-webkit-scrollbar-track {
		border-radius: 100vh;
	}

	.scrollbar::-webkit-scrollbar-thumb {
		background: #b6cdeacc;
		border-radius: 100vh;
	}

	.scrollbar::-webkit-scrollbar-thumb:hover {
		background: #c0a0b9;
	}
</style>