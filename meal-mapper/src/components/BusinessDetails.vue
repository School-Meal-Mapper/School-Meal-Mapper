<template>
  <span>
    <b-list-group class="list-group-flush">
      <b-list-group-item variant="sideNav" button class="backtolist" @click="$emit('close-details')">
        <i class="fas fa-arrow-left" />
        {{ $t('label.backtolist') }}
      </b-list-group-item>
    </b-list-group>
    <b-list-group class="list-group-flush business-details">
      <b-list-group-item variant="sideNav" :class="infotype">
        <div>
          <div class="title">
            <i :class="businessIcon(business.marker)"></i>
            <div class="busName">
              <h5>{{ business.marker.gsx$mealsitename.$t }}</h5>
            </div>
          </div>
          <p v-if="getAddress(business.marker) !== ''">
            <b>{{ $t('label.address') }}:</b><br />
            {{ getAddress(business.marker) }}
            <icon-list-item icon="fa fa-directions" :title="$t('getdirections')" :link="directionsLink(addressURL(business.marker))" />
            <i class="fas fa-share-alt fa-lg" id="share-icon" aria-hidden="true" />
            <b-button variant="link" class="share-button" @click="$bvModal.show('share-location')">{{
              $t('sharelocation.shareloc')
            }}</b-button>
          </p>

          <p>
            <icon-list-item
              v-if="business.marker.gsx$contact !== undefined && !!business.marker.gsx$contact.$t"
              icon="fas fa-phone-alt"
              :title="business.marker.gsx$contact.$t"
              :link="'tel:' + business.marker.gsx$contact.$t"
            />

            <icon-list-item
              v-if="business.marker.gsx$weblink !== undefined && !!business.marker.gsx$weblink.$t"
              icon="fas fa-globe"
              :title="getDomain(business.marker.gsx$weblink.$t)"
              :link="business.marker.gsx$weblink.$t"
            />

            <icon-list-item
              v-if="business.marker.gsx$twitter !== undefined && !!business.marker.gsx$twitter.$t"
              icon="fa fa-twitter"
              :title="'@' + business.marker.gsx$twitter.$t"
              :link="'https://www.twitter.com/' + business.marker.gsx$twitter.$t"
            />

            <icon-list-item
              v-if="business.marker.gsx$instagram !== undefined && !!business.marker.gsx$instagram.$t"
              icon="fa fa-instagram"
              :title="'@' + business.marker.gsx$instagram.$t"
              :link="'https://www.instagram.com/' + business.marker.gsx$instagram.$t"
            />

            <icon-list-item
              v-if="business.marker.gsx$facebook !== undefined && !!business.marker.gsx$facebook.$t"
              icon="fa fa-facebook-square"
              :title="'Facebook'"
              :link="business.marker.gsx$facebook.$t"
            />
          </p>
          <b-modal id="share-location" size="lg" dialog-class="m-0 m-md-auto" centered hide-footer>
            <template v-slot:modal-title>
              {{ $t('sharelocation.share') }}
            </template>
            <p>
              <b> {{ business.marker.gsx$mealsitename.$t }} </b>
              <br />
              {{ getAddress(business.marker) }} <br />
              <br />
              {{ $t('sharelocation.link') }}
              <br />
              <input readonly type="text" :value="shareLink(addressURL(business.marker))" class="w-75" id="share-link" />
              <b-button variant="link" @click="copyShareLink()">{{ $t('sharelocation.copy') }}</b-button>
            </p>
          </b-modal>
          <opening-hours :business="business.marker" :title="$t('label.openinghours')"></opening-hours>

          <template v-if="business.marker.gsx$notes !== undefined && !!business.marker.gsx$notes.$t">
            <p>
              <b>{{ $t('label.notes') }}:</b><br />{{ business.marker.gsx$notes.$t }}
            </p>
          </template>

          <p class="updated" v-if="getLastUpdatedDate != 'Invalid Date'">
            {{ $t('label.details-last-updated') }}: {{ getLastUpdatedDate }}
          </p>

          <p>
            <b-button variant="outline-primary" size="sm" class="suggest-edit" @click="$bvModal.show('suggest-edit')">
              {{ $t('suggest-edit.edit') }}
            </b-button>
          </p>
        </div>
      </b-list-group-item>
    </b-list-group>
    <suggest-edit-modal :currentBusiness="business" />
  </span>
</template>

<script>
import OpeningHours from './OpeningHours.vue'
import IconListItem from './IconListItem.vue'
import { businessIcon, getAddress } from '../utilities'
import SuggestEditModal from './EditForm.vue'
export default {
  name: 'BusinessDetails',
  components: {
    OpeningHours,
    IconListItem,
    SuggestEditModal
  },
  data() {
    return {}
  },
  props: {
    infotype: { type: String },
    icon: { type: String },
    business: Object
  },
  methods: {
    getDomain: function (url) {
      var urlParts = url.replace('http://', '').replace('https://', '').replace('www.', '').split(/[/?#]/)
      return urlParts[0]
    },
    addressURL: function (marker) {
      var address = marker.gsx$mealsiteaddress.$t
      address = address.replace(/\s/g, '%20')
      var city = marker.gsx$city.$t.replace(/\s/g, '%20')
      var state = marker.gsx$state.$t.replace(/\s/g, '%20')
      address = address + '%2C%20' + city + '%2C%20' + state + '%20' + marker.gsx$zip.$t
      return address
    },
    directionsLink: function (address) {
      return 'https://www.google.com/maps/dir/?api=1&destination=' + address
    },
    shareLink: function (address) {
      return 'https://www.google.com/maps/search/?api=1&query=' + address
    },
    copyShareLink: function () {
      var copyText = document.getElementById('share-link')
      copyText.select()
      copyText.setSelectionRange(0, 99999)
      document.execCommand('copy')
      alert(this.$tc('sharelocation.copied'))
    },
    businessIcon: businessIcon,
    getAddress: getAddress
  },
  computed: {
    getLastUpdatedDate: function () {
      return new Date(Date.parse(this.business.marker.gsx$lastupdate.$t)).toLocaleDateString()
    }
  }
}
</script>

<style scoped lang="scss">
.business-details {
  max-height: calc(100vh - 86px - 62px);
  overflow-y: auto;
  overflow-x: hidden;
}
.backtolist {
  font-size: 0.8rem;
  padding-top: 30px;

  i {
    margin-right: 0.375rem;
  }

  // &:hover {
  //   background: rgba(0, 0, 0, 0.05) !important;
  //   cursor: pointer;
  // }
}

.title {
  margin: 0 0 0.75rem 0;
  display: inline-block;

  i {
    font-size: 3rem;
    color: theme-color('quinary');
    margin: 7px 10px 7px 0;
    float: left;
    @media (prefers-color-scheme: dark) {
      color: theme-color-level('quinary', 5);
    }
  }
}

.busName {
  margin-left: 54px;
  width: 208px;
}

.green {
  font-size: 0.8rem;
  // color: #666;

  & > div {
    width: 243px;
  }
}

.updated {
  color: #aaa;
}

#share-link {
  @media only screen and (max-width: 768px) {
    width: 345px !important;
  }
}

.share-button {
  font-size: 0.8rem;
  padding: 0.375rem 1rem;
  color: theme-color('warning');
  @media (prefers-color-scheme: dark) {
    color: theme-color-level(warning, 5);
  }
}
</style>
