<template>
  <div class="resultWrapper" id="search-filter-wrapper">
    <div
      class="tab bg-dialogs border-right border-top border-bottom"
      @click="$emit('toggle')"
    >
      <i class="fas fa-caret-down" />
    </div>

    <BusinessDetails
      :infotype="'green'"
      :icon="'fa-tractor'"
      :business="location.currentBusiness"
      v-if="location.currentBusiness != null && showResults != true"
      @close-details="closeDetails"
    ></BusinessDetails>

    <b-list-group
      ref="results"
      class="resultList list-group-flush"
      v-if="showResults"
    >
      <b-list-group-item
        action
        variant="sideNav"
        v-for="(item, index) in filteredMarkers"
        v-bind:key="index"
        class="resultItem"
        :class="{
          selected: index == location.locValue,
          closedOne: item.oc == false,
        }"
        :ref="'result' + index"
        @click="
          $emit('location-selected', {
            locValue: index,
            isSetByMap: false,
          })
        "
      >
        <h5 class="resultTitle">{{ item.marker.gsx$providername.$t }}</h5>
        <template v-if="!!item.marker.gsx$provideraddloc.$t"
          ><div class="addloc">
            {{ item.marker.gsx$provideraddloc.$t }}
          </div></template
        >
        <div v-if="!item.oc" class="closed">{{ getClosedMessage() }}</div>
        <span class="resultAddress">
          <span v-if="!!item.marker.gsx$cuisine.$t"
            >{{ item.marker.gsx$cuisine.$t }}<br
          /></span>
          {{ item.marker.gsx$address.$t
          }}{{ item.marker.gsx$address.$t !== "" ? "," : "" }}
          {{ item.marker.gsx$city.$t }}
        </span>
        <template v-if="item.marker.gsx$discountmedical.$t == 1"
          ><span :title="$tc('label.discountmedical', 1)"
            ><i class="fas fa-user-md" /></span
        ></template>
        <template v-if="item.marker.gsx$familymeal.$t == 1"
          ><span :title="$tc('category.family', 2)"
            ><i class="fas fa-user-friends" /></span
        ></template>
        <template v-if="item.marker.gsx$mealstudent.$t == 1"
          ><span :title="$tc('label.mealstudent', 1)"
            ><i class="fas fa-school" /></span
        ></template>
        <template v-if="item.marker.gsx$mealstudent.$t == 1"
          ><span :title="$tc('label.mealpublic', 1)"
            ><i class="fas fa-users" /></span
        ></template>
        <template v-if="item.marker.gsx$drivethru.$t == 1"
          ><span :title="$t('label.drivethru')"
            ><i class="fas fa-car-side" /></span
        ></template>
        <template v-if="item.marker.gsx$curbside.$t == 1"
          ><span :title="$tc('label.curbside', 1)"
            ><i class="fas fa-car" /></span
        ></template>
        <template v-if="item.marker.gsx$orderonline.$t == 1"
          ><span :title="$t('label.orderonline')"
            ><i class="fas fa-mouse" /></span
        ></template>
        <template v-if="item.marker.gsx$delivery.$t == 1"
          ><span :title="$t('label.delivery')"
            ><i class="fas fa-shipping-fast" /></span
        ></template>
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
import { weekdaysJs } from "../constants";
import BusinessDetails from "./BusinessDetails.vue";

export default {
  name: "ResultsList",
  data() {
    return {
      selected: false,
      today: new Date().getDay(),
      locationData: location,
      showListing: this.showList,
    };
  },
  components: {
    BusinessDetails,
  },
  props: {
    filteredMarkers: Array,
    location: {
      locValue: Number,
      isSetByMap: Boolean,
      currentBusiness: Object,
    },
    showResults: Boolean,
    selectedDay: Number,
  },
  watch: {
    location: function (locationVal) {
      if (locationVal.isSetByMap) {
        var top =
          this.$refs["result" + locationVal.locValue][0].offsetTop - 330;
        this.$refs["results"].scrollTo(0, top);
      }
      this.showResults = false;
      this.showList = true;
    },
  },
  methods: {
    getClosedMessage: function () {
      if (this.selectedDay > 6) {
        return this.$t(`label.closed-today`);
      }

      return `${this.$t("label.closed-on")} ${this.$t(
        `dayofweek.${weekdaysJs[this.selectedDay].day}`
      )}`;
    },
    closeDetails: function () {
      this.showResults = true;
      this.location.currentBusiness = null;
    },
  },
};
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
  background: theme-color("secondary");
  @media (prefers-color-scheme: dark) {
    background: theme-color("secondaryDark");
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

.addloc {
  margin-bottom: 8px;
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
    color: theme-color("tertiary");
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
