<template>
    <div class="blue-gradinet ex-header">
        <div class="width-limiter">
            <b-container fluid>
                <b-row>
                    <b-col md="3" class="header-left">
                        <router-link to="/" class="d-none d-md-block">
                            <img src="../../styles/img/symbol_logo_white_aw.png" class="header-logo"/>
                        </router-link>
                    </b-col>
                    <b-col md="6" class="header-center">

                        <div class="header-title">
                            {{getNameByKey('blockchainExplorerTitle')}}
                        </div>
                        <div class="header-sub-title">
                            {{getNameByKey('searchBoxTitle')}}
                        </div>

                    </b-col>
                    <b-col md="3" class="header-right">
                        <SearchBox class='search-box' />
                        <LanguageSelector class="d-none d-md-block language-selector"/>
                    </b-col>
                </b-row>
            </b-container>
        </div>
    </div>
</template>

<script>
import SearchBox from '@/components/controls/SearchBox.vue'
import LanguageSelector from '@/components/controls/LanguageSelector.vue'

export default {
  components: {
    SearchBox,
    LanguageSelector
  },

  methods: {
    getNameByKey(e) {
      return this.$store.getters['ui/getNameByKey'](e)
    }
  }
}
</script>

<style lang="scss" scoped>
.blue-gradinet {
    background: linear-gradient(120deg, var(--primary) 0%, var(--secondary) 100%);
    background-size: 100% auto;
    position: relative;
}

.blue-gradinet::before {
    content: '';
    background-image: url(../../styles/img/logo_bkg.png);
    position: absolute;
    z-index: 0;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-size: 100%;
}

.width-limiter {
    display: block;
    width: 100%;
    max-width: $header-max-width;
    margin-left: auto;
    margin-right: auto;
}

@media (max-width: 764px) {
    .ex-header {
        padding: 5px 0;
        padding-top: 15px;
    }
}

@media (min-width: 764px) {
    .ex-header {
        padding: 10px 40px;
    }
}

.ex-header {
    .header-left {
        display: flex;
        align-items: center;
        min-height: 30px;

        .header-logo {
            width: 100%;
            max-width: 200px;
        }
    }

    .header-center {
        text-align: center;
        margin: 5px 0;

        .header-title {
            color: #fff;
            font-weight: 500;
            text-transform: capitalize;
            font-size: 18px;
            margin-top: 14px;
            margin-bottom: 0.5rem;
            letter-spacing: 1px;
        }

        .header-sub-title {
            color: #e4e4e4;
            font-size: 12px;
            margin-bottom: 15px;
        }
    }

    .header-right {
        justify-content: space-around;
        align-items: flex-end;
        display: flex;
        flex-direction: column;
        margin: 5px 0;
    }
}
</style>
