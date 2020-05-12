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
      <van-tabs v-model="active">
        <van-tab v-for="channel in channels" :key="channel.id" :title="channel.name">
          <!-- 文章列表start -->
          <article-list :channel="channel" />
          <!-- 文章列表end -->
        </van-tab>
      </van-tabs>
    <!-- 文章频道列表end -->
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
      // 按照索引控制频道默认显示项
      active: 0,
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
}
</style>
