<script lang="ts">
  import { addToast } from "@grampro/svelte-block/addToast";
  import Button from "@grampro/svelte-block/Button.svelte";
  import Custom from "./Custom.svelte";

  let toastSettings = {
    message: "Your Phone Linging!",
    type: "success",
    dismissible: false,
    timeout: 2000,
  };

  let customToast = {
    type: "custom",
    dismissible: false,
    timeout: 4000,
    component: Custom,
  };
</script>

<div class="flex gap-2">
  <Button on:click={() => addToast(toastSettings)}>Success Toast</Button>
  <Button
    on:click={() =>
      addToast({
        ...toastSettings,
        type: "error",
        message: "Internal Server Error",
      })}>Error Toast</Button
  >
  <Button
    on:click={() =>
      addToast({
        ...toastSettings,
        type: "info",
        message: "👩‍🦱 Damn!!! You found me!",
      })}>Info Toast</Button
  >
  <Button on:click={() => addToast(customToast)}>Custom Toast</Button>
</div>
