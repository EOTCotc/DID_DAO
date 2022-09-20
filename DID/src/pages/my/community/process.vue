<template>
  <div class="community_wrap fullscreen bg-gray">
    <page-header title="申请创建社区" />
    <div class="process_wrap">
      <div class="content">
        <div class="title">审批进程</div>
        <van-steps direction="vertical" active-color="#227AEE" :active="3">
          <van-step v-for="item in step" :key="item.id">
            <template slot="active-icon">
              <van-icon v-if="!!item.status" name="checked" color="#227AEE" />
              <van-icon v-else name="clear" color="#227AEE" />
            </template>
            <template slot="inactive-icon">
              <van-icon v-if="!!item.status" name="checked" color="#227AEE" />
              <van-icon v-else name="clear" color="#227AEE" />
            </template>
            <van-row class="main">
              <van-col :span="!!item.date ? 12 : 24" class="title">{{item.title}}</van-col>
              <van-col v-if="!!item.date" :span="12" class="date">{{item.date}}</van-col>
              <van-col :span="24" class="reason_wrap" v-if="!!item.reason">
                <div class="title">驳回原因如下：</div>
                <div class="message">{{item.reason}}</div>
              </van-col>
            </van-row>
          </van-step>
        </van-steps>
      </div>
      <van-button
        class="btn"
        round
        block
        color="#237FF8"
        type="primary"
        @click="$router.replace('/communityCreate')"
      >
        重新提交申请
      </van-button>
    </div>
  </div>
</template>

<script>
import PageHeader from "@/components/topBar/pageHeader.vue"

export default {
  name: "communityProcess",
  components: {
    PageHeader
  },
  data() {
    return {
      step: [
        {id: 1,status: 1, title: '初审:测试', date: '2020-02-02 11:50:12'},
        {id: 2,status: 1, title: '初审:测试', date: '2020-02-02 11:50:12'},
        {id: 3,status: 0, title: '初审:测试', date: '2020-02-02 11:50:12'},
        {id: 4,status: 0, title: '很抱歉，您的创建社区申请本次申请被驳回', reason: "当前无法联系申请人，请填写准确可及时联系的手机号码"}
      ],
    }
  }
}
</script>

<style lang="scss" scoped>
.process_wrap {
  flex: 1;
  padding: 30px;
  margin-top: 20px;
  background-color: #FFF;
  .content {
    min-height: 100%;
    padding-bottom: 44PX;
    &>.title {
      color: #333;
      font-size: 32px;
    }
    .date {
      color: #999;
      font-size: 28px;
      text-align: right;
    }
    .reason_wrap {
      font-size: 32px;
      .title {
        color: #333;
        margin: 20px 0;
      }
      .message {
        color: #FF6343;
        line-height: 1.4;
      }
    }
  }
  .btn {
    margin-top: -44PX;
  }
}
</style>