<template>
  <div>
    <header>
      <white :title="title"></white>
    </header>
    <van-tabs v-model="activeName"
              sticky
              color="#237DF4">
      <van-tab title="待仲裁"
               name="a">
        <div class="body">
          <div class="content">
            <div class="aim">
              <div class="left">
                <van-icon name="aim" />
                <van-count-down :time="time"
                                format="DD 天 HH 时 mm 分" />
              </div>
              <div class="right">
                2022.05.26 12:54
              </div>
            </div>
            <div class="contactAvatar">
              <div class="headPortrait left">
                <div class="vanimage">
                  <van-image width="30"
                             round
                             height="30"
                             src="https://img01.yzcdn.cn/vant/cat.jpeg" />
                  <div><span>我</span>(卖家)</div>
                </div>
                <div class="litigation">原告</div>
              </div>
              <div class="headPortrait right">
                <div>
                  <van-image width="30"
                             round
                             height="30"
                             src="https://img01.yzcdn.cn/vant/cat.jpeg" />
                  <div><span>王晓雷</span>(买家)</div>
                </div>
                <div class="litigation">原告</div>
              </div>
            </div>
            <div>原告卖家发起仲裁，仲裁事件为账号冻结</div>
            <div class="btn">
              <van-button plain
                          type="info">申请延期</van-button>
              <van-button icon="description"
                          type="info">仲裁详情</van-button>
            </div>
          </div>
        </div>
      </van-tab>
      <van-tab title="已结案"
               name="b"
               style="color:#999999 ">已结案</van-tab>
    </van-tabs>

  </div>
</template>
<script>
import white from '@/components/Nav/white.vue'
export default {
  components: { white },
  data() {
    return {
      title: '仲裁案件',
      activeName: 'a',
      time: 30 * 60 * 60 * 1000,
    }
  },
}
</script>
<style lang="scss" scoped>
::v-deep .van-tab {
  font-size: 16px;
  font-weight: bold;
}
.body {
  background-color: #f3f4f5;
  height: 80%;
  border: 1px solid black;
  padding: 25px 18px;
  .content {
    border-radius: 25px;
    padding: 25px;
    background-color: #fff;
    .aim {
      display: flex;
      justify-content: space-between;
      .left {
        display: flex;
        justify-content: space-between;
        .van-icon {
          font-size: 16px;
          color: #237ff8;
          font-weight: bold;
        }
        .van-count-down {
          font-size: 16px;
          font-weight: bold;
          color: #237ff8;
          margin-left: 5px;
        }
      }
      .right {
        font-size: 14px;
        color: #999999;
      }
    }
  }
  .contactAvatar {
    .headPortrait {
      .vanimage {
        display: flex;
        align-items: center;
        div {
          font-size: 12px;
          color: #999999;
          span {
            font-size: 14px;
            color: #333333;
          }
        }
      }
      .litigation {
        border-radius: 0 12px 12px 12px;
        border: 1px solid black;
      }
    }
  }
}
</style>