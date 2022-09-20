<template>
  <van-pull-refresh v-model="loading" @refresh="onRefresh">
    <div class="community_wrap">
      <van-nav-bar
        class="nav-bar"
        title="我的社区"
        left-arrow
        @click-left="$router.go(-1)"
      />
      <div class="title">粒紫社区</div>
    </div>
  </van-pull-refresh>
</template>