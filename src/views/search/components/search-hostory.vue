<template>
  <div class="search-hostory">
    <van-cell title="搜索历史">
      <div v-if="isDeleteShow">
        <span>全部删除</span>
        &nbsp;&nbsp;&nbsp;
        <span @click="isDeleteShow = false">完成</span>
      </div>
      <van-icon
      name="delete"
      v-else
      @click="isDeleteShow = true"
      />
    </van-cell>
    <van-cell>
    </van-cell>
    <van-cell
    v-for="(hostory, index) in SearchHostory"
    :key="index"
    :title="hostory"
    @click="onDelete(hostory, index)">
      <van-icon name="close"
      v-show="isDeleteShow"/>
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
    return {
      isDeleteShow: false // 关闭图标x的显示状态
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    onDelete (hostory, index) {
      // 如果在删除状态下 则执行删除操作
      if (this.isDeleteShow) {
        this.SearchHostory.splice(index, 1)
        return
      }

      // 非删除状态下 点击墨香历史记录则展示该项搜索结果
      this.$emit('search', hostory)
    }
  }
}
</script>

<style scoped lang="less"></style>
