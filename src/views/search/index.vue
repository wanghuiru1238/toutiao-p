<template>
  <div class="seach-c">
    <!-- 搜索栏start -->
    <!-- Tips: 在 van-search 外层增加 form 标签，且 action 不为空，即可在输入法中显示搜索按钮 -->
    <form action="/">
      <van-search
      v-model="searchText"
      show-action
      @search="onSearch"
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
    />
    <!-- 联想建议end -->

    <!-- 历史记录start -->
    <SearchHostory v-else/>
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
      isResultShow: false // 控制搜索结果的显示状态
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    onSearch () {
      // 展示搜索结果
      this.isResultShow = true
    }
  }
}
</script>

<style scoped lang="less"></style>
