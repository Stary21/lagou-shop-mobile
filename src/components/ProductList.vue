<template>
  <van-grid
    :center="false"
    :gutter="15"
    class="product-list"
    :column-num="2"
  >
    <van-grid-item
      :to="{
        name: 'product',
        params: {
          productId: item.id
        }
      }"
      v-for="item in productsData.productsData"
      :key="item.id"
    >
      <van-image
        height="165"
        :src="item.image"
      />
      <p class="title">
        {{ item.store_name }}
      </p>
      <p class="price">
        ￥{{ item.price }}
      </p>
      <p class="sales">
        已售{{ item.sales }}件
      </p>
    </van-grid-item>
  </van-grid>
</template>
<script setup>
const productsData = defineProps({
  productsData: {
    type: Array,
    required: true
  }
})
</script>

<style lang="scss" scoped>
.product-list {
  margin: 10px 0;
}

:deep(.van-grid-item__content) {
  border-radius: 10px;
  overflow: hidden;
  padding: 0;
  margin-bottom: 10px;

  .title {
    font-size: 14px;
    padding: 5px 8px 0;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .price {
    color: #ee3e3e;
    font-size: 22px;
    font-weight: 700;
    padding-left: 6px;
  }

  .sales {
    color: #ccc;
    font-size: 14px;
    padding-left: 8px;
  }
}
</style>
