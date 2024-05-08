// place files you want to import through the `$lib` alias in this folder.

export async function getLatestVersion() {
  let latestVersion;

  const res = await fetch(
    "https://registry.npmjs.org/@grampro/svelte-block/latest"
  );
  const ver = await res.json();
  latestVersion = ver.version;
  return latestVersion;
}
