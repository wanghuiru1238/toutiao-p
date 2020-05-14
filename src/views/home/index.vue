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
    position="bottom"/>
  </div>
</template>

<script>
import { getchannels } from '@/api/user'
import ArticleList from './components/article-list'
export default {
  name: 'HomeIndex',
  components: {
    ArticleList
  },
  props: {},
  data () {
    return {
      channelShow: false, // 控制弹出层是否弹出
      active: 0, // 按照索引控制频道默认显示项
      channels: [] // 频道列表
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadchannels()
  },
  mounted () {},
  methods: {
    async loadchannels () {
      const res = await getchannels()
      // console.log(res)
      this.channels = res.data.data.channels
    }
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
}
</style>
