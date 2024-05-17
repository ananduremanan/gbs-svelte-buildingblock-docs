import FlexSearch from "flexsearch";

export type Post = {
  content: string;
  slug: string;
  title: string;
};

let postsIndex: FlexSearch.Index;
let posts: Post[];

export function createPostsIndex(data: Post[]) {
  postsIndex = new FlexSearch.Index({ tokenize: "forward" });

  data.forEach((post, i) => {
    const item = `${post.title} ${post.content}`;
    postsIndex.add(i, item);
  });

  posts = data;
}

export function searchPostsIndex(searchTerm: string) {
  const match = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const results = postsIndex.search(match);
  console.log(results);
}
