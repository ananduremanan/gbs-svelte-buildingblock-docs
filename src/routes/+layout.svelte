<script lang="ts">
  import "../app.css";
  import Navbar from "./UI/Navbar.svelte";
  import Sidebar from "./UI/Sidebar.svelte";
  import { onMount, afterUpdate } from "svelte";
  import { page } from "$app/stores";
  import { ChevronLeft, ChevronRight } from "lucide-svelte";
  import { fetchData, getNextPage, getPreviousPage } from "./utils/menuutils";
  import Toasts from "@grampro/svelte-block/Toasts.svelte";
  import TableofContent from "./UI/TableofContent.svelte";

  let showSideBar = false;
  let menuItemsArray: any[] = [];
  let current_url = "/";
  let nextPage = "";
  let previousPage = "";
  let contentHtml: any;
  let packageName = "@grampro/svelte-block";
  let latestBetaVersion: any = "";
  let error = "";

  async function getLatestBetaVersion(packageName: string) {
    const url = `https://registry.npmjs.org/${packageName}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(
          `Unable to fetch package metadata: ${response.statusText}`
        );
      }

      const packageData = await response.json();

      const versions = Object.keys(packageData.versions);
      const betaVersions = versions.filter((version) =>
        version.includes("beta")
      );

      if (betaVersions.length === 0) {
        error = `No beta versions found for package ${packageName}`;
        return null;
      }

      const latestBetaVersion = betaVersions.sort((a, b) => {
        return new Date(packageData.time[a]) > new Date(packageData.time[b])
          ? -1
          : 1;
      })[0];

      return latestBetaVersion;
    } catch (err: any) {
      error = `Error: ${err.message}`;
    }
  }

  const toggleSidebar = () => {
    showSideBar = !showSideBar;
  };

  function assignIdsToHeadings(article: any) {
    const headings = article.querySelectorAll("h3, h4");
    headings.forEach((heading: any) => {
      if (!heading.id) {
        const id = heading.textContent
          .trim()
          .toLowerCase()
          .replace(/\s+/g, "-");
        heading.id = id;
      }
    });
  }

  async function init() {
    current_url = $page.url.pathname.split("/").filter(Boolean).pop() || "/";
    menuItemsArray = await fetchData();
    nextPage = getNextPage(current_url, menuItemsArray);
    previousPage = getPreviousPage(current_url, menuItemsArray);
    if (typeof document !== "undefined") {
      const article = document.querySelector("article");
      if (article) {
        contentHtml = article.innerHTML;
        assignIdsToHeadings(article);
      }
    }
    latestBetaVersion = await getLatestBetaVersion(packageName);
  }

  onMount(init);
  afterUpdate(init);
</script>

<Toasts position="bottom-0 right-0" />
<div class="flex flex-col h-screen">
  <div
    class="w-full bg-black dark:bg-gray-700 text-white flex justify-center text-sm py-1"
  >
    <a
      href="https://www.npmjs.com/package/@grampro/svelte-block?activeTab=versions"
      >🎉{latestBetaVersion} is Live Now</a
    >
  </div>
  <Navbar
    on:mobile_menu_clicked={() => {
      toggleSidebar();
    }}
  />
  <div class="flex flex-1 overflow-hidden lg:px-5">
    <Sidebar bind:showSideBar />
    <div class="p-1 flex-1 overflow-auto content-container">
      <article
        class="prose lg:prose-xl dark:prose-invert px-4 md:text-base sx-content dark:prose-pre:bg-gray-700 mb-8"
      >
        <slot />

        <div class="flex justify-between mt-4">
          {#if previousPage}
            <a
              href={`/components/${previousPage}`}
              class="flex items-center justify-center font-thin no-underline"
              ><ChevronLeft size="20" /> {previousPage}</a
            >
          {/if}
          {#if nextPage}
            <a
              href={`/components/${nextPage}`}
              class="flex items-center justify-center font-thin no-underline"
              >{nextPage} <ChevronRight size="20" />
            </a>
          {/if}
        </div>
      </article>
    </div>
    <TableofContent {contentHtml} />
  </div>
</div>
