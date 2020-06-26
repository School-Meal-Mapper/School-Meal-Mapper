<template>
  <b-modal id="faq" size="xl" dialog-class="m-0 m-md-auto" centered scrollable hide-header-close>
    <template v-slot:modal-title>
      {{ $t('faq.title') }}
    </template>
    <template v-slot:default>
      <h4>{{ $t('faq.whatWeDoQuestion') }}</h4>
      <p>{{ $t('faq.whatWeDoAnswer') }}</p>
      <h4>{{ $t('faq.freeMealsQuestion') }}</h4>
      <p>
        {{ $t('faq.freeMealsAnswer') }}
        <strong>{{ $t('faq.staySafeReminder') }}</strong>
      </p>
      <h4>{{ $t('faq.helpQuestion') }}</h4>
      <p>
        {{ $t('faq.helpAnswer-start') }}
        <a href="https://portal.icheckgateway.com/publicschoolfoundation/AnnualAppeal.aspx">
          {{ $t('faq.helpAnswer-organization') }}
        </a>
        {{ $t('faq.helpAnswer-end') }}
      </p>
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
