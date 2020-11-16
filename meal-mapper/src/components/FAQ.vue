<template>
  <b-modal id="faq" size="lg" dialog-class="m-0 m-md-auto" centered scrollable hide-header-close>
    <template v-slot:modal-title>
      {{ $t('faq.title') }}
    </template>
    <template v-slot:default>
      <div class="accordion" role="tablist">
        <b-card no-body class="mb-1">
          <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button block v-b-toggle.accordion-1 class="font-weight-bold question" variant="info">{{
              $t('faq.whatWeDoQuestion')
            }}</b-button>
          </b-card-header>
          <b-collapse id="accordion-1" accordion="my-accordion" role="tabpanel">
            <b-card-body>
              <b-card-text>{{ $t('faq.whatWeDoAnswer') }}</b-card-text>
            </b-card-body>
          </b-collapse>
        </b-card>
        <b-card no-body class="mb-1">
          <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button block v-b-toggle.accordion-2 class="font-weight-bold question" variant="info"
              >{{ $t('faq.freeMealsQuestion') }}
            </b-button>
          </b-card-header>
          <b-collapse id="accordion-2" accordion="my-accordion" role="tabpanel">
            <b-card-body>
              <b-card-text>
                <p>
                  {{ $t('faq.freeMealsAnswer') }}
                  <strong>{{ $t('faq.staySafeReminder') }}</strong>
                </p>
              </b-card-text>
            </b-card-body>
          </b-collapse>
        </b-card>
        <b-card no-body class="mb-1">
          <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button block v-b-toggle.accordion-3 class="font-weight-bold question" variant="info">{{ $t('faq.helpQuestion') }}</b-button>
          </b-card-header>
          <b-collapse id="accordion-3" accordion="my-accordion" role="tabpanel">
            <b-card-body>
              <b-card-text>
                <p>
                  {{ $t('faq.helpAnswer-start') }}
                  <a href="https://portal.icheckgateway.com/publicschoolfoundation/AnnualAppeal.aspx">
                    {{ $t('faq.helpAnswer-organization') }}
                  </a>
                  {{ $t('faq.helpAnswer-end') }}
                </p>
              </b-card-text>
            </b-card-body>
          </b-collapse>
        </b-card>
        <b-card no-body class="mb-1">
          <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button block v-b-toggle.accordion-4 class="font-weight-bold question" variant="info">{{ $t('faq.whoQuestion') }}</b-button>
          </b-card-header>
          <b-collapse id="accordion-4" accordion="my-accordion" role="tabpanel">
            <b-card-body>
              <b-card-text>{{ $t('faq.whoAnswer') }}</b-card-text>
            </b-card-body>
          </b-collapse>
        </b-card>
        <b-card no-body class="mb-1">
          <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button block v-b-toggle.accordion-5 class="font-weight-bold question" variant="info">{{
              $t('faq.registerQuestion')
            }}</b-button>
          </b-card-header>
          <b-collapse id="accordion-5" accordion="my-accordion" role="tabpanel">
            <b-card-body>
              <b-card-text>{{ $t('faq.registerAnswer') }}</b-card-text>
            </b-card-body>
          </b-collapse>
        </b-card>
        <b-card no-body class="mb-1">
          <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button block v-b-toggle.accordion-6 class="font-weight-bold question" variant="info">{{
              $t('faq.typeoffoodQuestion')
            }}</b-button>
          </b-card-header>
          <b-collapse id="accordion-6" accordion="my-accordion" role="tabpanel">
            <b-card-body>
              <b-card-text>{{ $t('faq.typeoffoodAnswer') }}</b-card-text>
            </b-card-body>
          </b-collapse>
        </b-card>
        <b-card no-body class="mb-1">
          <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button block v-b-toggle.accordion-7 class="font-weight-bold question" variant="info">{{
              $t('faq.preparedmealsQuestion')
            }}</b-button>
          </b-card-header>
          <b-collapse id="accordion-7" accordion="my-accordion" role="tabpanel">
            <b-card-body>
              <b-card-text>{{ $t('faq.preparedmealsAnswer') }}</b-card-text>
            </b-card-body>
          </b-collapse>
        </b-card>
        <b-card no-body class="mb-1">
          <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button block v-b-toggle.accordion-8 class="font-weight-bold question" variant="info">{{
              $t('faq.adultavaliabilityQuestion')
            }}</b-button>
          </b-card-header>
          <b-collapse id="accordion-8" accordion="my-accordion" role="tabpanel">
            <b-card-body>
              <b-card-text>{{ $t('faq.adultavaliabilityAnswer') }}</b-card-text>
            </b-card-body>
          </b-collapse>
        </b-card>
        <b-card no-body class="mb-1">
          <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button block v-b-toggle.accordion-9 class="font-weight-bold question" variant="info">{{
              $t('faq.childrenpresentQuestion')
            }}</b-button>
          </b-card-header>
          <b-collapse id="accordion-9" accordion="my-accordion" role="tabpanel">
            <b-card-body>
              <b-card-text>{{ $t('faq.childrenpresentAnswer') }}</b-card-text>
            </b-card-body>
          </b-collapse>
        </b-card>
        <b-card no-body class="mb-1">
          <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button block v-b-toggle.accordion-10 class="font-weight-bold question" variant="info">{{ $t('faq.idQuestion') }}</b-button>
          </b-card-header>
          <b-collapse id="accordion-10" accordion="my-accordion" role="tabpanel">
            <b-card-body>
              <b-card-text>{{ $t('faq.idAnswer') }}</b-card-text>
            </b-card-body>
          </b-collapse>
        </b-card>
        <b-card no-body class="mb-1">
          <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button block v-b-toggle.accordion-11 class="font-weight-bold question" variant="info">{{
              $t('faq.numberofmealsQuestion')
            }}</b-button>
          </b-card-header>
          <b-collapse id="accordion-11" accordion="my-accordion" role="tabpanel">
            <b-card-body>
              <b-card-text>{{ $t('faq.numberofmealsAnswer') }}</b-card-text>
            </b-card-body>
          </b-collapse>
        </b-card>
        <b-card no-body class="mb-1">
          <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button block v-b-toggle.accordion-12 class="font-weight-bold question" variant="info">{{
              $t('faq.packagingQuestion')
            }}</b-button>
          </b-card-header>
          <b-collapse id="accordion-12" accordion="my-accordion" role="tabpanel">
            <b-card-body>
              <b-card-text>{{ $t('faq.packagingAnswer') }}</b-card-text>
            </b-card-body>
          </b-collapse>
        </b-card>
        <b-card no-body class="mb-1">
          <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button block v-b-toggle.accordion-13 class="font-weight-bold question" variant="info">{{
              $t('faq.vegetarianQuestion')
            }}</b-button>
          </b-card-header>
          <b-collapse id="accordion-13" accordion="my-accordion" role="tabpanel">
            <b-card-body>
              <b-card-text>{{ $t('faq.vegetarianAnswer') }}</b-card-text>
            </b-card-body>
          </b-collapse>
        </b-card>
        <b-card no-body class="mb-1">
          <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button block v-b-toggle.accordion-14 class="font-weight-bold question" variant="info">{{
              $t('faq.babyfoodQuestion')
            }}</b-button>
          </b-card-header>
          <b-collapse id="accordion-14" accordion="my-accordion" role="tabpanel">
            <b-card-body>
              <b-card-text>{{ $t('faq.babyfoodAnswer') }}</b-card-text>
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
console.log('FAQ ran')

export default {
  name: 'faq-modal'
}
</script>

<style lang="scss">
.root {
  --primary-color: red;
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
  background-color: var(--primary-color);
  outline-style: solid;
  outline-color: black;
  // @media (prefers-color-scheme: dark) {
  //   background-color: theme-color-level('primary', 5);
  // }
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
