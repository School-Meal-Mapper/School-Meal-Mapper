<template>
  <div id="faqs">
    <h3>{{ $t('FAQs.buttonText') }}</h3>
    <p v-if="info != null">
      For more information, check out the following resources:
      <icon-list-item
        v-if="info[0].gsx$contactname !== undefined && !!info[0].gsx$contactname.$t"
        icon="fas fa-phone-alt"
        :title="info[0].gsx$contactname.$t"
        :link="'tel:' + info[0].gsx$contactphone.$t"
        target="_blank"
      />

      <icon-list-item
        v-if="info[0].gsx$weblink !== undefined && !!info[0].gsx$weblink.$t"
        icon="fas fa-globe"
        :title="getDomain(info[0].gsx$weblink.$t)"
        :link="info[0].gsx$weblink.$t"
        target="_blank"
      />

      <icon-list-item
        v-if="info[0].gsx$twitter !== undefined && !!info[0].gsx$twitter.$t"
        icon="fa fa-twitter"
        :title="'@' + info[0].gsx$twitter.$t"
        :link="'https://www.twitter.com/' + info[0].gsx$twitter.$t"
        target="_blank"
      />

      <icon-list-item
        v-if="info[0].gsx$instagram !== undefined && !!info[0].gsx$instagram.$t"
        icon="fa fa-instagram"
        :title="'@' + info[0].gsx$instagram.$t"
        :link="'https://www.instagram.com/' + info[0].gsx$instagram.$t"
        target="_blank"
      />


      <icon-list-item
        v-if="info[0].gsx$facebook !== undefined && !!info[0].gsx$facebook.$t"
        icon="fa fa-facebook-square"
        :title="'@' + info[0].gsx$facebook.$t.split('/')[3]"
        :link="info[0].gsx$facebook.$t"
        target="_blank"
      />
    </p>

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
  </div>
</template>

<script>
import { districtData } from '../themes/MealsForFamilies/districtData'
import IconListItem from './IconListItem.vue'

document.documentElement.style.setProperty('--primary-color', districtData.colors.primaryColor)
document.documentElement.style.setProperty('--banner-light', districtData.colors.bannerColor)
document.documentElement.style.setProperty('--banner-dark', districtData.colors.bannerColorDark)
document.documentElement.style.setProperty('--nav-link-light', districtData.colors.navLink)
document.documentElement.style.setProperty('--nav-link-dark', districtData.colors.navLinkDark)

export default {
  name: 'faq',
  components: {
    IconListItem
  },
  data() {
    return {
      questions: null,
      info: null
    }
  },
  async created() {
    console.log(districtData.data.faqUrl)
    console.log(districtData.data.providerinfoUrl)
    if (districtData.data.providerinfoUrl != null) {
      const res3 = await fetch(districtData.data.providerinfoUrl)
      const info = await res3.json()
      this.info = info.feed.entry
    }
    if (districtData.data.faqUrl != null) {
      const res2 = await fetch(districtData.data.faqUrl)
      const faqs = await res2.json()
      this.questions = faqs.feed.entry.slice(0, 20) // don't want a district to have more than 20
    }
  },
  methods: {
    getDomain: function (url) {
      var urlParts = url.replace('http://', '').replace('https://', '').replace('www.', '')
      return urlParts
    },
    translatedQuestion: function (question, locale) {
      if (question['gsx$' + locale + 'question'] !== undefined && question['gsx$' + locale + 'question'].$t !== '') {
        return question['gsx$' + locale + 'question'].$t
      } else return question.gsx$enquestion.$t
    },
    translatedAnswer: function (question, locale) {
      if (question['gsx$' + locale + 'answer'] !== undefined && question['gsx$' + locale + 'answer'].$t !== '') {
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
#faqs {
  padding: 100px 24px 24px;
  margin: 0 auto;
  text-align: center;
  max-height: 100vh;
  overflow-y: overlay;
}
</style>
