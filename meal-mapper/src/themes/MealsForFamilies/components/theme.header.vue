<template>
  <span class="pagetitle">
    <picture v-if="SVGLogo">
      <source :srcset="require(`@/districtLogos/${districtAbbr}-logo-dark.svg`)" media="(prefers-color-scheme: dark)" />
      <img :src="require(`@/districtLogos/${districtAbbr}-logo.svg`)" height="80" alt="District Logo" class="image" />
    </picture>
    <picture v-else>
      <source :srcset="require(`@/districtLogos/${districtAbbr}-logo-dark.png`)" media="(prefers-color-scheme: dark)" />
      <img :src="require(`@/districtLogos/${districtAbbr}-logo.png`)" height="80" alt="District Logo" class="image" />
    </picture>
  </span>
</template>
<script>
export default {
  name: 'theme-header',
  props: ['districtAbbr', 'SVGLogo'],
  data: function(){
      return {
        useSVG: SVGLogo 
      }
  }
}
</script>
<style lang="scss">
@media only screen and (max-width: 350px) {
  .image {
    height: 50px !important;
  }
}
@media only screen and (max-width: 480px) {
  .image {
    height: 60px;
  }
}
</style>
<style lang="sass"></style>
