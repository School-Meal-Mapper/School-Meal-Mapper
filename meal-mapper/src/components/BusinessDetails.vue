<template>
  <span>
    <b-list-group class="list-group-flush">
      <b-list-group-item variant="sideNav" button class="backtolist" id="back-to-list-nav" @click="$emit('close-details')">
        <i class="fas fa-arrow-left" />
        {{ $t('mapPrompts.backToList') }}
      </b-list-group-item>
    </b-list-group>
    <b-list-group class="list-group-flush business-details" id="business-details-nav">
      <b-list-group-item variant="sideNav" :class="infotype">
        <!--<b-button @click="$emit('close-details')" class="close-button">Close</b-button>-->
        <i @click="$emit('close-details')" class="fas fa-times-circle close-button" />
        <div>
          <div class="title">
            <div class="busName">
              <h5>{{ business.marker.gsx$mealsitename.$t }}</h5>
            </div>
          </div>
          <p v-if="getAddress(business.marker) !== ''">
            <b>{{ $t('mealSiteCard.address') }}</b
            ><br />
            {{ getAddress(business.marker) }}
          </p>

          <p v-if="business.marker.gsx$additionaldirections != null && business.marker.gsx$additionaldirections.$t !== ''">
            <b>{{ $t('label.description') }}:</b><br />
            {{ 'Additional directions' }}
          </p>
          <icon-list-item
            icon="fa fa-directions"
            :title="$t('mealSiteCard.getDirections')"
            :link="directionsLink(business.marker)"
            target="_blank"
          />
          <i class="fas fa-share-alt fa-lg" id="share-icon" aria-hidden="true" />
          <b-button variant="link" class="share-button" @click="$bvModal.show('share-location')">{{
            $t('mealSiteCard.shareLocation')
          }}</b-button>

          <p v-if="showFullDetails()">
            <icon-list-item
              v-if="info != null && info[0].gsx$menulink !== undefined && !!info[0].gsx$menulink.$t"
              icon="fas fa-apple-alt"
              :title="$t('mealSiteCard.weeklyMenu')"
              :link="info[0].gsx$menulink.$t"
              target="_blank"
            />
            <icon-list-item
              v-if="hasFaqs"
              icon="fas fa-question-circle"
              title="Questions and contact information"
              :link="generateFaqUrl()"
              target="_self"
            />
          </p>
          <opening-hours :business="business.marker" :title="$t('mealSiteCard.hours')" v-if="showFullDetails()"></opening-hours>

          <template v-if="business.marker.gsx$notes !== undefined && !!business.marker.gsx$notes.$t && showFullDetails()">
            <p>
              <b>{{ $t('mealSiteCard.notes') }}:</b><br />{{ business.marker.gsx$notes.$t }}
            </p>
          </template>

          <p class="updated" v-if="getLastUpdatedDate != 'Invalid Date' && showFullDetails()">
            {{ $t('mealSiteCard.detailsLastUpdated') }} {{ getLastUpdatedDate }}
          </p>

          <p v-if="showFullDetails()">
            <b-button variant="outline-primary" size="sm" class="suggest-edit" @click="$bvModal.show('suggest-edit')">
              {{ $t('mealSiteCard.suggestAnEdit') }}
            </b-button>
          </p>
          <br v-if="!showFullDetails()" />
          <br v-if="!showFullDetails()" />
          <b-button variant="outline-primary" class="details" v-if="!showFullDetails()" @click="showMaximizeDetails()">{{
            $t('mealSiteCard.expandDetails')
          }}</b-button>
          <b-button variant="outline-primary" class="details" v-if="maxDetails" @click="showMinimizeDetails()">{{
            $t('mealSiteCard.minimizeDetails')
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
import { districtData } from '../themes/MealsForFamilies/districtData'

document.documentElement.style.setProperty('--primary-color', districtData.colors.primaryColor)
document.documentElement.style.setProperty('--banner-light', districtData.colors.bannerColor)
document.documentElement.style.setProperty('--banner-dark', districtData.colors.bannerColorDark)
document.documentElement.style.setProperty('--nav-link-light', districtData.colors.navLink)
document.documentElement.style.setProperty('--nav-link-dark', districtData.colors.navLinkDark)

export default {
  name: 'BusinessDetails',
  components: {
    OpeningHours,
    IconListItem
  },
  data() {
    return {
      maxDetails: false
    }
  },
  props: {
    infotype: { type: String },
    icon: { type: String },
    business: Object,
    info: Array,
    hasFaqs: Boolean
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
    generateFaqUrl() {
      var urlString = window.location.href
      var url = new URL(urlString)
      const origin = url.origin
      const district = url.search.split('?')[1]
      if (district == null) {
        window.location.reload()
      }
      console.log(origin + '/#/' + district + '/' + 'faqs')
      return origin + '/#/' + district + '/' + 'faqs'
    },
    directionsLink: function (marker) {
      return 'https://www.google.com/maps/dir/?api=1&destination=' + marker.gsx$lat.$t + ',' + marker.gsx$lon.$t
    },
    showFullDetails: function () {
      return (this.maxDetails == true && window.screen.width < 769) || window.screen.width >= 769
    },
    showMaximizeDetails: function () {
      this.maxDetails = true
    },
    showMinimizeDetails: function () {
      this.maxDetails = false
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
  --primary-color: blue;
  --banner-light: '#E9ECEF';
  --banner-dark: '#212529';
  --nav-link-light: '#F8F8F8';
  --nav-link-dark: '#F8F8F8';
}

.business-details {
  max-height: calc(100vh - 86px - 62px);
  overflow-y: auto;
  overflow-x: hidden;

  @media (max-width: 768px) {
    position: fixed;
    bottom: 0;
    text-align: auto;
    width: 100%;
    @media (max-height: 550px) {
      max-height: 400px;
    }
  }
}
.backtolist {
  font-size: 0.8rem;
  padding-top: 30px;

  i {
    margin-right: 0.375rem;
  }
  @media (max-width: 768px) {
    display: none;
  }
}

.title {
  margin: 0 0 0.75rem 0;
  display: inline-block;
  @media (min-width: 769px) {
    i {
      font-size: 3rem;
      //color: theme-color('quinary');
      margin: 7px 10px 7px 0;
      float: left;
    }
  }
  @media (max-width: 768px) {
    i {
      font-size: 1.8rem;
      margin: 7px 10px 7px 0;
      float: left;
    }
  }
}

.busName {
  margin-left: 0px;

  @media (min-width: 769px) {
    width: 208px;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
}

.green {
  font-size: 0.8rem;
  // color: #666;
  @media (min-width: 769px) {
    & > div {
      width: 243px;
    }
  }
  @media (max-width: 768px) {
    & > div {
      width: 100%;
    }
  }
}

.updated {
  color: #aaa;
}

.close-button {
  @media (min-width: 769px) {
    display: none;
  }
  float: right;
  font-size: 2rem;
}

.btn-outline-primary {
  color: #313639 !important;
  border-color: #313639 !important;
  @media (prefers-color-scheme: dark) {
    color: #f8f8f8 !important;
    border-color: #f8f8f8 !important;
  }
}

.btn-outline-primary:hover {
  color: var(--nav-link-light) !important;
  background-color: var(--banner-light) !important;
  @media (prefers-color-scheme: dark) {
    color: var(--nav-link-dark) !important;
    background-color: var(--banner-dark) !important;
  }
}

.share-button {
  font-size: 0.8rem;
  color: #007bff;

  @media (min-width: 769px) {
    padding: 0.375rem 1rem;
  }
  @media (max-width: 768px) {
    padding: 0.175rem 1rem;
  }
}

/*@media (max-width: 768px) {
  #business-details-nav {
    display: none;
  }
  #back-to-list-nav {
    display: none;
  }
}*/
</style>
