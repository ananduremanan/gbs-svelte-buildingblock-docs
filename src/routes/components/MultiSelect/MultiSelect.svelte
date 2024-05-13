<script>
  import MultiSelect from "@grampro/svelte-block/MultiSelect.svelte";

  export let countries = [
    { value: "us", label: "United States" },
    { value: "fr", label: "France" },
    { value: "gb", label: "United Kingdom" },
    { value: "de", label: "Germany" },
    { value: "jp", label: "Japan" },
    { value: "au", label: "Australia" },
    { value: "cn", label: "China" },
    { value: "in", label: "India" },
    { value: "mx", label: "Mexico" },
  ];
</script>

<div class="relative">
  <MultiSelect items={countries} />
</div>
