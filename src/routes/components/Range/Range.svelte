<script lang="ts">
  import { Range } from "@grampro/svelte-block";

  let rangeValue: any = undefined;
</script>

<div class="flex flex-col gap-4">
  <Range />
  <Range
    labelledRange
    labelledRangeValues={[
      { text: "₹100", value: 100 },
      { text: "₹500", value: 500 },
      { text: "₹1000", value: 1000 },
      { text: "₹1500", value: 1500 },
    ]}
    min="100"
    max="1500"
    bind:value={rangeValue}
  />
  <div class="mt-6">
    RangeValue is: {rangeValue ? rangeValue : "Click On Range"}
  </div>
</div>
