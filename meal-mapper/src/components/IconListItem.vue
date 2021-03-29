<template>
  <div>
    <template v-if="link != ''">
      <div class="iconListItem">
        <div class="ilIcon">
          <div class="leafletIcon" v-if="leafletIcon" v-html="generateIcon"></div>
          <i class="fas" v-bind:class="icon" v-if="icon != ''"></i>
          <img :src="image" v-if="icon == null || icon == ''" />
        </div>
        <div class="ilTitle">
          <a :href="link" :target="target" v-if="link != null && link != ''">
            <span class="title">{{ title }}</span>
          </a>
          <span class="title" v-if="link == null || link == ''">{{ title }}</span>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="iconListItem">
        <div class="ilIcon">
          <div class="leafletIcon" v-if="leafletIcon" v-html="generateIcon"></div>
          <i class="fas" v-bind:class="icon" v-if="icon != ''"></i>
          <img :src="image" v-if="icon == null || icon == ''" />
        </div>
        <div class="ilTitle">
          <span class="title">{{ title }}</span>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { districtData } from '../themes/MealsForFamilies/districtData'

document.documentElement.style.setProperty('--primary-color', districtData.colors.primaryColor)

export default {
  name: 'IconListItem',
  data() {
    return {
      selected: false
    }
  },
  props: {
    leafletIcon: {},
    title: { type: String },
    link: { type: String },
    icon: { type: String },
    image: { type: String },
    target: { type: String }
  },
  computed: {
    generateIcon() {
      return this.leafletIcon.createIcon().outerHTML
    }
  }
}
</script>

<style lang="scss">
.root {
  --primary-color: red;
}

.iconListItem {
  div {
    display: inline-block;
    line-height: 1.2rem;
    vertical-align: middle;
    margin: 0.25rem 0;
  }
  a {
    color: #007bff;
    // @media (prefers-color-scheme: dark) {
    //   color: theme-color-level(primary, 2);
    // }
  }

  .leafletIcon {
    margin: 0 0 0 0 !important;

    & .leaflet-marker-icon {
      position: static;
      margin: 0 0 0 0 !important;
      width: 32px !important;
      height: 44px !important;
    }
  }
}

.ilIcon {
  font-size: 1.2rem;
  width: 33px;
}

.ilTitle {
  width: 210px;
}
</style>
