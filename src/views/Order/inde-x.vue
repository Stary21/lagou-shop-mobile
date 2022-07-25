<template>
  <div class="container">
    <van-nav-bar title="我的订单" left-arrow />


    <van-dropdown-menu>
      <van-dropdown-item v-model="value1" :options="option1" />
      <van-dropdown-item v-model="value2" :options="option2" />
    </van-dropdown-menu>
    <van-pull-refresh v-model="loading" @refresh="onRefresh">
      <p>刷新次数: {{ count }}</p>
      <van-cell-group @click="handleRouter(item.order_id)" v-if="hehe" :border="false" v-for="item in allList"
        :key="item.cartInfo[0].id">
        <van-swipe-cell>
          <van-cell :border="false" class="product">
            <img :src="item.cartInfo[0].productInfo.image" alt="">
            <div class="info">
              <p class="title">
                {{ item.cartInfo[0].productInfo.store_name }}</p>
              <p class="infoprice">
                ￥{{ item.cartInfo[0].truePrice }}
              </p>
            </div>
            <span class="count">x{{ item.cartInfo[0].cart_num }}</span>
          </van-cell>
          <van-cell :border="false" class="productOre">
            <span class="price">订单价格：</span>
            <span class="haha">{{ item.pay_price }}￥</span>
          </van-cell>
          <template #right>
            <van-button square type="danger" text="删除" />
          </template>
        </van-swipe-cell>
      </van-cell-group>
      <van-empty image-size="50vh" v-else description="没有这类订单" />
    </van-pull-refresh>
  </div>
</template>
<script setup>
import { getOrderList } from '@/api/order'
import { computed } from '@vue/reactivity';
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const router = useRouter()

// 订单列表
const allList = ref()
// v-if判断
const hehe = ref(true)
// 加载状态
const loading = ref(false)
// 刷新次数
const count = ref(0)

const route = useRoute()
const num = parseInt(route.query.typeId)
const value1 = ref(num)

const value2 = ref('a')
const option1 = [
  { text: '全部订单', value: 5 },
  { text: '待付款', value: 0 },
  { text: '待发货', value: 1 },
  { text: '待收货', value: 2 },
  { text: '待评价', value: 3 },
  { text: '已完成', value: 4 },
]
const option2 = [
  { text: '默认排序', value: 'a' },
  { text: '好评排序', value: 'b' },
  { text: '销量排序', value: 'c' },
]




const initOrderList = async () => {
  const { data } = await getOrderList()
  if (data.status !== 200) { return }
  // 判断类型是否是全部订单
  if (value1.value && value1.value !== 5) {
    //   ○ _type：订单类型，0 - 待付款，1 - 待发货，2 - 待收货，3 - 待评价，4 - 已完成
    // 根据状态返回新的数组
    allList.value = data.data.filter(item => item._status._type === value1.value)
    // 判断返回数组是否有值
    if (allList.value.length === 0) {
      hehe.value = false
    }
    loading.value = false
    count.value++
    return allList.value
  }
  allList.value = data.data

  hehe.value = true
  console.log(data.data)
  loading.value = false
  count.value++
}
initOrderList()



watch(value1, (newvalue, oldvalue) => {
  console.log(`值变了${oldvalue}-${newvalue}`

  )
  initOrderList()

})
const onRefresh = () => {
  initOrderList()
}


// 跳转详情页面
const handleRouter = (id) => {
  router.push({
    name: 'order-detail',
    params: {
      orderId: id

    },
    query: {
      redirect: router.currentRoute.value.fullPath
    }
  })
}
</script>
<style lang="scss" scoped>
// 外部容器
.container {
  background-color: rgba(208, 217, 218, 0.479);

  // 顶部导航
  .van-nav-bar {
    background-color: transparent;

    &::after {
      border-bottom: 0;
    }
  }

  // 下拉泪飙
  :deep(.van-dropdown-menu) {
    padding-bottom: 15px;

    .van-dropdown-menu__bar {
      background-color: transparent;
      box-shadow: 0 3px 3px rgba($color: #000000, $alpha: 0.1);
    }
  }

  // 订单
  .van-cell-group {
    margin: 0 8px 15px;
    background-color: transparent;

    :deep(.van-swipe-cell__right) {
      .van-button {
        height: 100%;
        border-radius: 10px;
      }
    }

    .product {

      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      overflow: hidden;
    }

    .productOre {
      border-bottom-right-radius: 10px;
      border-bottom-left-radius: 10px;

      :deep(.van-cell__value) {
        display: flex;
        justify-content: space-around;

        .haha {
          color: #F2270C;
          font-weight: 700;
        }
      }

    }

    .van-cell {

      :deep(.van-cell__value) {
        display: flex;
        align-items: center;

        img {
          width: 70px;
          height: 70px;
        }

        .info {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 0 0 0 5px;
          height: 100%;

          .title {
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            overflow: hidden;
            padding: 0 15px 5px 5px;
          }

          .infoprice {
            color: #F2270C;
            font-weight: 700;
          }
        }

        .count {
          color: #aaa;
        }
      }




    }
  }
}
</style>