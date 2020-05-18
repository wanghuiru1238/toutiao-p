<template>
  <div class="search-suggestion">
    <van-cell
    :title="str"
    icon="search"
    v-for="(str, index) in suggestions"
    :key="index"
    >
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestions } from '@/api/search'
export default {
  name: 'SearchSuggestion',
  components: {},
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      suggestions: [] // 联想建议列表
    }
  },
  computed: {},
  watch: {
    // 监听搜索框的变化(也就是searchText的变化)
    searchText: {
      // 当数据发生变化就会触发hander函数
      async handler () {
        const res = await getSearchSuggestions(this.searchText)
        this.suggestions = res.data.data.options
      },
      immediate: true // 该回调函数会在监听开始之后被立即调用
    }
  },
  created () {},
  mounted () {},
  methods: {}
}
</script>

<style scoped lang="less"></style>
