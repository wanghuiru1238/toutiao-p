<template>
  <!-- 文章列表start -->
  <van-cell
  class="article-item"
  :to="{
    name: 'article',
    params: {
      articleId: article.art_id
    }
  }"
  >

    <!-- 文章标题stare -->
    <div slot="title" class="article-title van-multi-ellipsis--l3">
      {{ article.title }}
      </div>
    <!-- 文章标题end -->

    <div slot="label">
      <!-- 文章封面stare -->
      <div class="cover-wrap" v-if="article.cover.type === 3">
        <div class="cover-wrap-item" v-for="(img, index) in article.cover.images" :key="index">
          <!-- 封面图片start -->
          <van-image
          class="cover-img"
          fit="cover"
          :src="img" />
          <!-- 封面图片end -->
        </div>
      </div>
      <!-- 文章封面end -->

      <!-- 文章作者 评论 发表时间start -->
      <div class="label-wrap">
        <span>{{ article.aut_name }}</span>
        <span>{{ article.comm_count }}评论</span>
        <span>{{ article.pubdate | relativeTime }}</span>
      </div>
      <!-- 文章作者 评论 发表时间end -->
    </div>

  </van-cell>
  <!-- 文章列表end -->
</template>

<script>
export default {
  name: 'ArticleItem',
  components: {},
  props: {
    article: {
      type: Object,
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

<style scoped lang="less">
.article-item {
  .article-title {
    font-size: 16px;
    font-family: "微软雅黑";
  }
  /deep/.van-cell__value {
    flex: unset;
    width: 116px;
    height: 73px;
    margin-left: 12px;
  }
  .cover-img {
    width: 116px;
    height: 73px;
  }
  .cover-wrap {
    display: flex;
    padding: 15px 0;
    .cover-wrap-item {
      flex: 1;
      height: 73px;
      &:not(:last-child) {
        padding-right: 4px;
      }
      .cover-img {
        width: 100%;
        height: 73px;
      }
    }
  }
  .label-wrap {
    font-size: 12px;
    color: #b4b4b4;
    span {
      margin-right: 12px;
    }
  }
}
</style>
