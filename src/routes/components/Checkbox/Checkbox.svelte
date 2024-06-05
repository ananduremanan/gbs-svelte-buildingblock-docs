<script lang="ts">
  import { CheckBox } from "@grampro/svelte-block";

  let checked: boolean = false;
</script>

<div class="flex items-center gap-2">
  <CheckBox bind:checked />
  <span>Selected Value is: {checked} </span>
</div>

<div class="mt-2 flex items-center gap-2">
  <CheckBox checkboxClass="text-red-500" class="outline-none" checked />
  <span>Checked State</span>
  <CheckBox checkboxClass="text-red-500" class="outline-none" disabled />
  <span>Disabled State</span>
</div>
