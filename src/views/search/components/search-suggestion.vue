<template>
  <div class="search-suggestion">
    <van-cell
    icon="search"
    v-for="(str, index) in suggestions"
    :key="index"
    @click="$emit('search',str)"
    >
    <div slot="title" v-html="hightLing(str)"></div>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestions } from '@/api/search'
import { debounce } from 'lodash'
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
      handler: debounce(async function () {
        const res = await getSearchSuggestions(this.searchText)
        this.suggestions = res.data.data.options
      }, 200),
      immediate: true // 该回调函数会在监听开始之后被立即调用
    }
  },
  created () {},
  mounted () {},
  methods: {
    hightLing (str) {
      // 正则表达式 /中间的内容/ 都会当作正则匹配模式字符来对待
      // 错误的写法： /this.searchText/gi
      // RegExp 是正则表达式的构造函数
      //  参数1：字符串
      //  参数2：匹配模式
      //  返回值：正则对象
      return str.replace(
        new RegExp(this.searchText, 'gi'),
        `<span style="color : red">${this.searchText}</span>`
      )
    }
  }
}
</script>

<style scoped lang="less"></style>
