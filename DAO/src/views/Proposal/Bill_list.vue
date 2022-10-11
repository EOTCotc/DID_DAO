<template>
  <div class="fullscreen bg-gray">
    <header class="me">
      <white :title="title" :name="name"></white>
    </header>
    <main class="box">
      <div>
        <div
          class="one_an"
          @click="detail(item.proposalId, item.state)"
          v-for="(item, index) in List"
          :key="index"
        >
          <div>{{ item.title }}</div>
          <div class="piao">
            <span>{{ item.total }}{{ $t("proposal.ticket") }}</span>
            <span v-if="item.state == 0">
              <div class="ion"></div>
              {{ $t("proposal.state_zoer") }}
            </span>
            <span v-if="item.state == 1">
              <div class="ion two"></div>
              {{ $t("proposal.state_one") }}
            </span>
            <span v-if="item.state == 2">
              <div class="ion three"></div>
              {{ $t("proposal.state_two") }}
            </span>
            <span v-if="item.state == 3">
              <div class="ion fhire"></div>
              {{ $t("proposal.state_three") }}
            </span>
          </div>
        </div>
        <van-empty
          v-show="!List.length"
          class="custom-image"
          :image="require('../../assets/img/empty.png')"
          :description="$t('proposal.description')"
        />
      </div>
    </main>
    <footer v-if="isProponent != 0">
      <van-button icon="plus" block type="info" @click="createAn">{{
        $t("proposal.create")
      }}</van-button>
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
      title: this.$t("proposal.nav_title"),
      name: "personage",
      List: [],
      isProponent: this.$route.query.isProponent || 1,
    };
  },
  mounted() {
    this.isProponent == 0
      ? (this.title = this.$t("proposal.nav_title_one"))
      : (this.title = this.$t("proposal.nav_title"));
    // 判断是否从home页面跳过来
    if (this.$route.query.home) {
      this.name = "home";
    }
  },
  created() {
    const loading = this.$toast.loading({
      forbidClick: true,
      message: this.$t("proposal.message"),
    });
    if (this.isProponent != 0) {
      getmyprops()
        .then((res) => {
          const { code, items } = res.data;
          if (code) {
            this.$toast.fail({
              forbidClick: true,
              message: this.$t("proposal.massage_fail"),
            });
          } else {
            this.List = items;
            // console.log(this.List, '1111')
          }
        })
        .catch(() => {
          this.$toast.fail({
            forbidClick: true,
            message: this.$t("proposal.massage_fail"),
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
              message: this.$t("proposal.massage_fail"),
            });
          } else {
            this.List = items;
          }
        })
        .catch(() => {
          this.$toast.fail({
            forbidClick: true,
            message: this.$t("proposal.massage_fail"),
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

