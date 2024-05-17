import { createPostsIndex, searchPostsIndex } from "./search";

addEventListener("message", async (e) => {
  const { type, payload } = e.data;

  if (type === "load") {
    const contents = await fetch("/search").then((res) => res.json());
    createPostsIndex(contents);
    postMessage({ type: "ready" });
  }

  if (type === "search") {
    const searchTerm = payload.searchTerm;
    const results = searchPostsIndex(searchTerm);
    postMessage({ type: "results", payload: { results, searchTerm } });
  }
});
