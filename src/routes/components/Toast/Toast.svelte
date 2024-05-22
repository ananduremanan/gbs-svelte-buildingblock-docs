<script lang="ts">
  import { addToast } from "@grampro/svelte-block/addToast";
  import Button from "@grampro/svelte-block/Button.svelte";

  let toastSettings = {
    message: "Your Phone Linging!",
    type: "success",
    dismissible: false,
    timeout: 2000,
    position: "top-center",
  };
</script>

<div class="flex gap-2">
  <Button on:click={() => addToast(toastSettings)}
    >Click To Show Success Toast</Button
  >
  <Button on:click={() => addToast({ ...toastSettings, type: "error", message: "Internal Server Error" })}
    >Click To Show Error Toast</Button
  >
  <Button
    on:click={() =>
      addToast({
        ...toastSettings,
        type: "info",
        message: "👩‍🦱 Damn!!! You found me!",
      })}>Click To Show Info Toast</Button
  >
</div>
