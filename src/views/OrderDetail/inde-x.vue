<template>
  订单详情
  <img :src="imgD" alt="">
</template>
<script setup>
import { getOrderDetail } from '@/api/order'
import { computed } from '@vue/reactivity';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router'
const router = useRouter()
const route = useRoute()


const { orderId } = defineProps({
  orderId: {
    type: String,
    required: true
  }
})


const orderDetails = ref({})


const orderDetail = async (orderId) => {
  const { data } = await getOrderDetail(orderId)
  if (data.status !== 200) {
    router.push(route.query.redirect ?? '/order')
  }
  orderDetails.value = data

}
orderDetail(orderId)

const imgD = computed(() => orderDetails.value?.data.cartInfo[0].productInfo.image)

</script>
<style lang="scss" scoped>
img {
  width: 100vw;
  height: 50vh;
}
</style>