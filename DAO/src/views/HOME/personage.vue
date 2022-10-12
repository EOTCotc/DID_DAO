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
        <div class='eotc'>
          <div class='sum'>总收益(EOTC)</div>
          <div class='ming'>
            <span style='font-size: 28px'>{{ user.daoEOTC }}</span><span @click='detail'>收益明细</span>
          </div>
        </div>
      </div>
      <div class='Onlineswitch'
           v-if='isArbitrate==1 && isExamine==1'>
        <div class='div1'>
          <div class='div2'>
            <div class='parent'><span>在线</span>
              <van-popover
                v-model='showPopover'
                :get-container='getContainer'
                :offset='[0,4]'
                :actions='actions'
                trigger='click'
                @click='showPopover = !showPopover'>
                <template #reference>
                  <van-image
                    width='19'
                    height='19'
                    :src="require('./assets/image/sw.png')" />
                </template>
              </van-popover>
            </div>
            <van-switch
              v-model='checked'
              size='23px'
              inactive-color='#484848 ' />
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

export default {
  components: {
    TopBar,
    List
  },
  data() {
    return {
      checked: true,
      total: 0,
      isArbitrate: +localStorage.getItem('isArbitrate'),
      isExamine: +localStorage.getItem('isExamine'),
      showPopover: false,
      actions: [
        {
          text: '在线开关，开启后审核及仲裁案将优先为您分配相应的处理事件/案件.'
        }
      ],
      user: JSON.parse(localStorage.getItem('user'))
    }
  },
  methods: {
    // 去往详情页
    detail() {
      this.$router.push('/Home_detail')
    },
    getContainer() {
      return document.querySelector('.parent')
    }
  }
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
  width: 345px !important;
  height: 80px;
  font-size: 16px;
  line-height: 28px;
}

.parent ::v-deep .van-popover {
  position: absolute !important;
  top: 65px !important;
  left: 15px !important;
}

.parent
::v-deep
.van-popover[data-popper-placement='bottom']
.van-popover__arrow {
  left: 13% !important;
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