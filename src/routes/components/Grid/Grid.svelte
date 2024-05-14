<script lang="ts">
  import Grid from "@grampro/svelte-block/Grid.svelte";
  import ImageAction from "./ImageAction.svelte";
  import { dataSource } from "./data";

  const columns = [
    {
      field: "imgUrl",
      width: "200",
      textAlign: "Right",
      template: ImageAction,
      showTemplateInExport: true,
      headerText: "Avatar",
    },
    {
      field: "id",
      width: "200",
      textAlign: "Right",
      headerText: "Employee ID",
    },
    { field: "name", width: "100", headerText: "Name", filter: true },
    {
      field: "jobTitle",
      width: "100",
      textAlign: "Right",
      headerText: "Job Title",
    },
    { field: "place", headerText: "Place", width: "200" },
  ];
</script>

<div class="relative">
  <Grid {columns} {dataSource} pageSettings={{ pageNumber: 6 }} gridContainerClass="sample" />
</div>
