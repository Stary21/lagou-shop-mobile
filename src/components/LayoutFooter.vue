<template>
  <van-tabbar route>
    <van-tabbar-item
      replace
      to="/"
      icon="home-o"
    >
      首页
    </van-tabbar-item>
    <van-tabbar-item
      replace
      to="/category"
      icon="apps-o"
    >
      分类
    </van-tabbar-item>
    <van-tabbar-item
      replace
      to="/recommend"
      icon="gift-o"
    >
      推荐
    </van-tabbar-item>
    <van-tabbar-item
      replace
      to="/cart"
      icon="cart-o"
    >
      购物车
    </van-tabbar-item>
    <van-tabbar-item
      replace
      to="/user"
      icon="user-o"
    >
      我的
    </van-tabbar-item>
  </van-tabbar>
</template>
<script setup></script>
<style lang="scss" scoped>
.van-tabbar {
  position: fixed !important;
}
</style>
