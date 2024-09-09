// place files you want to import through the `$lib` alias in this folder.

export async function getLatestVersion() {
  let latestVersion;

  const res = await fetch(
    "https://www.npmjs.com/package/@grampro/svelte5-block/latest"
  );
  const ver = await res.json();
  latestVersion = ver.version;

  console.log(latestVersion);

  return latestVersion;
}

export async function getLatestBetaVersion() {
  let error = "";
  const url = `https://www.npmjs.com/package/@grampro/svelte5-block`;

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

export function addCopyButton(codeBlocks: any) {
  codeBlocks.forEach((codeBlock: any) => {
    const preElement = codeBlock.parentElement;
    if (preElement && !preElement.querySelector("button.copy-button")) {
      const copyButton = document.createElement("button");
      copyButton.textContent = "Copy";
      copyButton.classList.add("copy-button");

      preElement.style.position = "relative";
      preElement.appendChild(copyButton);

      copyButton.style.position = "absolute";
      copyButton.style.top = "10px";
      copyButton.style.right = "10px";
      copyButton.style.zIndex = "1";
      copyButton.style.backgroundColor = "black";
      copyButton.style.paddingLeft = "2px";
      copyButton.style.paddingRight = "2px";
      copyButton.style.borderRadius = "5px";

      copyButton.addEventListener("click", () => {
        navigator.clipboard
          .writeText(codeBlock.textContent || "")
          .then(() => {
            copyButton.textContent = "Copied!";
            setTimeout(() => {
              copyButton.textContent = "Copy";
            }, 2000);
          })
          .catch((err) => {
            console.error("Failed to copy text: ", err);
          });
      });
    }
  });
}
