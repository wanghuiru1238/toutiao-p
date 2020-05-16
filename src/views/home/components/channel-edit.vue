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
        @click="isEdit = !isEdit"
        plain round>{{ isEdit ? '完成' : '编辑'}}</van-button>
      </van-cell>

      <van-grid :gutter="10">
        <van-grid-item
        class="grid-item"
        :class="{ active: index === active}"
        :icon = "(isEdit && index !== 0) ? 'clear' : ''"
        v-for="(channel,index) in userChannels"
        :key="index"
        :text="channel.name"
        @click="onUserChannelClick(index)"/>
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
        :text="channel.name"
        @click="onAdd(channel)"/>
      </van-grid>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getAllChannels } from '@/api/channel'
import { setItem } from '@/utils/storage'
export default {
  name: 'ChannelEdit',
  components: {},
  props: {
    active: {
      type: Number,
      required: true
    },
    'user-channels': {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      allChannels: [], // 所有频道列表
      isEdit: false // 控制(频道)编辑状态
    }
  },
  computed: {
    ...mapState(['user']),
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
    },
    onAdd (channel) {
      this.userChannels.push(channel)

      // 点击添加至我的频道的数据刷新即会丢失 所以需设置数据持久化
      if (this.user) {
        // 登录状态,数据存储到线上

      } else {
        // 没有登录,数据存储到本地
        setItem('user-channels', this.userChannels)
      }
    },
    onUserChannelClick (index) {
      if (this.isEdit && index !== 0) {
        // 编辑状态: 删除频道
        this.deleteChannel(index)
      } else {
        // 非编辑状态: 切换频道
        this.changeChannel(index)
      }
    },
    // 删除频道
    deleteChannel (index) {
      // 如果删除的是当前激活频道之前的频道
      if (index <= this.active) {
        // 更新激活频道的索引
        this.$emit('update-active', this.active - 1)
      }
      this.userChannels.splice(index, 1)
    },
    // 切换频道
    changeChannel (index) {
      console.log(index)
      // 组件通信自定义事件 显示切换的频道
      this.$emit('update-active', index)

      // 组件通信自定义事件 关闭弹出层
      this.$emit('close')
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
        position: relative;
        margin-top: 0;
      }
      /deep/.van-icon-clear {
        position: absolute;
        right: -5px;
        top: -5px;
        font-size: 17px;
        color:  #ccc;
      }
    }
  }
  .active {
    /deep/.van-grid-item__text {
      color: red !important;
    }
  }
}
</style>
