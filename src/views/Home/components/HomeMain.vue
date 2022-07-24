<template>
  <van-pull-refresh
    class="home-main"
    v-model="state.refreshing"
    @refresh="onRefresh"
  >
    <!-- 轮播图 -->
    <van-swipe
      class="my-swipe"
      :autoplay="3000"
      indicator-color="white"
    >
      <van-swipe-item
        v-for="(img, index) in swipeData"
        :key="index"
      >
        <img
          :src="img.img"
          alt=""
        >
      </van-swipe-item>
    </van-swipe>

    <!-- 菜单 -->
    <van-grid
      column-num="4"
      icon-size="40"
    >
      <van-grid-item
        v-for="(item, index) in menusData"
        :key="index"
        :icon="item.img"
        :text="item.info[0].value"
      />
    </van-grid>

    <!-- 通知栏 -->
    <van-notice-bar
      left-icon="volume-o"
      :scrollable="false"
    >
      <span>热点资讯公告：</span>
      <van-swipe
        vertical
        class="notice-swipe"
        :autoplay="3000"
        :show-indicators="false"
      >
        <van-swipe-item
          v-for="(item, index) in newsData"
          :key="index"
        >
          {{ item.chiild[0].val }}
        </van-swipe-item>
      </van-swipe>
    </van-notice-bar>

    <!-- 商品 -->
    <van-list
      v-model:loading="state.loading"
      :finished="state.finished"
      finished-text="没有更多了"
      @load="initProductsData"
    >
      <product-list :products-data="state.productsData" />
    </van-list>
  </van-pull-refresh>
</template>
<script setup>

import ProductList from '@/components/ProductList.vue'
import { getProductsData } from '@/api/product.js'
import { getDefaultData } from '@/api/home.js'
import { computed, ref, reactive } from 'vue'

const indexData = ref({})
const initIndexData = async () => {
  const { data } = await getDefaultData()
  if (data.status !== 200) {
    return
  }
  indexData.value = data.data
  state.refreshing = false
}
const swipeData = computed(() => {
  return indexData.value.swiperBg?.default.imgList.list
})
const menusData = computed(() => {
  return indexData.value.menus?.default.imgList.list
})
const newsData = computed(() => {
  return indexData.value.news?.default.newList.list
})
initIndexData()
let page = 1
const limit = 4
const state = reactive({
  productsData: [],
  loading: false,
  finished: false,
  refreshing: false
})
const initProductsData = async () => {
  const { data } = await getProductsData({
    limit,
    page
  })
  if (data.status !== 200) {
    return
  }

  // 路径重置

  data.data.forEach(item => {
    if (!/lagounews/.test(item.image)) {
      item.image = item.image.replace('lagou', 'lagounews')
    }
  })

  state.productsData.push(...data.data)
  state.loading = false
  if (data.data.length < limit) {
    state.finished = true
    return
  }
  page++
}

const onRefresh = () => {
  indexData.value = {}
  state.productsData = []
  page = 1
  state.finished = false
  state.loading = false
  initIndexData()
  initProductsData()
}
</script>
<style lang="scss" scoped>
.home-main {
  .my-swipe img {
    width: 100%;
    height: 170px;
  }
}

:deep(.van-notice-bar__content) {
  display: flex;
  align-items: center;
}

.notice-swipe {
  height: 40px;
  line-height: 40px;
}
</style>
