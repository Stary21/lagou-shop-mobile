<template>
  <van-cell-group class="comment">
    <van-cell
      title="商品评价"
      :value="`好评率:${state.replyChance}%`"
    />

    <van-cell class="tags">
      <van-button
        size="small"
        :class="{ active: state.isSum }"
        @click="tagHandle('0')"
      >
        全部({{ state.sumCount }})
      </van-button>
      <van-button
        size="small"
        :class="{ active: state.isGood }"
        @click="tagHandle('1')"
      >
        好评({{ state.goodCount }})
      </van-button>
      <van-button
        size="small"
        :class="{ active: state.isIn }"
        @click="tagHandle('2')"
      >
        中评({{ state.inCount }})
      </van-button>
      <van-button
        size="small"
        :class="{ active: state.isPoor }"
        @click="tagHandle('3')"
      >
        差评({{ state.poorCount }})
      </van-button>
    </van-cell>

    <div v-if="state.hasComment">
      <comment-item
        v-for="reply in state.commentList"
        :key="reply.id"
        :reply="reply"
      />
    </div>

    <van-empty
      v-else
      description="暂时还没有评价哦~"
    />
  </van-cell-group>
</template>
<script setup>
import CommentItem from '@/components/CommentItem.vue'
import { getCommentCount, getCommentByTag } from '@/api/product'
import { computed, reactive } from 'vue'
const productId = defineProps({
  productId: {
    type: String,
    required: true
  }
})

const state = reactive({
  // 存储所有个数信息
  commentCounts: {},
  // 通过计算属性，处理不同类别的评论个数
  goodCount: computed(() => state.commentCounts?.good_count || 0),
  poorCount: computed(() => state.commentCounts?.poor_count || 0),
  inCount: computed(() => state.commentCounts?.in_count || 0),
  sumCount: computed(() => state.commentCounts?.sum_count || 0),
  replyChance: computed(() => state.commentCounts?.reply_chance || 100),
  // 存储评价信息
  commentList: [],
  // 控制显示的评价状态
  active: '0',
  // 通过计算属性，来进行不同类型状态的判断
  isSum: computed(() => state.active === '0'),
  isGood: computed(() => state.active === '1'),
  isIn: computed(() => state.active === '2'),
  isPoor: computed(() => state.active === '3'),
  // 判断是否存在评论
  hasComment: computed(() => state.commentList.length || 0)
})

async function initReplyData () {
  const { data } = await getCommentCount(productId.productId)
  if (data.status !== 200) { return }
  state.commentCounts = data.data
}
initReplyData()

async function initCommentByTag (type) {
  const { data } = await getCommentByTag(productId.productId, { type })
  if (data.status !== 200) { return }
  state.commentList = data.data
}
// 0 - 全部 1 - 好评 2 - 中评 3 - 差评
initCommentByTag('0')

// 切换类别的点击事件
function tagHandle (tagKey) {
  state.active = tagKey
  // 发送新类型的评价请求
  initCommentByTag(tagKey)
}
</script>

<style lang="scss" scoped>
.tags {
  .van-button {
    border-radius: 15px;
    margin-right: 10px;
  }

  .active {
    background-color: #FBC546;
  }
}
</style>
