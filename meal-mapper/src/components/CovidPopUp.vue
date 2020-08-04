<template>
  <div>
    <b-modal ref="covid-popup" hide-footer title="Using Component Methods">
      <div class="d-block text-center">
        <h3>Please remember to wear a mask</h3>
      </div>
      <b-button class="mt-3" variant="outline-danger" block @click="hideModal">Close</b-button>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: 'covid-popup-modal',
  methods: {
    showModal() {
      this.$refs['covid-popup'].show()
    },
    hideModal() {
      this.$refs['covid-popup'].hide()
    }
  },
  mounted() {
    this.showModal()
  }
}
</script>
