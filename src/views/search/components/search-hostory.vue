<template>
  <div class="search-hostory">
    <van-cell title="搜索历史">
      <div>
        <span>全部删除</span>
        &nbsp;&nbsp;&nbsp;
        <span>完成</span>
      </div>
      <van-icon name="delete"/>
    </van-cell>
    <van-cell>
    </van-cell>
    <van-cell
    v-for="(hostory, index) in SearchHostory"
    :key="index"
    :title="hostory">
      <van-icon name="close"/>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'SearchHostory',
  components: {},
  props: {
    SearchHostory: {
      type: Array,
      required: true
    }
  },
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {}
}
</script>

<style scoped lang="less"></style>
