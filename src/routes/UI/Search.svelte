<!-- Search.svelte -->
<script lang="ts">
  import { onMount } from "svelte";
  import FlexSearch from "flexsearch";

  let postsIndex: any;
  let searchInput: string;
  let posts: any[] = [];
  let results: any[] = [];

  function createPostsIndex(data: any[]) {
    postsIndex = new FlexSearch.Index({ tokenize: "forward" });

    data.forEach((post, i) => {
      const item = `${post.title} ${post.content}`;
      postsIndex.add(i, item);
    });

    posts = data;
  }

  onMount(async () => {
    try {
      const data = await fetch("/search");
      const res = await data.json();
      if (res) {
        createPostsIndex(res);
      }
    } catch (error) {}
  });

  function replaceTextWithMarker(text: string, match: string) {
    const regex = new RegExp(match, "gi");
    return text.replaceAll(regex, (match) => `<mark>${match}</mark>`);
  }

  function getMatches(text: string, searchTerm: string, limit = 1) {
    const regex = new RegExp(searchTerm, "gi");
    const indexes = [];
    let matches = 0;
    let match;

    while ((match = regex.exec(text)) !== null && matches < limit) {
      indexes.push(match.index);
      matches++;
    }

    return indexes.map((index) => {
      const start = index - 20;
      const end = index + 80;
      const excerpt = text.substring(start, end).trim();
      return `...${replaceTextWithMarker(excerpt, searchTerm)}...`;
    });
  }

  const handleOnInput = () => {
    if (searchInput) {
      const match = searchInput.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      let resultIndex = postsIndex.search(match);

      results = resultIndex.map((index: number) => {
        const post = posts[index];
        const title = post.title;
        const content = getMatches(post.content, match);
        return { title, content };
      });
    } else {
      results = [];
    }
  };
</script>

<div class="hidden relative md:block">
  <input
    type="text"
    bind:value={searchInput}
    placeholder="Search..."
    on:input={handleOnInput}
    class="text-black outline-none p-1 px-3 rounded-xl border-0"
  />
  {#if results.length > 0}
    <div class="absolute glass text-black w-auto px-4">
      <ul class="list-none p-0 m-0">
        {#each results as result}
          <a
            href={`/components/${result.title}`}
            on:click={() => (results = [])}
          >
            <li class="py-2">
              <div class="font-bold text-sm">{result.title}</div>
              {#each result.content as snippet}
                <div class="text-xs">{@html snippet}</div>
              {/each}
            </li>
          </a>
        {/each}
      </ul>
    </div>
  {/if}
</div>

<style>
  .glass {
    background: rgba(255, 255, 255, 0.2);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.18);
  }
</style>
