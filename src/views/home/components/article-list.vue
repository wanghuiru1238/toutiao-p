<template>
  <div class="article-list">
    <van-pull-refresh
    v-model="isDownLoading"
    :success-text="freshText"
    :success-duration="1000"
    @refresh="onRefresh">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="loadArticles"
    >
       <van-cell v-for="(article, index) in articles" :key="index" :title="article.title" />
    </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticlesList } from '@/api/article'
export default {
  name: 'ArticleList',
  components: {},
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      articles: [], // 文章列表
      loading: false, // 控制加载中的loading状态
      finished: false, // 控制加载结束状态,加载结束 不再触发加载更多
      timestamp: null, // 获取下一页的时间戳
      isDownLoading: false, // 下拉刷新的loading状态
      freshText: '' // 刷新出来的数据条数
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async loadArticles () {
      const res = await getArticlesList({
        channel_id: this.channel.id, // 频道id
        timestamp: this.timestamp || Date.now(), // 时间戳 请求什么时候的数据使用什么时候的时间戳
        with_top: 1 // 是否包含文章置项(值为1时是包含,为0是不包含)
      })
      // console.log(res)
      // 2将数据放到articles文章列表中
      const { results } = res.data.data
      this.articles.push(...results)

      // 3设置本次加载状态结束
      this.loading = false

      // 4数据全部加载完成
      if (results.length) {
        this.timestamp = res.data.data.pre_timestamp
      } else {
        this.finished = true
      }
    },
    async onRefresh () {
      // 请求获取数据
      const res = await getArticlesList({
        channel_id: this.channel.id, // 频道id
        timestamp: Date.now(), // 下拉刷新是最新时间戳
        with_top: 1 // 是否包含文章置项(值为1时是包含,为0是不包含)
      })
      // 把数据追加到文章列表顶部
      const { results } = res.data.data
      this.articles.unshift(...results)
      // 关闭加载数据的loading状态
      this.isDownLoading = false

      // 提示更新了多少条数据
      this.freshText = `更新了${results.length}条数据`
    }
  }
}
</script>

<style scoped lang="less">
.article-list {
  position: fixed;
  left: 0;
  right: 0;
  top: 90px;
  bottom: 50px;
  overflow-y: auto;
}
</style>
