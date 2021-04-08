<template>
  <b-form id="search" @submit="search">
    <b-list-group horizontal class="need-location-group">
      <div class="searchDropdown">
        <b-form-input v-model="text" type="search" @keydown.native="search" :placeholder="$t('search.prompt')"></b-form-input>
        {{ $t('searchBar.cantFindCloseSite') }}
        <!--<a href="/" style="font-size: 0.7rem;">{{ $t('search.other-district') }}</a>-->
      </div>
      <b-button type="submit" variant="primary" class="search-btn"><i class="fas fa-search"></i></b-button>
    </b-list-group>
  </b-form>
</template>

<script>
export default {
  name: 'search',
  methods: {
    search(event) {
      if (event.which === 13) {
        event.preventDefault()
        this.$emit('search', this.text)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.searchDropdown {
  width: calc(50% - 16px);
  padding: 0 2px;
  display: inline-block;
}

.search-btn {
  margin-left: 2px;
  height: 36px;
}

.searchDropdown-label {
  color: $gray-600;
  margin-bottom: 4px;
}

.custom-select,
.form-control {
  font-size: 1rem;
  width: 100%;
  border-radius: 4px;
  font-weight: 600 !important;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.125);
  background-color: white !important;
}

.form-control:-webkit-autofill:focus,
.form-control:-webkit-autofill,
input:-webkit-autofill:focus,
input:-webkit-autofill {
  background-color: #fff !important;
}

@media (min-width: 768px) {
  .custom-select,
  .form-control {
    font-size: 0.95rem;
  }
}

#search {
  margin: 40px auto 0;
  width: 100%;
  font-size: 0.75rem;
  display: flex;
  flex-direction: row;
  z-index: 9999;
}

#search > p {
  margin: 0 auto !important;
}

.need-location-group {
  /* flex-wrap: wrap; */
  justify-content: space-between;
  width: 100%;
  margin: 0 auto;
  padding: 0;
}
</style>
