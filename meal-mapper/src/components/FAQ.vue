<template>
  <b-modal id="faq" size="xl" dialog-class="m-0 m-md-auto" centered scrollable hide-header-close>
    <template v-slot:modal-title>
      {{ $t('faq.title') }}
    </template>
    <template v-slot:default>
      <b>{{ $t('faq.whatWeDoQuestion') }}</b>
      <p>{{ $t('faq.whatWeDoAnswer') }}</p>
      <b>{{ $t('faq.freeMealsQuestion') }}</b>
      <p>{{ $t('faq.freeMealsAnswer') }}</p>
      <b>{{ $t('faq.helpQuestion') }}</b>
      <p>{{ $t('faq.helpAnswer') }}</p>
    </template>
    <template v-slot:modal-footer>
      <b-button @click="$bvModal.hide('faq')" right>{{ $t('label.close') }}</b-button>
    </template>
  </b-modal>
</template>

<script>
export default {
  name: 'faq-modal'
}
</script>

<style lang="scss">
@media (max-width: 991px) {
  #faq > .modal-dialog {
    justify-content: normal;
    max-width: 100%;

    & > .modal-content {
      min-height: 100vh;
      height: 100vh;
    }
  }
}
</style>
