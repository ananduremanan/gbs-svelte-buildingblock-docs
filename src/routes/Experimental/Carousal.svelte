<script>
  import Carousal from "@grampro/svelte-block/Carousal.svelte";
</script>

<div class="relative">
  <Carousal perPage={1} autoplay={3000} >
    <div class="w-full flex rounded-lg h-auto md:h-50 px-2">
      <img
        src="https://www.sony.net/Products/di_photo-gallery/images/extralarge/1634.JPG"
        alt=""
        class="w-full object-cover rounded-lg"
      />
    </div>
    <div class="w-full flex rounded-lg h-auto md:h-50 px-2">
      <img
        src="https://www.sony.net/Products/di_photo-gallery/images/extralarge/1631.JPG"
        alt=""
        class="w-full object-cover rounded-lg"
      />
    </div>
  </Carousal>
</div>
