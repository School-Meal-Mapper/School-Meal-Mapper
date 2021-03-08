<template>
  <div class="d-flex" v-if="!checkParam">
    <div class="district-buttons">
      <p class="intro">{{ this.$t('home.intro') }}</p>
      <p>
        <b-form-select v-model="selectedState" :options="states">{{ this.$t('home.select-state') }}</b-form-select>
        <br />
        <br />
        <b-form-select v-model="selectedDistrict" :options="districtOptions" :disabled="this.selectedState !== 'nc'">{{
          this.$t('home.select-district')
        }}</b-form-select>
      </p>
      <b-button :disabled="this.selectedDistrict === null" v-on:click="districtLink">{{ this.$t('home.btn') }}</b-button>
    </div>
  </div>
</template>

export default { name: 'home' }
