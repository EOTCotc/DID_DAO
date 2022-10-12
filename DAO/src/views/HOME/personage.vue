<template>
  <div class='personage'>
    <header>
      <TopBar />
    </header>
    <main>
      <div class='identity-card'>
        <div class='card-top'>
          <div class='card-top-left'>
            <img src='@/assets/img/logo_two.png' />
            <div>
              <div>{{ user.mail }}</div>
              <div>UID:{{ user.uid }}</div>
            </div>
          </div>
        </div>
        <div class="eotc">
          <div class="sum">{{ $t("user.total") }}</div>
          <div class="ming">
            <span style="font-size: 28px">{{ user.daoEOTC }}</span><span @click="detail">{{ $t("user.detailed") }}</span>
          </div>
        </div>
      </div>

      <div class="Onlineswitch"
           v-if="isArbitrate == 1 && isExamine == 1">
        <div class="div1">
          <div class="div2">
            <div class="parent">
              <span>{{ $t("user.parent") }}</span>
              <van-popover v-model="showPopover"
                           :get-container="getContainer"
                           trigger="click"
                           :actions="actions"
                           @click="showPopover = !showPopover">
                <template #reference>
                  <van-image width="19"
                             height="19"
                             :src="require('./assets/image/sw.png')" />
                </template>
              </van-popover>
            </div>

            <van-switch :value="checked"
                        size="23px"
                        inactive-color="#484848"
                        @input="onInput" />
          </div>
        </div>
      </div>
      <List></List>
    </main>
    <footer></footer>
  </div>
</template>
<script>
import TopBar from '@/components/topBar/topBar'
import List from '../../components/Nav/List.vue'
import { setDaoenable } from '@/api/earnings'
export default {
  components: {
    TopBar,
    List,
  },
  data() {
    return {
      checked: localStorage.getItem('isEnable') == 0 ? false : true,
      total: 0,
      isArbitrate: +localStorage.getItem('isArbitrate'),
      isExamine: +localStorage.getItem('isExamine'),
      showPopover: false,
      actions: [
        {
          text: this.$t('user.text'),
        },
      ],
      user: JSON.parse(localStorage.getItem('user')),
    }
  },
  methods: {
    // 去往详情页
    detail() {
      this.$router.push('/Home_detail')
    },
    getContainer() {
      return document.querySelector('.parent')
    },
    //是否启用Dao审核仲裁权限
    onInput(checked) {
      this.checked = checked
      let enable = undefined
      if (this.checked == false) {
        enable = 0
      } else {
        enable = 1
      }
      localStorage.setItem('isEnable', enable)
      setDaoenable({ isEnable: enable }).then((res) => {
        console.log(res)
      })
    },
  },
}
</script>
<style lang='scss' scoped>
.personage {
  padding-top: 88px;
  width: 100%;
  background: #000;
  min-height: 100vh;
  color: #000;
}

.parent ::v-deep .van-popover__action {
<<<<<<< HEAD
   font-size: 16px;
   width: 345px !important;
   margin: 10px 0;
}
.parent ::v-deep .van-popup {
  width: 345px !important;
   border-radius: 8px;
   position: absolute !important;
   top: 65px !important;
   left: 15px !important;
}
.parent ::v-deep .van-popover__arrow {
  left: 13%;
=======
  font-size: 16px;
  width: 345px !important;
  margin: 10px 0;
}
.parent ::v-deep .van-popup {
  width: 345px !important;
  border-radius: 8px;
  position: absolute !important;
  top: 65px !important;
  left: 15px !important;
}
.parent ::v-deep .van-popover__arrow {
  left: 13% ;
>>>>>>> 5aba572617d9eb2a09530d8dba8d4b5cbd4b5725
}
.Onlineswitch {
  padding: 0 25px 0 30px;
  border-radius: 15px;
  z-index: -99;
  margin-top: -70px;
  margin-bottom: 30px;

  .div1 {
    height: 160px;
    border-radius: 15px;
    background-color: #25282b;
    position: relative;

    .div2 {
      div {
        display: flex;
        align-items: center;

        span {
          display: inline-block;
          margin-right: 13px;
        }

        .van-image__img {
          margin-top: -5px;
        }
      }

      position: absolute;
      bottom: 0;
      left: 0;
      padding: 0 20px;
      height: 120px;
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 30px;
      color: #fff;
    }
  }
}

.identity-card {
  position: relative;
  z-index: 99;
  padding: 20px;
  border-radius: 20px;
  margin: 40px 25px 30px 30px;
  background: linear-gradient(134deg, #2a86ff 0%, #54dcff 100%);

  .card-top {
    margin-bottom: 15px;
    display: flex;
    justify-content: space-between;

    .card-top-left {
      display: flex;
      justify-content: flex-start;
      align-items: center;

      img {
        width: 96px;
        height: 96px;
      }

      div {
        margin-left: 30px;
        color: #fff;

        div {
          margin-left: 0;
        }

        div:first-of-type {
          font-size: 36px;
        }

        div:last-of-type {
          margin-top: 8px;
          font-size: 28px;
        }
      }
    }
  }

  .eotc {
    color: #fff;
    margin-top: 10px;
    font-size: 30px;
    line-height: 48px;

    .sum {
      color: #9acdff;
      font-size: 26px;
    }

    .ming {
      margin-top: 20px;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>