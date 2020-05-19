<template>
  <div class="search-result">
    <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
    >
      <van-cell
      v-for="(article, index) in list"
      :key="index"
      :title="article.title" />
    </van-list>
  </div>
</template>

<script>
import { getSearchResult } from '@/api/search'
export default {
  name: 'SearchReault',
  components: {},
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      per_page: 10
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async onLoad () {
      // 请求获取数据
      const res = await getSearchResult({
        page: this.page, // 页数不传默认为1
        per_page: this.per_page, // 每页数量不传每页数量由后端决定
        q: this.searchText // 搜索字符
      })
      // console.log(res)

      // 把数据放到数据列表
      const results = res.data.data.results
      this.list.push(...results)

      // 关闭本次loading
      this.loading = false

      if (results.lenght) {
        // 如果有数据 更新下一页的数据
        this.page++
      } else {
        // 没有数据 关闭加载更多
        this.finished = true
      }
    }
  }
}
</script>

<style scoped lang="less">
.search-result {
    position: fixed;
    right: 0;
    left: 0;
    top: 54px;
    bottom: 0;
    overflow-y: auto;
}
</style>
