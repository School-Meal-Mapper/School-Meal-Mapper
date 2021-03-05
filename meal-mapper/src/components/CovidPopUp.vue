<template>
  <b-modal ref="covid-popup" size="l" dialog-class="m-0 m-md-auto" centered scrollable hide-footer>
    <template v-slot:modal-title>
      {{ $t('covidpopup.title') }}
    </template>
    <template v-slot:default>
      <p id="wearmask">
        <i class="fas fa-head-side-mask" aria-hidden="true" style="font-size: 600%;"></i>
      </p>
      <p id="text">
        {{ $t('covidpopup.mask') }}
      </p>
      <p id="socialdist">
        <i class="fas fa-people-arrows" aria-hidden="true" style="font-size: 600%;"></i>
      </p>
      <p id="text">
        {{ $t('covidpopup.socialdist') }}
      </p>
      <p id="washhands">
        <i class="fas fa-hands-wash" aria-hidden="true" style="font-size: 600%;"></i>
      </p>
      <p id="text">
        {{ $t('covidpopup.washhands') }}
      </p>
      <b-button id="hide" size="md" @click="hideModal()">
        Got it!
      </b-button>
    </template>
  </b-modal>
</template>

<script>
export default {
  name: 'covid-popup-modal',
  data() {
    return {
      popupseen: false
    }
  },
  methods: {
    showModal() {
      this.$refs['covid-popup'].show()
      sessionStorage.setItem('popupseen', true)
    },
    hideModal() {
      this.$refs['covid-popup'].hide()
    }
  },
  mounted() {
    if (sessionStorage.getItem('popupseen') == null) {
      this.showModal()
    }
  }
}
</script>

<style lang="scss">
#wearmask {
  padding: 15px 0px 15px;
  text-align: center;
}
#socialdist {
  padding: 15px 0px 15px;
  text-align: center;
}
#washhands {
  padding: 15px 0px 15px;
  text-align: center;
}
#text {
  text-align: center;
  font-weight: bold;
}
#hide {
  font-weight: bold;
  background-color: #1d6363;
  color: white;
  padding: 14px 28px;
  font-size: 20px;
  margin-left: 40%;
}
.close {
  display: none;
}
.modal-title {
  margin: 0 auto;
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
