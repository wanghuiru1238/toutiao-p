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
      placeholder="请输入搜索关键词" />
    </form>
    <!-- 搜索栏end -->

    <!-- 联想建议start -->
    <!-- 联想建议end -->

    <!-- 搜索结果start -->
    <!-- 搜索建议end -->
  </div>
</template>

<script>
export default {
  name: 'SearchIndex',
  components: {},
  props: {},
  data () {
    return {
      searchText: '' // 搜索框中的文字
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    onSearch () {
      console.log('onSearch')
    }
  }
}
</script>

<style scoped lang="less"></style>
