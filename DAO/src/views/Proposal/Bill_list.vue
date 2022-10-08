<template>
  <div class="fullscreen bg-gray">
    <header class="me">
      <white :title="title" :name="name"></white>
    </header>
    <main class="box">
      <div>
        <div
          class="one_an"
          @click="detail(item.proposalId, item.state, IDList)"
          v-for="(item, index) in List"
          :key="index"
        >
          <div>{{ item.title }}</div>
          <div class="piao">
            <span>{{ item.total }}票</span>
            <span v-if="item.state == 0">
              <div class="ion"></div>
              进行中
            </span>
            <span v-if="item.state == 1">
              <div class="ion two"></div>
              未通过
            </span>
            <span v-if="item.state == 2">
              <div class="ion three"></div>
              已通过
            </span>
            <span v-if="item.state == 3">
              <div class="ion fhire"></div>
              已终止
            </span>
          </div>
        </div>
        <van-empty
          v-show="!List.length"
          class="custom-image"
          :image="require('../../assets/img/empty.png')"
          description="暂无任何数据"
        />
      </div>
    </main>
    <footer v-if="isProponent != 0">
      <van-button icon="plus" block type="info" @click="createAn"
        >创建提案</van-button
      >
    </footer>
  </div>
</template>

<script>
import white from "@/components/Nav/white.vue";
import { getmyprops } from "@/api/Proposal";
import { getproposallist } from "@/api/viewsApi/home";
export default {
  components: { white },
  name: "home",
  data() {
    return {
      title: "我的提案",
      name: "personage",
      List: [],
      IDList: [],
      isProponent: this.$route.query.isProponent || 1,
    };
  },
  mounted() {
    this.isProponent == 0 ? (this.title = "提案") : (this.title = "我的提案");
    // 判断是否从home页面跳过来
    if (this.$route.query.home) {
      this.name = "home";
    }
  },
  created() {
    const loading = this.$toast.loading({
      forbidClick: true,
      message: "加载中…",
    });
    if (this.isProponent != 0) {
      getmyprops()
        .then((res) => {
          const { code, items } = res.data;
          if (code) {
            this.$toast.fail({
              forbidClick: true,
              message: "加载失败！",
            });
          } else {
            this.List = items.map((item) => {
              item.total =
                Number(localStorage.getItem(`favorVotes+${item.proposalId}`)) +
                Number(localStorage.getItem(`opposeVotes+${item.proposalId}`)) +
                Number(
                  localStorage.getItem(`InitialpeopleNum+${item.proposalId}`)
                );
              return item;
            });
          }
        })
        .catch(() => {
          this.$toast.fail({
            forbidClick: true,
            message: "加载失败！",
          });
        })
        .finally(() => {
          loading.clear();
        });
    } else {
      getproposallist({ page: 1, itemsPerPage: 10 })
        .then((res) => {
          const { code, items } = res.data;
          if (code) {
            this.$toast.fail({
              forbidClick: true,
              message: "加载失败！",
            });
          } else {
            this.List = items.map((item) => {
              item.total =
                Number(localStorage.getItem(`favorVotes+${item.proposalId}`)) +
                Number(localStorage.getItem(`opposeVotes+${item.proposalId}`)) +
                Number(
                  localStorage.getItem(`InitialpeopleNum+${item.proposalId}`)
                );
              return item;
            });
          }
        })
        .catch(() => {
          this.$toast.fail({
            forbidClick: true,
            message: "加载失败！",
          });
        })
        .finally(() => {
          loading.clear();
        });
    }
  },
  methods: {
    createAn() {
      this.$router.push("/Create");
    },
    detail(id, state) {
      this.$router.push({
        path: "/detail",
        query: { proposalId: id, state: state },
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.box {
  background: #fff;
  height: 100vh;
  overflow: auto;
  border-radius: 8px;
  margin-top: 20px;
}
footer {
  height: 170px;
  background-color: #fff;
  width: 100%;
  position: fixed;
  bottom: 0;
}
.one_an {
  color: #000;
  margin: 30px;
  border-bottom: 1px solid #eeeeee;
  line-height: 60px;
  font-size: 30px;
  .piao {
    display: flex;
    color: #9296a2;
    font-size: 16px;
    justify-content: space-between;
    .ion {
      display: inline-block;
      width: 15px;
      height: 15px;
      border-radius: 50%;
      background: #237ff8;
    }
    .two {
      background: #fc7542;
    }
    .three {
      background: #00b87a;
    }
    .fhire {
      background: #999999;
    }
  }
}
.custom-image {
  margin-top: 10%;
}
.van-button {
  width: 352px;
  position: absolute;
  bottom: 16px;
  right: 0;
  left: 0;
  margin: 0 auto;
  border-radius: 160px;
}
</style>

