<script lang="ts">
  import Button from "@grampro/svelte-block/Button.svelte";
  import { Bug } from "lucide-svelte";
</script>

<div class="flex gap-1">
  <Button>Submit</Button>
  <Button outline class="hover:bg-orange-500 dark:text-white">Submit</Button>
  <Button class="bg-red-500 hover:bg-red-700">Submit</Button>
  <Button class="bg-green-500 hover:bg-green-700 flex gap-1"><Bug size="20" />Report Bug</Button>
</div>
