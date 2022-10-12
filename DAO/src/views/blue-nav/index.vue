
<template>
  <div class="meun">
    <white :title="title"></white>
    <div class="content">
      <van-form @submit="submit" @failed="onfailed" id="submit">
        <div>
          <van-cell
            :value="titleList[0]"
            class="feedbackTitle"
            :border="false"
          />
          <div
            v-for="(item, index) of feedbackTypeList"
            :key="index"
            class="feedbackTypeItem"
            @click="feedbackTypeChange(index)"
            :class="active == index ? 'active' : 'noActive'"
          >
            {{ item.title }}
          </div>
        </div>
        <div>
          <van-cell
            :value="titleList[1]"
            name="feedbackText"
            class="feedbackTitle"
            :border="false"
          />
          <van-field
            v-model="feedbackText"
            class="feedbackText"
            rows="3"
            autosize
            type="textarea"
            maxlength="300"
            :placeholder="$t('feedback.placeholder')"
            show-word-limit
          />
        </div>
        <div>
          <van-cell class="feedbackTitle" :border="false">
            <template #title>
              <span class="custom-title">{{ titleList[2] }}</span>
              <span class="custom-msg">{{ $t("feedback.custom_msg") }}</span>
            </template>
          </van-cell>
          <van-uploader
            multiple
            :max-count="3"
            v-model="fileList"
            :after-read="afterRead"
            :max-size="500 * 1024"
          />
        </div>
        <div>
          <van-cell
            :value="titleList[3]"
            class="feedbackTitle"
            :border="false"
          />
          <van-field
            v-model="phone"
            name="phone"
            :placeholder="$t('feedback.placeholder_phone')"
            @focus="focusFun()"
            @blur="show = false"
            class="phone"
            :rules="
              phone != ''
                ? [
                    {
                      pattern:
                        /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/,
                      message: this.$t('feedback.phone_message'),
                    },
                  ]
                : [
                    {
                      pattern:
                        /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/,
                      message: '',
                    },
                  ]
            "
          />
        </div>

        <div v-show="show" class="heightDiv"></div>

        <div class="bottom">
          <van-button
            class="bottomBtn"
            round
            block
            native-type="submit"
            :disabled="btnSwitch"
            >{{ $t("feedback.submit") }}</van-button
          >
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import White from "@/components/Nav/white.vue";
import { Toast } from "vant";
import { addworkorder, uploadimage } from "@/api/workOrder";
export default {
  name: "blue-nav",
  components: {
    White,
  },

  data() {
    return {
      title: this.$t("feedback.nav_title"),
      //分类标签选中的下标
      active: 0,
      titleList: [
        this.$t("feedback.type"),
        this.$t("feedback.describe"),
        this.$t("feedback.add_photo"),
        this.$t("feedback.relation"),
      ],
      feedbackText: "",
      phone: "",
      image: [],
      show: false,
      fileList: [],
      //按钮禁用开关
      btnSwitch: true,
      phonePattern:
        /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/,
      feedbackTypeList: [
        {
          title: this.$t("feedback.type_feed"),
          index: 0,
        },
        {
          title: this.$t("feedback.type_function"),
          index: 1,
        },
      ],
    };
  },
  watch: {
    phone: function (val) {
      var el = val.trim();
      if (el.length == 11) {
        this.btnSwitch = false;
      } else {
        this.btnSwitch = true;
      }
    },
  },
  created() {},
  methods: {
    onfailed(errorInfo) {
      console.log("failed", errorInfo);
    },
    afterRead(fileObj) {
      // 声明form表单数据
      const formData = new FormData();
      // 添加文件信息
      formData.append("file", fileObj.file);
      uploadimage(formData).then((res) => {
        console.log(res);
        this.image.push(res.data.message);
      });
      console.log(this.image);
    },

    phoneValidator(val) {
      return /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(
        val
      );
    },

    onOversize(file) {
      console.log(file);
      Toast(this.$t("feedback.file_text"));
    },
    feedbackTypeChange(index) {
      this.active = index;
    },
    focusFun() {
      this.show = true;
    },
    submit(val) {
      if (val.feedbackText != "" && val.phone != "") {
        this.btnSwitch = true;
        addworkorder({
          workOrderType: this.active,
          describe: this.feedbackText,
          images: this.image.join(","),
          phone: this.phone,
        }).then((res) => {
          if (res.data.code == 0) {
            this.$router.push({ name: "personage" });
            Toast(this.$t("feedback.submit_text"));
          }
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.meun {
  background: #f3f4f5;
}
.content {
  background: #fff;
  margin-top: 20px;
}
.feedbackTitle {
  font-size: 30px;
  color: #333333;
  font-weight: 700;
  margin: 10px 0;
}

.feedbackTypeItem {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 150px;
  line-height: 50px;
  font-size: 14px;
  box-sizing: border-box;
  background-color: #f3f4f5;
  border-radius: 10px;
  border: 1px solid #fff;
  margin: 10px 0;
}

.feedbackTypeItem.active {
  background: #fff;
  color: #247ff7;
  border: 1px solid #247ff7;
}

.feedbackTypeItem:not(:first-of-type) {
  margin-left: 30px;
}

.feedbackText {
  border: 1px solid #c8cfde;
  width: auto;
  margin: 0 32px;
}

.custom-msg {
  color: #999999;
  font-size: 20px;
}

.van-uploader {
  padding: 0 32px;
}

.phone {
  margin: 0 32px;
  border: 1px solid #c8cfde;
  width: auto;
  position: relative;
}

.bottom {
  position: fixed;
  bottom: 20px;
  margin: 32px;
  width: 90%;
}

.bottomBtn {
  background-color: #1b2945;
  color: #ffffff;
}

.heightDiv {
  position: absolute;
  top: 0px;
}

.active {
  border: 1px solid #247ff7;
}

.noActive {
  color: #999;
  border: 1px solid #f3f4f5;
}
</style>
