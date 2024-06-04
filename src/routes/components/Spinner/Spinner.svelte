<script>
  import { Spinner } from "@grampro/svelte-block";
</script>

<div class="flex gap-4">
  <Spinner />
  <Spinner type="stroke" />
  <Spinner type="circle-bg" />
  <Spinner type="dot" size="h-4 w-4" />
</div>