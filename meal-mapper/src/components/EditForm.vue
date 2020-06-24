<template>
  <b-modal id="suggest-edit" size="lg" dialog-class="m-0 m-md-auto" centered scrollable hide-header-close>
    <template v-slot:modal-title>
      Suggest an edit
    </template>
    <p>
      Please use this form to let us know what is incorrect about the listing for <b>{{ currentBusiness.marker.gsx$mealsitename.$t }}.</b>
    </p>
  </b-modal>
</template>

<script>
export default {
  name: 'suggest-edit-modal',
  props: {
    currentBusiness: Object
  }
}
</script>

<style lang="scss"></style>
