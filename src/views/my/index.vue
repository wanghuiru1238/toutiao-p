<template>
  <div class="my-c">
    <van-cell-group>
      <van-cell
      center
      title="单元格"
      value="内容">
          <van-image
          width="50"
          height="50"
          slot="icon"
          fit="cover"
          round
          src="https://img.yzcdn.cn/vant/cat.jpeg" />
        <div slot="title">昵称</div>
        <van-button
        round
        size="small">编辑资料</van-button>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
export default {
  name: 'MyIndex',
  components: {},
  props: {},
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
