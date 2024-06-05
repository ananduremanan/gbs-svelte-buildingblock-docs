<script lang="ts">
  import { onMount } from "svelte";

  export let contentHtml;

  let headings: any[] = [];
  let path: any;

  $: {
    if (contentHtml) {
      // Ensure this runs only in the browser
      if (typeof window !== "undefined") {
        let parser = new DOMParser();
        let doc = parser.parseFromString(contentHtml, "text/html");
        headings = [...doc.querySelectorAll("h3, h4")].map((heading: any) => ({
          text: heading.textContent,
          id:
            heading.id ||
            heading.textContent.replace(/\s+/g, "-").toLowerCase(),
          tag: heading.tagName.toLowerCase(),
        }));
      }
    }
  }

  onMount(() => {
    path = window.location.pathname;
  });
</script>

<div class="hidden lg:block md:w-52 py-4 dark:text-white">
  <div class="font-bold">On This Page</div>
  <ul class="ml-2 mt-2 text-sm mb-12">
    {#each headings as heading}
      <li
        class={`m-2 hover:text-blue-400 ${heading.tag === "h4" ? "ml-6" : ""}`}
      >
        <a href={`#${heading.id}`}>{heading.text}</a>
      </li>
    {/each}
  </ul>

  <hr />

  <div class="font-bold mt-4 text-xs text-gray-600 flex flex-col gap-2">
    <a
      target="_blank"
      href={`https://github.com/ananduremanan/gbs-svelte-buildingblock-docs/tree/main/src/routes${path}/%2Bpage.svx`}
      >Edit This Page</a
    ><a
      target="_blank"
      href="https://github.com/ananduremanan/svelte-component-library/issues/new"
      >Raise an Issue</a
    >
  </div>
</div>
