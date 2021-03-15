<template>
  <div class="resultWrapper" id="search-filter-wrapper">
    <div class="tab bg-dialogs border-right border-top border-bottom" @click="$emit('toggle')">
      <i class="fas fa-caret-down" />
    </div>

    <BusinessDetails
      :infotype="'green'"
      :icon="'fa-tractor'"
      :business="location.currentBusiness"
      :info="info"
      v-if="location.currentBusiness != null && showRes != true"
      @close-details="closeDetails"
      :hasFaqs="hasFaqs"
    ></BusinessDetails>

    <BusinessDetailsMobile
      :infotype="'green'"
      :icon="'fa-tractor'"
      :business="location.currentBusiness"
      :closedMessage="getClosedMessage()"
      v-if="location.currentBusiness != null && showRes != true"
      @close-details="closeDetails"
    ></BusinessDetailsMobile>

    <b-list-group ref="results" class="resultList list-group-flush" v-if="showRes" id="results-list-nav">
      <b-alert v-if="!filteredMarkers.length" show class="noresults">
        <strong>{{ this.$t('zoom.noresults') + ' ' + this.$t('zoom.zoomout') }}</strong>
      </b-alert>
      <b-list-group-item
        action
        variant="sideNav"
        v-for="(item, index) in filteredMarkers"
        v-bind:key="index"
        class="resultItem"
        :class="{
          selected: index == location.locValue,
          closedOne: item.oc == false
        }"
        :ref="'result' + index"
        @mouseover="$emit('hover-over', item)"
        @mouseleave="$emit('hover-leave')"
        @click="
          $emit('location-selected', {
            locValue: index,
            isSetByMap: false
          })
        "
      >
        <h5 class="resultTitle">{{ item.marker.gsx$mealsitename.$t }}</h5>
        <span class="resultAddress">
          {{ item.marker.gsx$mealsiteaddress1.$t }}{{ item.marker.gsx$mealsiteaddress1.$t !== '' ? ',' : '' }}
          {{ item.marker.gsx$city.$t }}
        </span>
        <i class="fa fa-chevron-right arrow"></i>
        <div>
          <span class="closed-badge" v-if="closed(item)">{{ getClosedMessage() }}</span>
          <span
            class="hours-badge"
            v-if="!closed(item) && (item.marker.gsx$specialsite == null || item.marker.gsx$specialsite.$t != '1')"
            >{{ hours(item) }}</span
          >
          <span
            class="special-badge"
            v-if="!closed(item) && item.marker.gsx$specialsite != null && item.marker.gsx$specialsite.$t == '1'"
            >{{ hours(item) }}</span
          >
        </div>
      </b-list-group-item>
    </b-list-group>
    <div>
      <b-card
        hover
        height="100%"
        class="zoom-card bottom"
        v-if="filteredMarkers.length && this.zoom > this.minZoom"
        @click="setZoom"
        id="resultslistnav"
      >
        {{ this.$t('zoom.zoomout') }}</b-card
      >
      <b-card hover height="100%" class="no-zoom-card bottom" v-if="filteredMarkers.length && this.zoom == this.minZoom">
        {{ this.$t('zoom.no-more-results') }}</b-card
      >
    </div>
  </div>
</template>

<script>
import { days } from '../constants'
import { eventManager } from '../main'
import BusinessDetails from './BusinessDetails.vue'
import { districtData } from '../themes/MealsForFamilies/districtData' // Hardcoded in to Meals For Families theme.
import BusinessDetailsMobile from './BusinessDetailsMobile.vue'

export default {
  name: 'ResultsList',
  data() {
    return {
      selected: false,
      today: new Date().getDay(),
      locationData: location,
      showListing: this.showList,
      zoom: districtData.settings.initialMapZoom,
      minZoom: districtData.settings.minZoom,
      showRes: this.showResults
    }
  },
  components: {
    BusinessDetails,
    BusinessDetailsMobile
  },
  props: {
    filteredMarkers: Array,
    info: Array,
    location: {
      locValue: Number,
      isSetByMap: Boolean,
      currentBusiness: Object
    },
    showResults: Boolean,
    selectedDay: Number,
    hasFaqs: Boolean
  },
  watch: {
    location: function (locationVal) {
      if (locationVal.isSetByMap && this.showResults) {
        var top = this.$refs['result' + locationVal.locValue][0].offsetTop - 330
        this.$refs['results'].scrollTo(0, top)
      }
      this.showRes = false
      this.showList = true
    }
  },
  created() {
    eventManager.$on('zoomChanged', (zoom) => {
      this.zoom = zoom
    })
  },
  methods: {
    // isEmpty() {
    //   return this.filteredMarkers === emp&& this.markers.length == 0
    // },
    getClosedMessage: function () {
      return this.$t(`label.closed-today`)
    },
    closeDetails: function () {
      this.showRes = true
      this.location.currentBusiness = null
      if (!this.location.isSetByMap) {
        eventManager.$emit('zoomOut', 3.0)
      }
    },
    closed: function (item) {
      var todayNum = new Date().getDay()
      var todayDay = days[todayNum]
      if (item.marker[todayDay].$t == 0) {
        return true
      } else return false
    },
    hours: function (item) {
      var today = new Date().getDay()
      var day = days[today]
      return item.marker[day].$t
    },
    setZoom: function () {
      eventManager.$emit('zoomOut', 3.0)
    }
  }
}
</script>

<style lang="scss">
.resultWrapper {
  scrollbar-color: $gray-900 $gray-700;
}

#search-filter-wrapper {
  margin-left: -290px;
  -webkit-transition: margin 0.25s ease-out;
  -moz-transition: margin 0.25s ease-out;
  -o-transition: margin 0.25s ease-out;
  transition: margin 0.25s ease-out;
  z-index: 1035;
  max-height: 100vh;
  width: 294px;
  background: theme-color('secondary');
  @media (prefers-color-scheme: dark) {
    background: theme-color('secondaryDark');
  }
}

#wrapper.toggled #search-filter-wrapper {
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
  @media (prefers-color-scheme: dark) {
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
  }
}

.tab,
#wrapper.toggled .tab {
  z-index: 0;
  box-shadow: 0px 0px 14px 0px rgba(0, 0, 0, 0.4);
  @media (prefers-color-scheme: dark) {
    box-shadow: 0px 0px 14px 0px rgba(255, 255, 255, 0.5);
  }
}
.arrow {
  position: absolute;
  bottom: 35px;
  right: 0px;
  color: $gray-400;
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
.special-badge {
  display: inline-block;
  border-radius: 100px;
  background-color: #9c9100;
  border: 1px solid $gray-400;
  color: $gray-100;
  padding: 2px 6px;
  margin-bottom: 8px;
  margin-right: 5px;
  font-size: 0.7rem;
}
.zoom-card {
  display: inline-block;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 294px;
  box-shadow: 0px -2px 4px rgba(0, 0, 0, 0.125);
  z-index: 99997;
  padding: 8px 0;
  text-align: center;
  background-color: theme-color-level('secondary', 3);
  color: theme-color('quaternary');
  @media (prefers-color-scheme: dark) {
    background-color: theme-color-level('secondaryDark', 5);
    color: theme-color-level('quaternary', 3);
  }
  @media (max-width: 768px) {
    display: none;
  }
  cursor: pointer;
}

.zoom-card:hover {
  text-decoration: underline !important;
}

.no-zoom-card {
  display: inline-block;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 294px;
  box-shadow: 0px -2px 4px rgba(0, 0, 0, 0.125);
  z-index: 99997;
  padding: 8px 0;
  text-align: center;
  background-color: theme-color-level('secondary', 3);
  color: theme-color('quaternary');
  @media (prefers-color-scheme: dark) {
    background-color: theme-color-level('secondaryDark', 5);
    color: theme-color-level('quaternary', 3);
  }
  @media (max-width: 768px) {
    display: none;
  }
}

.resultList {
  max-height: calc(100vh - 105px);
  overflow-y: overlay;
  padding-top: 20px;
}
.resultItem {
  padding: 10px;
  display: block;
  border-bottom: solid 1px rgba(0, 0, 0, 0.125);
  font-size: 0.8rem;
  max-width: 282px;
  cursor: pointer;
  //background: #fff;

  // @media (prefers-color-scheme: dark) {
  //   //color: $gray-100;
  //   //background: $gray-800;
  // }

  // a {
  //   //color: #000;
  // }

  & > span > i {
    margin-right: 8px;
    color: theme-color('tertiary');
    font-size: 1rem;
    margin-top: 6px;
  }
}

.noresults {
  color: theme-color('danger');
  @media (prefers-color-scheme: dark) {
    color: theme-color-level('danger', 2);
  }
}

.resultTitle {
  font-size: 0.9rem;
  margin-bottom: 0;
}
.resultAddress {
  font-size: 0.8rem;
  display: block;
  max-width: 262px;
}

@media (max-width: 768px) {
  #results-list-nav {
    display: none;
  }
}
// .closedOne {
//   /* background: #f9f9f9 !important; */
// }
</style>
