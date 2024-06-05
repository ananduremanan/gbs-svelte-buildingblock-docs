<script lang="ts">
  import { Uploader } from "@grampro/svelte-block";

  let selectedFiles: any = null;
</script>

<div class="flex flex-col gap-2">
  <Uploader bind:selectedFiles />
  <div class="font-bold text-sm">With Preview and allow multiple</div>
  <Uploader accept=".png" bind:selectedFiles placeHolder="Select Images(.png)" multiple showPreview />
</div>
