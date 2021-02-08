<template>
  <span>
    <b-list-group class="list-group-flush">
      <b-list-group-item variant="sideNav" button class="backtomap" id="back-to-list-mobile-nav" @click="$emit('close-details')">
        <i class="fas fa-arrow-left" />
        {{ $t('label.backtolistmobile') }}
      </b-list-group-item>
    </b-list-group>
    <b-list-group class="list-group-flush business-details-mobile" id="business-details-mobile-nav">
      <b-list-group-item variant="sideNav" :class="infotype">
        <div>
          <div class="title">
            <div class="busName">
              <h5>{{ business.marker.gsx$mealsitename.$t }}</h5>
            </div>
          </div>
          <div v-if="!maxDetails">
            <span class="closed-badge" v-if="closed(business)">{{ closedMessage }}</span>
            <span class="hours-badge" v-if="!closed(business)">{{ hours(business) }}</span>
          </div>
          <p v-if="getAddress(business.marker) !== ''">
            <b>{{ $t('label.address') }}:</b>
            <br />
            {{ getAddress(business.marker) }}
            <icon-list-item icon="fa fa-directions" :title="$t('getdirections')" :link="directionsLink(addressURL(business.marker))" />
            <i class="fas fa-share-alt fa-lg" id="share-icon" aria-hidden="true" />
            <b-link class="share-button" @click="$bvModal.show('share-location')">{{ $t('sharelocation.shareloc') }}</b-link>
          </p>

          <p id="icon-list-mobile" v-if="maxDetails">
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
          <opening-hours :business="business.marker" :title="$t('label.openinghours')" v-if="maxDetails"></opening-hours>

          <template v-if="business.marker.gsx$notes !== undefined && !!business.marker.gsx$notes.$t">
            <p>
              <b>{{ $t('label.notes') }}:</b>
              <br />
              {{ business.marker.gsx$notes.$t }}
            </p>
          </template>

          <p class="updated" v-if="getLastUpdatedDate != 'Invalid Date' && maxDetails">
            {{ $t('label.details-last-updated') }}: {{ getLastUpdatedDate }}
          </p>

          <p v-if="maxDetails">
            <b-button variant="outline-primary" size="sm" class="suggest-edit" @click="$bvModal.show('suggest-edit')">{{
              $t('suggest-edit.edit')
            }}</b-button>
          </p>

          <b-button variant="outline-primary" class="details" v-if="!maxDetails" @click="showMaximizeDetails()">{{
            $t('label.maxdetails')
          }}</b-button>
          <b-button variant="outline-primary" class="details" v-if="maxDetails" @click="showMinimizeDetails()">{{
            $t('label.mindetails')
          }}</b-button>
        </div>
      </b-list-group-item>
    </b-list-group>
  </span>
</template>

<script>
import OpeningHours from './OpeningHours.vue'
import IconListItem from './IconListItem.vue'
import { getAddress } from '../utilities'
import { days } from '../constants'
import { districtData } from '../themes/MealsForFamilies/districtData'

document.documentElement.style.setProperty('--primary-color', districtData.colors.primaryColor)
console.log('Business Details Mobile ran')

export default {
  name: 'BusinessDetailsMobile',
  components: {
    OpeningHours,
    IconListItem
  },
  data() {
    return {
      maxDetails: this.maximizeDetails
    }
  },
  props: {
    infotype: { type: String },
    icon: { type: String },
    business: Object,
    closedMessage: { type: String },
    maximizeDetails: Boolean
  },
  methods: {
    getDomain: function (url) {
      var urlParts = url.replace('http://', '').replace('https://', '').replace('www.', '').split(/[/?#]/)
      return urlParts[0]
    },
    addressURL: function (marker) {
      var address = marker.gsx$mealsiteaddress1.$t
      address = address.replace(/\s/g, '%20')
      var city = marker.gsx$city.$t.replace(/\s/g, '%20')
      var state = marker.gsx$state.$t.replace(/\s/g, '%20')
      address = address + '%2C%20' + city + '%2C%20' + state + '%20' + marker.gsx$zip.$t
      return address
    },
    directionsLink: function (address) {
      return 'https://www.google.com/maps/dir/?api=1&destination=' + address
    },
    showMaximizeDetails: function () {
      this.maxDetails = true
    },
    showMinimizeDetails: function () {
      this.maxDetails = false
    },
    closed: function (business) {
      var todayNum = new Date().getDay()
      var todayDay = days[todayNum]
      if (business.marker[todayDay].$t == 0) {
        return true
      } else return false
    },
    hours: function (business) {
      var today = new Date().getDay()
      var day = days[today]
      return business.marker[day].$t
    },
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
.root {
  --primary-color: red;
}

.business-details-mobile {
  max-height: calc(100vh - 86px - 62px);
  position: fixed;
  bottom: 0;
  text-align: auto;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  @media (max-height: 550px) {
    max-height: 400px;
  }
}

.backtomap {
  font-size: 0.8rem;
  padding-top: 30px;
  color: var(--primary-color);
  font-weight: bold;
  //@media (prefers-color-scheme: dark) {
  //  color: theme-color('quinary');
  //}

  i {
    margin-right: 0.375rem;
  }

  // &:hover {
  //   background: rgba(0, 0, 0, 0.05) !important;
  //   cursor: pointer;
  // }
}
.details {
  font-size: 0.8rem;

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
    font-size: 1.8rem;
    //color: theme-color('quinary');
    margin: 7px 10px 7px 0;
    float: left;
    @media (prefers-color-scheme: dark) {
      //color: theme-color-level('quinary', 5);
    }
  }
}

.busName {
  margin-left: 0px;
  width: 100%;
}

.green {
  font-size: 0.8rem;
  // color: #666;

  & > div {
    width: 100%;
  }
}

.updated {
  color: #aaa;
}

.share-button {
  font-size: 0.8rem;
  padding: 0.175rem 1rem;
  color: var(--primary-color);
  // @media (prefers-color-scheme: dark) {
  //   color: theme-color-level('primary', 2);
  // }
}

.closed-badge {
  display: inline-block;
  border-radius: 100px;
  background-color: $marker-closed;
  border: 1px solid $gray-400;
  color: $gray-100;
  padding: 2px 6px;
  margin-bottom: 8px;
  margin-right: 5px;
  font-size: 0.7rem;
}
.hours-badge {
  display: inline-block;
  border-radius: 100px;
  background-color: $marker-open;
  border: 1px solid $gray-400;
  color: $gray-100;
  padding: 2px 6px;
  margin-bottom: 8px;
  margin-right: 5px;
  font-size: 0.7rem;
}

// #icon-list-mobile {
//   display: none;
// }

@media (min-width: 768px) {
  #business-details-mobile-nav {
    display: none;
  }
  #back-to-list-mobile-nav {
    display: none;
  }
}
</style>
