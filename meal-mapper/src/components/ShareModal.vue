<template>
  <b-modal id="share-location" size="md" dialog-class="m-0 m-md-auto" centered hide-footer>
    <template v-slot:modal-title>
      {{ $t('shareOptions.share') }}
    </template>
    <p v-if="business !== null">
      {{ $t('shareOptions.shareInformationAboutMealSite') }}:
      <br />
      <br />
      <b> {{ business.marker.gsx$mealsitename.$t }} </b>
      <br />
      {{ getAddress(business.marker) }} <br />
      <br />
      {{ $t('shareOptions.learnMore') }}
      <br />
      <input readonly type="text" :value="shareLink(business.marker)" class="w-50" id="share-link" />
      <b-button variant="link" @click="copyShareLink()">{{ $t('sharelocation.copy-link') }}</b-button>
      <br />
    </p>
    <div v-if="business !== null">
      <div>
        <i class="fa fa-envelope fa-lg" id="email-icon" aria-hidden="true" />
        <a :href="emailLink(business.marker)">
          <span class="emailText">{{ $t('shareOptions.sendEmail') }} </span>
        </a>
      </div>
      <div class="sendTextDiv">
        <i class="fa fa-mobile fa-lg" id="text-icon" aria-hidden="true" />
        <b-link @click="showText = !showText">
          <span class="sendText">{{ $t('shareOptions.sendTextMessage') }} </span>
        </b-link>
        <br />
        <p v-if="showText">
          <textarea
            readonly
            type="text"
            :value="textMessage(business.marker)"
            class="form-control w-75"
            id="text-message"
            style="height: 200px;"
            rows="4"
          />
          <b-link @click="copyTextMessage()">{{ $t('sharelocation.copy-message') }}</b-link>
        </p>
      </div>
    </div>
  </b-modal>
</template>

<script>
import { getAddress } from '../utilities'
export default {
  name: 'share-modal',
  components: {},
  data() {
    return {
      showText: false
    }
  },
  props: {
    business: Object
  },
  methods: {
    addressURL: function (marker) {
      var address = marker.gsx$mealsiteaddress1.$t
      address = address.replace(/\s/g, '%20')
      var city = marker.gsx$city.$t.replace(/\s/g, '%20')
      var state = marker.gsx$state.$t.replace(/\s/g, '%20')
      address = address + '%2C%20' + city + '%2C%20' + state + '%20' + marker.gsx$zip.$t
      return address
    },
    shareLink: function (marker) {
      return 'https://www.google.com/maps/search/?api=1&query=' + marker.gsx$lat.$t + ',' + marker.gsx$lon.$t
    },
    copyShareLink: function () {
      var copyText = document.getElementById('share-link')
      copyText.select()
      copyText.setSelectionRange(0, 99999)
      document.execCommand('copy')
      alert(this.$tc('sharelocation.copied'))
    },
    copyTextMessage: function () {
      var copyText = document.getElementById('text-message')
      copyText.select()
      copyText.setSelectionRange(0, 99999)
      document.execCommand('copy')
      alert(this.$tc('sharelocation.copied'))
    },
    /*
    moreInfo: function () {
      var urlString = window.location.href
      var url = new URL(urlString)
      console.log(url.searchParams.toString().slice(0, -1))
      return 'For more information about free meal sites organized by the Chapel Hill-Carrboro school district, visit ' + urlString + '.'
    }, */
    textMessage: function (marker) {
      var body =
        'I thought you might be interested in visiting the ' +
        marker.gsx$mealsitename.$t +
        ' free meal site, located at ' +
        getAddress(marker) +
        '.' +
        ' Click this link to access the meal site in Google Maps: '
      //var address = encodeURI(this.addressURL(marker))
      //body += this.shareLink(address).replace('&', '%26') + '.'
      body += this.shareLink(marker) + '.'
      body += ' For more information about free meal sites in this district, visit ' + window.location.href + '.'
      return body
    },
    emailLink: function (marker) {
      const mailto = 'mailto:?subject='
      var subject = 'Find free meals for children at ' + marker.gsx$mealsitename.$t
      subject = encodeURI(subject)
      subject += '&body='
      var body =
        'I thought you might be interested in visiting the ' +
        marker.gsx$mealsitename.$t +
        ' meal site, located at ' +
        getAddress(marker) +
        '. This site provides free meals for children aged 0-18.\n\n' +
        'Click this link to access the meal site in Google Maps:\n'
      body = encodeURI(body)
      //var address = encodeURI(this.addressURL(marker))
      //body += this.shareLink(address).replace('&', '%26') + '.'
      body += this.shareLink(marker).replace('&', '%26') + '.'
      body += encodeURI('\n\n') + 'For more information about free meal sites in this district, visit ' + window.location.href + '.'
      return mailto + subject + body
    },
    getAddress: getAddress
  }
}
</script>

<style lang="scss">
.emailText {
  padding-left: 10px;
}
.sendText {
  padding-left: 15px;
}
.sendTextDiv {
  padding-top: 5px;
  padding-left: 3px;
}
</style>
