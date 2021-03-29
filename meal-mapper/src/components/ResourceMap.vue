<template>
  <b-container class="bv-example-row px-0" fluid>
    <div class="map">
      <l-map
        ref="covidMap"
        v-if="showMap"
        :zoom="zoom"
        :center="center"
        :options="mapOptions"
        :maxZoom="max"
        :minZoom="min"
        style="height: 100%; width: 100%;"
        @update:center="centerUpdated"
        @update:zoom="zoomUpdated"
        @update:bounds="boundsUpdated"
      >
        <l-control position="topright">
          <div class="mapkey" :class="{ 'show-key': showKey }">
            <div class="title-block">
              <h6 class="title">{{ $t('mapKey.mapKeyTitle') }}</h6>
              <i @click="showKey = !showKey" class="fas fa-info-circle" v-if="!showKey" />
              <i @click="showKey = !showKey" class="fas fa-times-circle" v-if="showKey" />
            </div>
            <div class="keys" :class="{ 'show-key': showKey }" v-for="item in mapKey" v-bind:key="item.title">
              <icon-list-item :leaflet-icon="item.icon" :title="item.title" link />
            </div>
          </div>
        </l-control>
        <l-tile-layer :url="mapUrl" :attribution="attribution" />
        <l-circle
          name="Accuracy"
          :lat-lng="userLocationData"
          v-if="userLocationData"
          :radius="accuracyRadius()"
          :weight="1"
          :class-name="'locAccuracy'"
        ></l-circle>
        <l-circle-marker
          name="Your Location"
          :lat-lng="userLocationData"
          v-if="userLocationData"
          :radius="circleRadius()"
          :weight="1"
          :class-name="'locMarker'"
        ></l-circle-marker>
        <l-marker :icon="locationIcon()" :lat-lng="searchLocationData" v-if="searchLocationData"></l-marker>
        <v-marker-cluster ref="marks" :options="clusterOptions">
          <!-- @clusterclick="click()" @ready="ready" -->
          <l-marker
            :lat-lng="latLng(item.marker.gsx$lat.$t, item.marker.gsx$lon.$t)"
            :icon="
              selectedIcon(
                location.currentBusiness !== null && item.marker.id.$t === location.currentBusiness.marker.id.$t,
                hoverIt !== null && hoverIt.marker.id.$t === item.marker.id.$t,
                item
              )
            "
            v-for="(item, index) in filteredMarkers"
            v-bind:key="index"
            @mouseover="$emit('hover-over', item)"
            @mouseleave="$emit('hover-leave')"
            @click="
              $emit('location-selected', {
                locValue: index,
                locId: item.marker.id.$t,
                isSetByMap: true
              })
            "
          ></l-marker>
        </v-marker-cluster>
        <l-control position="bottomright" class="user-location-button">
          <a href="#" @click="getUserLocation" class="user-location-link" ref="useLocation">
            <i class="fas fa-location-arrow"></i>
          </a>
        </l-control>
        <b-alert variant="warning" class="location-alert" :show="showError" dismissible @dismissed="resetError" fade>{{
          errorMessage
        }}</b-alert>
      </l-map>
    </div>
  </b-container>
</template>

<script>
import { BAlert } from 'bootstrap-vue'
import { LMap, LTileLayer, LMarker, LControl, LCircle, LCircleMarker } from 'vue2-leaflet'
import { latLng, Icon, ExtraMarkers } from 'leaflet'
import Vue2LeafletMarkerCluster from 'vue2-leaflet-markercluster'
import IconListItem from './IconListItem.vue'
import { businessIcon } from '../utilities'
import { districtData } from '../themes/MealsForFamilies/districtData'
import { eventManager } from '../main'

document.documentElement.style.setProperty('--primary-color', districtData.colors.primaryColor)
console.log('Resource Map ran')

delete Icon.Default.prototype._getIconUrl
Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
})

export default {
  name: 'ResourceMap',
  components: {
    BAlert,
    LMap,
    LTileLayer,
    LMarker,
    LControl,
    LCircle,
    LCircleMarker,
    'v-marker-cluster': Vue2LeafletMarkerCluster,
    IconListItem
  },
  props: {
    filteredMarkers: Array,
    location: {
      locValue: Number,
      currentBusiness: Object,
      isSetByMap: Boolean
    },
    searchLocationData: { lat: Number, lng: Number },
    mapUrl: String,
    attribution: String,
    centroid: { lat: Number, lng: Number },
    hoverIt: Object
  },
  created() {
    eventManager.$on('zoomOut', (zoomAmount) => {
      this.zoom -= zoomAmount
    })
  },
  data() {
    return {
      center: latLng(this.centroid.lat, this.centroid.lng),
      zoom: this.centroid.zoom,
      max: districtData.settings.maxZoom,
      min: districtData.settings.minZoom,
      showParagraph: true,
      showError: false,
      errorMessage: '',
      userLocationData: false,
      mapOptions: { zoomSnap: 0.5, setView: true },
      showMap: true,
      locationData: location,
      accuracy: 0,
      circle: {
        border: 'white',
        fill: '#f00'
      },
      clusterOptions: {
        spiderfyOnMaxZoom: true,
        maxClusterRadius: 40,
        disableClusteringAtZoom: districtData.settings.clusterZoom
      },
      showKey: true
    }
  },
  mounted() {
    this.editZoomControl()
    this.$nextTick(() => {
      this.$emit('bounds', this.$refs.covidMap.mapObject.getBounds())
    })
  },
  computed: {
    mapKey() {
      return [
        {
          title: this.$t('mapKey.openToday'),
          icon: ExtraMarkers.icon({
            className: 'markeropen',
            icon: 'na',
            prefix: 'fa',
            svg: true
          })
        },
        {
          title: this.$t('mapKey.closedToday'),
          icon: ExtraMarkers.icon({
            className: 'markerclosed',
            icon: 'na',
            prefix: 'fa',
            svg: true
          })
        },
        {
          title: this.$t('mapKey.selected'),
          icon: ExtraMarkers.icon({
            className: 'markerselected',
            icon: 'na',
            prefix: 'fa',
            svg: true
          })
        },
        {
          title: this.$t('mapKey.searched'),
          icon: ExtraMarkers.icon({
            markerColor: 'pink',
            icon: 'na',
            prefix: 'fa',
            svg: true
          })
        }
      ]
    }
  },
  methods: {
    centerUpdated(center) {
      this.center = center
      this.$emit('center', center)
    },
    boundsUpdated(bounds) {
      this.$emit('bounds', bounds)
    },
    resetError() {
      this.showError = false
      this.errorMessage = ''
    },
    userIcon() {
      const icon = ExtraMarkers.icon({
        markerColor: 'usermarker',
        icon: 'fas fa-home',
        prefix: 'fa',
        svg: true
      })
      return icon
    },
    locationIcon() {
      const icon = ExtraMarkers.icon({
        markerColor: 'pink',
        icon: 'fas fa-map-pin',
        prefix: 'fa',
        svg: true
      })
      return icon
    },
    zoomUpdated(zoom) {
      this.zoom = zoom
      this.$emit('zoom', zoom)
      eventManager.$emit('zoomChanged', zoom)
    },
    getUserLocation() {
      var map = this.$refs.covidMap.mapObject
      map.locate({
        setView: true,
        enableHighAccuracy: true,
        watch: true,
        maximumAge: 60000
      })
      map.on('locationfound', (locationEvent) => {
        if (locationEvent.latitude && locationEvent.longitude) {
          this.userLocationData = latLng(locationEvent.latitude, locationEvent.longitude)
          // this.centerUpdated(this.userLocationData)
          this.accuracy = locationEvent.accuracy
          this.$refs.useLocation.classList.add('active')
        }
      })
      map.on('locationerror', (err) => {
        if (err.message && err.code != err.TIMEOUT) {
          this.showError = true
          this.errorMessage = err.message
          this.errorMessage += ' Please check your browser settings and ensure you have given our site permission to view your location.'
          this.$refs.useLocation.classList.add('disabled')
        }
      })
    },
    editZoomControl() {
      const zoomControl = this.$el.querySelector('.leaflet-top.leaflet-left')
      zoomControl.className = 'leaflet-bottom leaflet-right'
    },
    circleRadius() {
      var radius = 8
      if (radius <= 5) {
        radius = 5
      }
      return radius
    },
    accuracyRadius() {
      var radius = this.accuracy
      return radius
    },
    latLng,
    selectedIcon(selected, hovered, item) {
      const isOpen = item.oc
      let markerColor = isOpen ? 'markeropen' : 'markerclosed'
      const iconClasses = businessIcon()
      if (selected) {
        markerColor = 'markerselected'
      } else if (hovered) {
        markerColor = 'markerhover'
      }
      var markerIcon = ExtraMarkers.icon({
        className: markerColor,
        icon: iconClasses,
        prefix: 'fa',
        svg: true
        // ,
        // name: item.marker.gsx$providername.$t,
        // nameClasses: 'markerName'
      })

      return markerIcon
    }
    // eslint-disable-next-line no-console
    // click: (e) => console.log('clusterclick', e),
    // eslint-disable-next-line no-console
    // ready: (e) => console.log('ready', e)
  },
  watch: {
    // https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png
    location: function (locationVal) {
      if (locationVal.isSetByMap) {
        return
      }
      // var item = this.filteredMarkers[locationVal.locValue]
      if (locationVal.currentBusiness !== null && this.$refs.covidMap.mapObject.getZoom() < 17) {
        this.$refs.covidMap.mapObject.setView(
          latLng(locationVal.currentBusiness.marker.gsx$lat.$t, locationVal.currentBusiness.marker.gsx$lon.$t),
          17,
          { duration: 1 }
        )
      }
    }
  }
}
</script>

<style lang="scss">
.root {
  --primary-color: red;
}

.map {
  width: auto;
  height: 100%;
  top: 0;
  padding: 0;
  /* margin-left: 8px;
    margin-right: 8px; */
}

.marker-cluster-small {
  background-color: #7eb0e6 !important;
}
.marker-cluster-small div {
  background-color: #4196f2 !important;
}

.marker-cluster-medium {
  background-color: #7eb0e6 !important;
}
.marker-cluster-medium div {
  background-color: #4196f2 !important;
}

.marker-cluster-large {
  background-color: #7eb0e6 !important;
}
.marker-cluster-large div {
  background-color: #4196f2 !important;
}

.locAccuracy {
  color: $map-accuracy-outline;
  fill: $map-accuracy;
  fill-opacity: 0.15;
  cursor: grab !important;
}

.locMarker {
  color: $map-location-outline;
  fill: $map-location;
  fill-opacity: 1;
  cursor: grab !important;
}

.alert-warning {
  @media (prefers-color-scheme: dark) {
    background-color: theme-color-level('warning', 2) !important;
    color: theme-color-level('warning', 8) !important;
    border-color: theme-color-level('warning', 2) !important;
  }
}

.bv-example-row {
  height: 100%;
}

@include media-breakpoint-up(sm) {
  .bv-example-row {
    height: 100%;
  }
}

.markerselected svg path {
  fill: $marker-selected;
}

div.markeropen svg path {
  fill: $marker-open;
}

.markerclosed svg path {
  fill: $marker-closed;
}

.markerhover svg path {
  fill: $marker-selected;
}

.usermarker {
  background-color: $user-marker;
}

.noselection.bv-example-row {
  height: 100%;
}

.mapkey {
  padding: 16px;

  &.show-key {
    background-color: $map-key-bg !important;
    color: $map-key;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
    @media (prefers-color-scheme: dark) {
      background-color: $map-key-bg-dark !important;
      color: $map-key-dark;
    }
  }

  i {
    font-size: 2rem;
    opacity: 0.4;
    color: #000;
    cursor: pointer;
    vertical-align: middle;
    @media (prefers-color-scheme: dark) {
      color: #fff;
    }
  }

  &.show-key i {
    opacity: 1;
    color: theme-color('secondaryDark');
    @media (prefers-color-scheme: dark) {
      color: #fff;
    }
  }

  @media (max-width: 768px) {
    padding: 8px;
  }
}

.title-block {
  width: 100%;
  text-align: right;
  padding-bottom: 6px;
}

.mapkey .title {
  vertical-align: middle;
  margin: 0 8px;
  display: none;
}

.keys {
  display: none;
  margin-right: -125px;
}

.show-key {
  display: block;
}
.mapkey.show-key .title {
  display: inline;
}
.mapkey {
  margin-top: 40px;
}
.location-alert {
  position: absolute;
  bottom: 0px;
  left: calc(50% - 175px);
  width: 350px;
  z-index: 1000;
}
.leaflet-bottom .leaflet-control-zoom {
  margin-bottom: 26px !important;
}
.leaflet-control-zoom a:hover {
  background-color: #f4f4f4 !important;
  @media (prefers-color-scheme: dark) {
    background-color: $gray-300 !important;
  }
}
.leaflet-control-zoom a.leaflet-disabled {
  background-color: #f4f4f4 !important;
  @media (prefers-color-scheme: dark) {
    background-color: $gray-300 !important;
  }
}
.user-location-button {
  bottom: 68px !important;
  right: 2px !important;
  @media (min-width: 768px) {
    right: 0px !important;
  }
}
.user-location-link {
  border-radius: 2.5px;
  background-position: 50% 50%;
  background-repeat: no-repeat;
  display: block;
  background-color: $white;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.65);
  width: 30px;
  height: 30px;
  line-height: 30px;
  @media (min-width: 768px) {
    width: 26px;
    height: 26px;
    line-height: 26px;
    border-radius: 4px;
  }
  text-align: center;
  color: #000 !important;
  &:hover {
    background-color: #f4f4f4;
    @media (prefers-color-scheme: dark) {
      background-color: $gray-300 !important;
    }
  }
  &.active {
    color: var(--primary-color) !important;
  }
  &.disabled {
    color: var(--primary-color) !important;
  }
}
</style>
