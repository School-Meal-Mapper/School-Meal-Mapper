<template>
  <span class="pagetitle">
    <picture>
      <source :srcset="require(`@/districtLogos/${districtAbbr}-logo-dark.png`)" media="(prefers-color-scheme: dark)" />
      <img :src="require(`@/districtLogos/${districtAbbr}-logo.png`)" height="80" alt="District Logo" />
    </picture>
  </span>
</template>
<script>
export default {
  name: 'theme-header',
  props: ['districtAbbr']
}
</script>
<style lang="sass"></style>
