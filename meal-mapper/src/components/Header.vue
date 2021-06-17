<template>
  <b-navbar toggleable="lg" type="dark" class="banner" id="topnav">
    <div class="searchBar d-flex flex-row">
      <div>
        <b-navbar-brand :href="logoLink" class="left"> <slot></slot> </b-navbar-brand>
      </div>
      <!--<div class="p-2">
        <form class="form-group w-25 center-content right" v-if="districtAbbr != 'mff'">
          <b-form-input v-model="text" type="search" @keydown.native="search" :placeholder="$t('searchBar.searchPrompt')"></b-form-input>
          <a href="/" style="font-size: 0.7rem;">{{ $t('searchBar.otherDistrict') }}</a>
        </form>
      </div> -->
    </div>
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-item right v-if="hasFaqs && !onFaqPage()">
          <b-button size="sm" class="my-2 my-sm-0" variant="buttons" type="link" @click="generateFaqUrl()">
            <i class="fas info-plus-circle" aria-hidden="true"></i>
            <b>{{ $t('FAQs.hyperlinkText') }}</b>
          </b-button>
        </b-nav-item>
        <b-nav-item right v-if="hasFaqs && onFaqPage()">
          <b-button size="sm" class="my-2 my-sm-0" variant="buttons" type="link" @click="generateMapUrl()">
            <i class="fas info-plus-circle" aria-hidden="true"></i>
            <b>{{ $t('FAQs.backToMap') }}</b>
          </b-button>
        </b-nav-item>
        <b-nav-item right v-if="districtAbbr == 'mff'" href="https://meals4families.community/" target="_blank">
          <b-button size="sm" class="my-2 my-sm-0" variant="buttons" type="button">
            <i class="fas info-plus-circle" aria-hidden="true"></i>
            <b>{{ $t('landingPage.aboutUs') }}</b>
          </b-button>
        </b-nav-item>

        <!--
        <b-nav-item :href="item.url" v-for="(item, index) in socialMedia" v-bind:key="index">
          <i :class="'fab fa-' + item.icon"></i>
          <span class="sm-name">{{ item.name }}</span>
        </b-nav-item>
        -->
        <b-navbar-nav v-if="window.width > 991">
          <b-nav-item href="#" v-for="item in filteredLangs" v-bind:key="item.iso" class="d-lg-block d-xl-block">
            <span :title="$t('languages.' + item.iso)">
              <!-- <span :title="item.name"> -->
              <div
                v-html="item.name"
                :lang="item.iso"
                @click="$emit('language-selected', item)"
                :class="{ selected: item.name == language }"
              ></div>
            </span>
          </b-nav-item>
        </b-navbar-nav>
        <b-nav-item-dropdown right>
          <template v-slot:button-content>
            <i class="fas fa-language fa-xlg" aria-hidden="true" />
            <span v-if="window.width < 991" v-html="language" class="language" />
          </template>
          <b-dropdown-item href="#" v-for="item in selectLangs" v-bind:key="item.iso">
            <span :title="$t('languages.' + item.iso)">
              <!--<span :title="item.name">-->
              <div v-html="item.name" :lang="item.iso" @click="$emit('language-selected', item)"></div>
            </span>
          </b-dropdown-item>
        </b-nav-item-dropdown>
        <b-nav-item right href="/"><i class="fas fa-home fa-lg" aria-hidden="true" /></b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import { districtData } from '../themes/MealsForFamilies/districtData'
document.documentElement.style.setProperty('--banner-light', districtData.colors.bannerColor)
document.documentElement.style.setProperty('--banner-dark', districtData.colors.bannerColorDark)
document.documentElement.style.setProperty('--nav-link-light', districtData.colors.navLink)
document.documentElement.style.setProperty('--nav-link-dark', districtData.colors.navLinkDark)
document.documentElement.style.setProperty('--accentColor', districtData.colors.accentColor)

export default {
  name: 'app-header',
  props: {
    language: String,
    logoLink: String,
    socialMedia: Array,
    hasFaqs: Boolean
  },
  data() {
    return {
      languages: [
        { iso: 'en', name: 'English' },
        { iso: 'es', name: 'Espa&#241;ol' },
        { iso: 'fr', name: 'Fran&#231;ais' },
        { iso: 'ko', name: '한국어' },
        { iso: 'ar', name: 'عربى' },
        { iso: 'ja', name: '日本語' },
        { iso: 'zh', name: '中文' },
        { iso: 'ms', name: 'Melayu' },
        { iso: 'hi', name: 'हिंदी' },
        { iso: 'vi', name: 'tiếng việt' },
        { iso: 'bn', name: 'বাংলা' },
        { iso: 'hmn', name: 'Hmong' },
        { iso: 'am', name: 'አማርኛ' },
        { iso: 'my', name: 'ဗမာ' },
        { iso: 'ne', name: 'नेपाली' },
        { iso: 'pl', name: 'Polskie' },
        { iso: 'pt', name: 'português' },
        { iso: 'ru', name: 'русский' },
        { iso: 'so', name: 'Soomaali' },
        { iso: 'ur', name: 'اردو' }
      ],
      text: '',
      window: {
        width: 0,
        height: 0
      },
      districtAbbr: districtData.districtAbbr
    }
  },
  computed: {
    filteredLangs: function () {
      return this.languages.slice(0, 2)
    },
    selectLangs: function () {
      if (this.window.width > 991) {
        return this.languages.slice(2)
      } else {
        return this.languages
      }
    }
  },
  created() {
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
    console.log(this.$route)
  },
  methods: {
    search(event) {
      if (event.which === 13) {
        event.preventDefault()
        this.$emit('search', this.text)
      }
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
      window.location.href = origin + '/#/' + district + '/' + 'faqs'
    },
    generateMapUrl() {
      var urlString = window.location.href
      var url = new URL(urlString)
      const origin = url.origin
      const district = this.$route.params.district
      window.location.href = origin + '/?' + district
    },
    onFaqPage() {
      return this.$route.path.includes('faqs')
    },
    handleResize() {
      this.window.width = window.innerWidth
      this.window.height = window.innerHeight
    }
  }
}
</script>

<style lang="scss">
:root {
  --banner-light: '#E9ECEF';
  --banner-dark: '#212529';
  --nav-link-light: '#F8F8F8';
  --nav-link-dark: '#F8F8F8';
}

#topnav {
  position: absolute;
  width: 100%;
  z-index: 1038;
}

.navbar-brand {
  margin-right: 2px !important;
  font-size: 0.95rem !important;
  padding: 0.2rem 0 !important;
  font-weight: 600;
}

.add-business {
  float: right;
}

.language {
  padding: 0 5px;
}

.fa-xlg {
  font-size: 1.66666666em;
  line-height: 0.75em;
  vertical-align: -0.0667em;
}

.navbar-nav {
  margin-bottom: 16px !important;
}

.nav-item {
  margin: auto 0;
  text-align: right;
}

.navbar-nav > li > .dropdown-menu {
  background-color: var(--banner-light);
  text-align: right;
  @media (prefers-color-scheme: dark) {
    background-color: var(--banner-dark);
  }
}

.navbar-nav > li > .dropdown-menu a {
  color: var(--nav-link-light);
  @media (prefers-color-scheme: dark) {
    color: var(--nav-link-dark);
  }
}

.btn-buttons {
  background-color: var(--accentColor) !important;
  @media (prefers-color-scheme: light) {
    color: var(--navLink) !important;
  }
}

.navbar-nav > li > .dropdown-menu a:hover {
  background-color: $nav-dropdown-bg-hover;
  @media (prefers-color-scheme: dark) {
    background-color: $nav-dropdown-bg-hover-dark;
  }
}

.searchBar {
  display: flex;
}
.searchBar .left {
  flex: 1;
}
.searchBar.right {
  flex: 1;
}

@media (min-width: 768px) {
  .navbar-nav {
    margin-bottom: 0 !important;
  }
  .navbar-brand {
    margin-right: 2px !important;
    font-size: 1.25rem !important;
  }
}

.ncblue {
  color: $teal;
}

.sm-name {
  display: inline;
  @include media-breakpoint-up(lg) {
    display: none;
  }
}

.center-content {
  @media (max-width: 768px) {
    display: none;
  }
  position: fixed;
  margin-top: 1rem;
}

.searchTitle {
  color: var(--banner-light);
  @media (prefers-color-scheme: dark) {
    color: var(--banner-dark);
  }
}
.banner {
  background: var(--banner-light);
  @media (prefers-color-scheme: dark) {
    background: var(--banner-dark);
  }
}

.nav-link {
  color: var(--nav-link-light) !important;
  @media (prefers-color-scheme: dark) {
    color: var(--nav-link-dark) !important;
  }
}
</style>
