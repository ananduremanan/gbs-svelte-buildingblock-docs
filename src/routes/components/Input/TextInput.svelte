<script lang="ts">
  import { Input } from "@grampro/svelte-block";

  export let OTPFeildClient: boolean = false;
</script>

<Input OTPFeild={OTPFeildClient} placeholder="Enter Something" />
