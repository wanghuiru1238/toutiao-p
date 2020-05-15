<template>
  <div class="channel-edit">

      <van-cell center :border="false">
        <!-- 我的频道 -->
        <div slot="title" class="channel-title">我的频道</div>
        <!-- 编辑按钮 -->
        <van-button
        type="danger"
        size="mini"
        class=""
        plain round>编辑</van-button>
      </van-cell>

      <van-grid :gutter="10">
        <van-grid-item
        class="grid-item"
        v-for="(channel,index) in userChannels"
        :key="index"
        :text="channel.name" />
      </van-grid>

      <van-cell center :border="false">
        <!-- 频道推荐 -->
        <div slot="title" class="channel-title">频道推荐</div>
      </van-cell>
      <van-grid :gutter="10">
        <van-grid-item
        class="grid-item"
        v-for="(channel, index) in recommendChannels"
        :key="index"
        :text="channel.name" />
      </van-grid>
  </div>
</template>

<script>
import { getAllChannels } from '@/api/channel'
export default {
  name: 'ChannelEdit',
  components: {},
  props: {
    'user-channels': {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      allChannels: [] // 所有频道列表
    }
  },
  computed: {
    recommendChannels () {
      // filter方法可过滤数据 根据返回的布尔值true收集数据

      // filter查找满足条件的所有元素
      return this.allChannels.filter(channel => {
        // 判断channel是否属于 我的频道 找到满足该条件的元素 取反 就是推荐频道里的数据
        // find方法查找满足条件的单个元素
        return !this.userChannels.find(userChannels => {
          // 找到满足该条件的元素
          return userChannels.id === channel.id
        })
      })

      // // 使用遍历方法得出推荐频道列表
      // const recommendChannel = []

      // // 遍历所有频道
      // this.allChannels.forEach(channel => {

      //   let flag = false

      //   for (let i = 0; i < this.userChannels.length; i++) {
      //     if (this.userChannels[i].id === channel.id) {
      //       flag = true
      //       break
      //     }
      //   }
      //   if (!flag) {
      //     recommendChannel.push(channel)
      //   }
      // })
      // return recommendChannel
    }
  },
  watch: {},
  created () {
    this.loadAllChannels()
  },
  mounted () {},
  methods: {
    async loadAllChannels () {
      const res = await getAllChannels()
      this.allChannels = res.data.data.channels
    }
  }
}
</script>

<style scoped lang="less">
.channel-edit {
  padding-top: 54px;
  .channel-title {
      font-size: 16px;
      color: #222;
  }
  .van-button__text {
      font-size: 14px;
  }
  .grid-item {
    width: 80px;
    height: 43px;
    /deep/.van-grid-item__content {
      background-color: #f4f5f6;
      .van-grid-item__text {
        font-size: 14px;
        color: #222;
      }
    }
  }
}
</style>
