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
      </div>
    </template>
    <template v-slot:modal-footer>
      <b-button @click="$bvModal.hide('faq')" right>{{ $t('label.close') }}</b-button>
    </template>
  </b-modal>
</template>

<script>
export default {
  name: 'faq-modal'
}
</script>

<style lang="scss">
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
.question[aria-expanded='false'] {
  &::after {
    font-family: 'Font Awesome 5 Free';
    font-weight: 900;
    content: '\f067';
  }
}
.question[aria-expanded='true'] {
  &:after {
    font-family: 'Font Awesome 5 Free';
    font-weight: 900;
    content: '\f068';
  }
}
</style>
