<script lang="ts">
  import { DatePicker } from "@grampro/svelte-block";
  const today = new Date();
</script>

<DatePicker />

<div class="mt-4 mb-4">With Min and Max</div>

<DatePicker
  minDate={new Date(today.getFullYear(), today.getMonth(), 1)}
  maxDate={new Date()}
/>
