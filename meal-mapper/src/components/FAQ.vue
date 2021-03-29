<template>
  <b-modal id="faq" size="lg" dialog-class="m-0 m-md-auto" centered scrollable hide-header-close>
    <template v-slot:modal-title>
      {{ $t('FAQs.buttonText') }}
      <p v-if="info != null">
        For more information, check out the following resources:
        <a target="_blank" :href="info[0].gsx$weblink.$t" v-if="info[0].gsx$weblink !== undefined && !!info[0].gsx$weblink.$t">
          {{ getDomain(info[0].gsx$weblink.$t) }}
        </a>

        <a
          target="_blank"
          v-if="info[0].gsx$twitter !== undefined && !!info[0].gsx$twitter.$t"
          :href="'https://www.twitter.com/' + info[0].gsx$twitter.$t"
        >
          {{ '@' + info[0].gsx$twitter.$t }}
        </a>

        <a target="_blank" v-if="info[0].gsx$instagram !== undefined && !!info[0].gsx$instagram.$t" :href="'@' + info[0].gsx$instagram.$t">
          {{ '@' + info[0].gsx$instagram.$t }}
        </a>

        <a
          target="_blank"
          v-if="info[0].gsx$facebook !== undefined && !!info[0].gsx$facebook.$t"
          :href="'https://www.facebook.com/' + info[0].gsx$facebook.$t"
        >
          {{ '@' + info[0].gsx$facebook.$t.split('/')[3] }}
        </a>
      </p>
    </template>

    <template v-slot:default>
      <div class="accordion" role="tablist" v-if="questions != null">
        <b-card no-body class="mb-1" v-for="(question, index) in questions" v-bind:key="index">
          <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button block v-b-toggle="'accordion-' + index.toString()" class="font-weight-bold question" variant="info"
              >{{ translatedQuestion(question, $i18n.locale) }}
            </b-button>
          </b-card-header>
          <b-collapse :id="'accordion-' + index.toString()" accordion="my-accordion" role="tabpanel">
            <b-card-body>
              <b-card-text>{{ translatedAnswer(question, $i18n.locale) }}</b-card-text>
            </b-card-body>
          </b-collapse>
        </b-card>
      </div>
    </template>
    <template v-slot:modal-footer>
      <b-button @click="$bvModal.hide('faq')" right>{{ $t('label.close') }}</b-button>
    </template>
  </b-modal>
</template>

<script>
import { districtData } from '../themes/MealsForFamilies/districtData'

document.documentElement.style.setProperty('--primary-color', districtData.colors.primaryColor)
document.documentElement.style.setProperty('--banner-light', districtData.colors.bannerColor)
document.documentElement.style.setProperty('--banner-dark', districtData.colors.bannerColorDark)
document.documentElement.style.setProperty('--nav-link-light', districtData.colors.navLink)
document.documentElement.style.setProperty('--nav-link-dark', districtData.colors.navLinkDark)

export default {
  name: 'faq-modal',
  props: {
    questions: Array,
    info: Array
  },
  methods: {
    getDomain: function (url) {
      var urlParts = url.replace('http://', '').replace('https://', '').replace('www.', '')
      return urlParts
    },
    translatedQuestion: function (question, locale) {
      if (question['gsx$' + locale + 'question'] !== undefined && question['gsx$' + locale + 'question'].$t != '') {
        return question['gsx$' + locale + 'question'].$t
      } else return question.gsx$enquestion.$t
    },
    translatedAnswer: function (question, locale) {
      if (question['gsx$' + locale + 'answer'] !== undefined && question['gsx$' + locale + 'answer'].$t != '') {
        return question['gsx$' + locale + 'answer'].$t
      } else return question.gsx$enanswer.$t
    }
  }
}
</script>

<style lang="scss">
.root {
  --primary-color: blue;
  --banner-light: '#E9ECEF';
  --banner-dark: '#212529';
  --nav-link-light: '#F8F8F8';
  --nav-link-dark: '#F8F8F8';
}

@media (max-width: 991px) {
  #faq > .modal-dialog {
    justify-content: normal;
    max-width: 100%;

    & > .modal-content {
      min-height: 100vh;
      height: 100vh;
    }
  }
}

.question {
  outline-style: solid;
  outline-color: #dcdcdc;
  @media (prefers-color-scheme: dark) {
    color: $gray-100 !important;
  }
}

.question:hover {
  background-color: var(--banner-light);
  outline-style: solid;
  outline-color: black;
  @media (prefers-color-scheme: dark) {
    background-color: var(--banner-dark);
  }
}

.btn-block {
  color: #313639 !important;
  @media (prefers-color-scheme: dark) {
    color: #f8f8f8 !important;
  }
}

.btn-block:hover {
  color: var(--nav-link-light) !important;
  @media (prefers-color-scheme: dark) {
    color: var(--nav-link-dark) !important;
  }
}

.question[aria-expanded='false'] {
  &::after {
    font-family: 'Font Awesome 5 Free';
    font-weight: 900;
    content: '\f067';
    margin-left: 15px;
  }
}
.question[aria-expanded='true'] {
  &:after {
    font-family: 'Font Awesome 5 Free';
    font-weight: 900;
    content: '\f068';
    margin-left: 15px;
  }
}
</style>
