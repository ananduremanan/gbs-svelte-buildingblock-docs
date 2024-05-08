<script lang="ts">
  import "../app.css";
  import Navbar from "$lib/components/Navbar.svelte";
  import { onMount } from "svelte";
  import Sidebar from "$lib/components/Sidebar.svelte";

  let menuItemsArray: any[] = [];

  async function fetchData() {
    const modules = import.meta.glob("./components/**/*.svx");
    const menuItems = Object.keys(modules).map(
      (item) => item.replace("./components/", "").split("/")[0]
    );
    menuItemsArray = menuItems;
  }

  onMount(fetchData);
</script>

<Navbar {menuItemsArray} />
<div class="px-4 flex flex-col md:flex-row h-full mt-24">
  <Sidebar {menuItemsArray} />
  <div class="flex-grow">
    <article
      class="prose lg:prose-xl dark:prose-invert px-4 md:text-base sx-content dark:prose-pre:bg-gray-700"
    >
      <slot />
    </article>
  </div>
</div>
