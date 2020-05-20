<template>
  <div class="seach-c">
    <!-- 搜索栏start -->
    <!-- Tips: 在 van-search 外层增加 form 标签，且 action 不为空，即可在输入法中显示搜索按钮 -->
    <form action="/">
      <van-search
      v-model="searchText"
      show-action
      @search="onSearch(searchText)"
      @cancel="$router.back()"
      @focus="isResultShow = false"
      placeholder="请输入搜索关键词" />
    </form>
    <!-- 搜索栏end -->

    <!-- 搜索结果start -->
    <search-result
    :search-text = "searchText"
    v-if="isResultShow"/>
    <!-- 搜索结果end -->

    <!-- 联想建议start -->
    <SearchSuggestion
    v-else-if="searchText"
    :search-text = "searchText"
    @search="onSearch"
    />
    <!-- 联想建议end -->

    <!-- 历史记录start -->
    <SearchHostory
    :search-hostory = "SearchHostory"
    v-else/>
    <!-- 历史记录end -->

  </div>
</template>

<script>
import SearchSuggestion from './components/search-suggestion'
import SearchHostory from './components/search-hostory'
import SearchResult from './components/search-result'
export default {
  name: 'SearchIndex',
  components: {
    SearchSuggestion,
    SearchHostory,
    SearchResult
  },
  props: {},
  data () {
    return {
      searchText: '', // 搜索框中的文字
      isResultShow: false, // 控制搜索结果的显示状态
      SearchHostory: [] // 历史搜索记录
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    onSearch (searchText) {
      // 输入框内容展示成要搜索的文本
      this.searchText = searchText

      // 判断搜索历史中是否有重复项
      const index = this.SearchHostory.indexOf(searchText)

      // 有重复项 则移除
      if (index !== -1) {
        this.SearchHostory.splice(index, 1)
      }

      // 记录搜索历史记录,把新搜索的记录放最前
      this.SearchHostory.unshift(searchText)
      // 展示搜索结果
      this.isResultShow = true
    }
  }
}
</script>

<style scoped lang="less"></style>
