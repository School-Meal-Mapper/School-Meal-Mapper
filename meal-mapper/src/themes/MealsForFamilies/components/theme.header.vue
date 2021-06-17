<template>
  <span class="pagetitle">
    <picture>
      <source :srcset="require(`@/districtLogos/${districtAbbr}-logo-dark.${logoFormat}`)" media="(prefers-color-scheme: dark)" />
      <img :src="require(`@/districtLogos/${districtAbbr}-logo.${logoFormat}`)" height="80" alt="District Logo" class="image" />
    </picture>
  </span>
</template>
<script>
export default {
  name: 'theme-header',
  props: {
    districtAbbr: {
      type: String
    },
    logoFormat: {
      default: 'png',
      type: String
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
