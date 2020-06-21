<template>
  <div class="resultWrapper" id="search-filter-wrapper">
    <div class="tab bg-dialogs border-right border-top border-bottom" @click="$emit('toggle')">
      <i class="fas fa-caret-down" />
    </div>

    <BusinessDetails
      :infotype="'green'"
      :icon="'fa-tractor'"
      :business="location.currentBusiness"
      v-if="location.currentBusiness != null && showResults != true"
      @close-details="closeDetails"
    ></BusinessDetails>

    <b-list-group ref="results" class="resultList list-group-flush" v-if="showResults">
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
        @click="
          $emit('location-selected', {
            locValue: index,
            isSetByMap: false
          })
        "
      >
        <h5 class="resultTitle">{{ item.marker.gsx$mealsitename.$t }}</h5>
        <span class="resultAddress">
          {{ item.marker.gsx$mealsiteaddress.$t }}{{ item.marker.gsx$mealsiteaddress.$t !== '' ? ',' : '' }}
          {{ item.marker.gsx$city.$t }}
        </span>
        <div>
          <span class="closed-badge" v-if="closed(item)">
            {{ getClosedMessage() }}
          </span>
          <span class="hours-badge" v-if="!closed(item)">
            {{ hours(item) }}
          </span>
        </div>
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
import { days } from '../constants'

import BusinessDetails from './BusinessDetails.vue'

export default {
  name: 'ResultsList',
  data() {
    return {
      selected: false,
      today: new Date().getDay(),
      locationData: location,
      showListing: this.showList
    }
  },
  components: {
    BusinessDetails
  },
  props: {
    filteredMarkers: Array,
    location: {
      locValue: Number,
      isSetByMap: Boolean,
      currentBusiness: Object
    },
    showResults: Boolean,
    selectedDay: Number
  },
  watch: {
    location: function (locationVal) {
      if (locationVal.isSetByMap) {
        var top = this.$refs['result' + locationVal.locValue][0].offsetTop - 330
        this.$refs['results'].scrollTo(0, top)
      }
      this.showResults = false
      this.showList = true
    }
  },
  methods: {
    getClosedMessage: function () {
      return this.$t(`label.closed-today`)
    },
    closeDetails: function () {
      this.showResults = true
      this.location.currentBusiness = null
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
  max-width: 294px;
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
.resultList {
  max-height: calc(100vh - 70px);
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

.resultTitle {
  font-size: 0.9rem;
  margin-bottom: 0;
}
.resultAddress {
  font-size: 0.8rem;
  display: block;
  max-width: 262px;
}
// .closedOne {
//   /* background: #f9f9f9 !important; */
// }
</style>
