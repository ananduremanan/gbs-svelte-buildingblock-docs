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

export async function getLatestBetaVersion() {
  let error = "";
  const url = `https://registry.npmjs.org/@grampro/svelte-block`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        `Unable to fetch package metadata: ${response.statusText}`
      );
    }

    const packageData = await response.json();

    const versions = Object.keys(packageData.versions);
    const betaVersions = versions.filter((version) => version.includes("beta"));

    if (betaVersions.length === 0) {
      error = `No beta versions found for package @grampro/svelte-block`;
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

export function assignIdsToHeadings(article: any) {
  const headings = article.querySelectorAll("h3, h4");
  headings.forEach((heading: any) => {
    if (!heading.id) {
      const id = heading.textContent.trim().toLowerCase().replace(/\s+/g, "-");
      heading.id = id;
    }
  });
}
