<template>
  <b-modal ref="covid-popup" size="l" dialog-class="m-0 m-md-auto" centered scrollable hide-footer>
    <template v-slot:modal-title>
      {{ $t('covidpopup.title') }}
    </template>
    <template v-slot:default>
      <p id="wearmask">
        <img src="../images/WearMask.png" alt="Wear A Mask" />
      </p>
      <p id="socialdist">
        <img src="../images/SocialDistancing.png" alt="Social Distance" />
      </p>
      <p id="washhands">
        <img src="../images/WashHands.png" alt="Wash Hands" />
      </p>
    </template>
  </b-modal>
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

<style lang="scss">
#wearmask {
  text-align: center;
}
#socialdist {
  text-align: center;
}
#washhands {
  text-align: center;
}

@media (max-width: 991px) {
  #covid-popup > .modal-dialog {
    justify-content: normal;
    max-width: 100%;

    & > .modal-content {
      min-height: 100vh;
      height: 100vh;
    }
  }
}
</style>
