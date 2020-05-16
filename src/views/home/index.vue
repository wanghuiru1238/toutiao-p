<template>
  <div class="home-c">
      <!-- 头部导航栏start -->
      <van-nav-bar class="app-nav-bar">
        <van-button round class="search-btn" slot="title" icon="search" type="info">
        搜索
        </van-button>
      </van-nav-bar>
    <!-- 头部导航栏end -->

    <!-- 文章频道列表start -->
      <van-tabs class="channel-tabs" v-model="active">
        <van-tab v-for="channel in channels" :key="channel.id" :title="channel.name">
          <!-- 文章列表start -->
          <article-list :channel="channel" />
          <!-- 文章列表end -->
        </van-tab>

        <!-- 占位符 防止汉堡图把频道列表中的最后一个元素给遮住 -->
        <div class="nav-placeholder" slot="nav-right"></div>

        <!-- 频道列表右侧 汉堡图标 -->
        <div slot="nav-right"
        class="wap-nav-wrap"
        @click="channelShow = true">
          <van-icon name="wap-nav"></van-icon>
        </div>
      </van-tabs>
    <!-- 文章频道列表end -->

    <!-- 弹出层 挂载到body节点上 -->
    <van-popup
    class="channel-edit"
    style="height: 100%"
    closeable
     close-icon-position="top-left"
     get-container="body"
    v-model="channelShow"
    position="bottom">

    <!-- 频道编辑里内容组件 -->
    <channel-edit
    :user-channels="channels"
    :active="active"
    @close="channelShow = false"
    @update-active="active = $event"/>

    </van-popup>
  </div>
</template>

<script>
import ChannelEdit from './components/channel-edit'
import { getchannels } from '@/api/user'
import ArticleList from './components/article-list'
import { mapState } from 'vuex'
import { getItem } from '@/utils/storage'
export default {
  name: 'HomeIndex',
  components: {
    ArticleList,
    ChannelEdit
  },
  props: {},
  data () {
    return {
      channelShow: true, // 控制弹出层是否弹出
      active: 0, // 按照索引控制频道默认显示项
      channels: [] // 频道列表
    }
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {},
  created () {
    this.loadchannels()
  },
  mounted () {},
  methods: {
    async loadchannels () {
      let channels = []

      if (this.user) {
        // 已登录 请求获取线上的用户频道列表
        const res = await getchannels()
        channels = res.data.data.channels
      } else {
        // 没有登录 判断本地存储中是否有储存的频道列表
        const locachannels = getItem('user-channels')

        // 如果本地存储中有保存的频道列表就使用:
        if (locachannels) {
          channels = locachannels
        } else {
          // 未登录,本地存储也没有数据,就默认请求{推荐频道列表}
          const res = await getchannels()
          channels = res.data.data.channels
        }
      }
      this.channels = channels
      // const res = await getchannels()
      // // console.log(res)
      // this.channels = res.data.data.channels
    }
    // 可直接在模板中通过$event默认接收传递的参数
    // onUpdateActive (index) {
    //   console.log(index)
    //   this.active = index
    // }
  }
}
</script>

<style scoped lang="less">
.home-c {
  /deep/.van-nav-bar__title {
    max-width: none;
  }
    .search-btn {
      width: 277px;
      height: 32px;
      background-color: #5babfb;
      border: none;
      .van-icon-search {
        font-size: 20px;
      }
    }
    .channel-tabs {
      /deep/.van-tab {
        border-right: 1px solid #edeff3;
        border-bottom: 1px solid #edeff3;
      }
      /deep/.van-tabs__line {
        width: 15px !important;
        bottom: 20px;
        background: #3296fa;
      }
    }
  .wap-nav-wrap {
    position: fixed;
    right: 0;
    width: 33px;
    height: 43px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(255, 255, 255, .8);
    .van-icon {
      font-size: 23px;
    }
    &:before {
      content: '';
      width: 1px;
      height: 29px;
      background: url('./line.png') no-repeat;
      background-size: cover;
      position: absolute;
      left: 0;
    }
  }
  .nav-placeholder {
    width: 32px;
    flex-shrink: 0;
  }
}
</style>
