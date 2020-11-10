<template>
  <span class="pagetitle">
    <picture>
      <source :srcset="require(`@/districtLogos/${districtName}-logo-dark.png`)" media="(prefers-color-scheme: dark)" />
      <img :src="require(`@/districtLogos/${districtName}-logo.png`)" height="80" alt="District Logo" />
    </picture>
  </span>
</template>
<script>

export default {
  name: 'theme-header',
  props: ['districtName']
}
</script>
<style lang="sass"></style>
