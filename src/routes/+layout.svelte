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
  import {
    getLatestVersion,
    getLatestBetaVersion,
    assignIdsToHeadings,
    addCopyButton,
  } from "$lib";
  import * as semver from "semver";

  let showSideBar = false;
  let menuItemsArray: any[] = [];
  let current_url = "/";
  let nextPage = "";
  let previousPage = "";
  let contentHtml: any;
  let latestBetaVersion: any = "";

  const toggleSidebar = () => {
    showSideBar = !showSideBar;
  };

  async function init() {
    current_url = $page.url.pathname.split("/").filter(Boolean).pop() || "/";
    menuItemsArray = await fetchData();
    nextPage = getNextPage(current_url, menuItemsArray);
    previousPage = getPreviousPage(current_url, menuItemsArray);
    if (typeof document !== "undefined") {
      const codeBlocks = document.querySelectorAll("pre code");

      if (codeBlocks) {
        addCopyButton(codeBlocks);
      }

      const article = document.querySelector("article");
      if (article) {
        contentHtml = article.innerHTML;
        assignIdsToHeadings(article);
      }
    }
  }

  async function fetchVersions() {
    latestBetaVersion = await getLatestBetaVersion();
    let latestVersion = await getLatestVersion();

    if (latestVersion && latestBetaVersion) {
      latestBetaVersion = semver.gt(latestVersion, latestBetaVersion)
        ? latestVersion
        : latestBetaVersion;
    }
  }

  onMount(async () => {
    await init();
    await fetchVersions();
  });
  afterUpdate(init);
</script>

<Toasts position="bottom-0 right-0" />
<div class="flex flex-col h-screen">
  <div
    class="w-full bg-black dark:bg-gray-700 text-white flex flex-col justify-center text-sm py-1 relative text-center"
  >
    <!-- <a
      target="_blank"
      href="https://www.npmjs.com/package/@grampro/svelte5-block?activeTab=versions"
      >🎉{latestBetaVersion} is Live Now
      <span
        class="animate-ping absolute inline-flex h-1 w-1 rounded-full bg-red-600 ml-1 mt-1"
      ></span>
    </a> -->

    <a
      target="_blank"
      href="https://www.npmjs.com/package/@grampro/svelte5-block?activeTab=versions"
      >Install the latest svelte5-block
      <span
        class="animate-ping absolute inline-flex h-1 w-1 rounded-full bg-red-600 ml-1 mt-1"
      ></span>
    </a>
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
        class="prose prose-pre:bg-pre-400 lg:prose-xl dark:prose-invert px-4 md:text-base sx-content dark:prose-pre:bg-pre-400 mb-8"
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
