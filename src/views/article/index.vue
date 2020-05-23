<template>
  <div class="article-c">
    <!-- 头部start -->
    <van-nav-bar
    class="app-nav-bar"
      title="文章详情"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- 头部end -->

    <div class="article-wrap">
      <!-- 文章标题start -->
      <h1 class="article-title">{{ article.title }}</h1>
      <!-- 文章标题end -->

      <!-- 作者信息start -->
      <van-cell center class="author-info">

      <!-- 作者名称 -->
      <div slot="title" class="name">{{ article.aut_name }}</div>

      <!-- 作者头像 -->
      <van-image
      class="avatar"
      slot="icon"
      fit="cover"
      round
      :src="article.aut_photo"
      />

      <!-- 发布时间 -->
      <div slot="label" class="pubdate">{{ article.pubdate | relativeTime }}</div>

      <!-- 关注按钮 -->
      <van-button
      class="btn"
      icon="plus"
      size="small"
      round
      :type="article.is_followed ? 'default' : 'info'"
      @click="onFollow"
      :loading="isFollowLoading"
      >{{ article.is_followed ? '已关注' : '关注' }}</van-button>

      </van-cell>
    <!-- 作者信息end -->

    <!-- 文章内容 -->
    <div
    class="markdown-body"
    ref="article-content"
    v-html="article.content"
    >
    </div>

    <!-- 文章评论列表 -->
    <comment-list :source="articleId"/>
  </div>

    <!-- 底部区域start -->
    <div class="article-bottom">
      <!-- 评论框 -->
      <van-button
      class="comment-btn"
      type="default"
      size="small"
      round
      >写评论</van-button>

      <!-- 右侧图标 -->
      <van-icon name="comment-o" info="111" color="#777"/>
      <van-icon
      :name="article.is_collected ? 'star' : 'star-o'"
      :color="article.is_collected ? 'red' : '#777'"
      @click="onCollect"
      />
      <van-icon
      :name="article.attitude == 1 ? 'good-job' : 'good-job-o'"
      :color="article.attitude == 1 ? 'red' : '#777'"
      @click="onLike"
      />
      <van-icon name="share" color="#777"/>

    </div>
    <!-- 底部区域end -->
  </div>
</template>

<script>
import './github-markdown.css'
import { getArticles, addCollect, deleteCollect, addLike, deleteLike } from '@/api/article'
import { addFollow, deleteFollow } from '@/api/user'
import CommentList from './components/comment-list'

// 这个图片预览组件必须要单独加载
import { ImagePreview } from 'vant'

// 在组件中获取动态路由参数：
//    方式一：this.$route.params.articleId
//    方式二：props 传参，推荐
//      this.articleId
export default {
  name: 'ArticleIndex',
  components: {
    CommentList
  },
  props: {
    articleId: {
      type: [String, Number, Object],
      required: true
    }
  },
  data () {
    return {
      article: {}, // 文章数据对象
      isFollowLoading: false, // 关注按钮的loading状态
      isCollectLoading: false // 收藏图标loading状态
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadArticles()
  },
  mounted () {},
  methods: {
    async loadArticles () {
      const res = await getArticles(this.articleId)
      // console.log(res)
      this.article = res.data.data

      // 数据改变影响视图更新（DOM数据）不是立即的
      // 所以如果需要在修改数据之后马上操作被该数据影响的视图 DOM，需要把这个代码放到 $nextTick 中
      // this.$nextTick 是 Vue 提供的一个方法
      this.$nextTick(() => {
        this.handlePreviewImsge()
      })
    },
    handlePreviewImsge () {
      // 1.获取文章内容DOM容器
      const articleContent = this.$refs['article-content']

      // 2.通过DOM的方式获取文章中的所有img标签
      const imgs = articleContent.querySelectorAll('img')
      // console.log(imgs)

      const imgPaths = [] // 收集所有图片路径
      // 3.循环获取到的所有img标签(imgs) 然后给每个标签(img)注册点击事件
      imgs.forEach((img, index) => {
        // 获取所有图片地址
        imgPaths.push(img.src)
        img.onclick = function () {
          // 4.在事件处理函数中调用ImagePreview()方法预览图片
          ImagePreview({
            images: imgPaths, // 预览图片路径列表
            startPosition: index // 预览的图片其实位置
          })
        }
      })
    },
    async onFollow () {
      this.isFollowLoading = true

      // 已关注 则取消关注
      if (this.article.is_followed) {
        await deleteFollow(this.article.aut_id)
      } else {
        // 没关注 则添加关注
        await addFollow(this.article.aut_id)
      }
      this.article.is_followed = !this.article.is_followed
      this.isFollowLoading = false
    },
    async onCollect () {
      this.$toast.loading({
        message: '操作中....',
        forbidClick: true // 禁止背景点击
      })

      // 已收藏 则取消收藏
      if (this.article.is_collected) {
        await deleteCollect(this.articleId)
      } else {
        // 没收藏 则添加收藏
        await addCollect(this.articleId)
      }
      this.article.is_collected = !this.article.is_collected
      this.$toast.success(`${this.article.is_collected ? '' : '取消'}收藏成功`)
    },
    async onLike () {
      this.$toast.loading({
        message: '操作中....',
        forbidClick: true // 禁止背景点击
      })

      // 已点赞 则取消点赞
      if (this.article.attitude === 1) {
        await deleteLike(this.articleId)
        this.article.attitude = -1
      } else {
        // 没点赞 则添加点赞
        await addLike(this.articleId)
        this.article.attitude = 1
      }
      this.$toast.success(`${this.article.attitude === 1 ? '' : '取消'}点赞成功`)
    }
  }
}
</script>

<style scoped lang="less">
.article-c {
  .article-wrap {
    position: fixed;
    top: 46px;
    bottom: 45px;
    left: 0;
    right: 0;
    overflow-y: auto;
  }
  .article-title {
    font-size: 20px;
    padding: 24px 20px 18px;
    color: #3a3a3a;
    background-color: #ffffff;
    margin: 0;
  }
  .author-info {
    .avatar {
      width: 40px;
      height: 40px;
      margin-right: 9px;
    }
    .name {
      font-size: 14px;
      color: #333;
    }
    .pubdate {
      font-size: 12px;
      color: #b4b4b4;
    }
    .btn {
      height: 29px;
      width: 80px;
    }
  }
.markdown-body {
  padding: 24px;
  background-color: #fff;
}
.article-bottom {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 45px;
  border-top: 1px solid #d8d8d8;
  background-color: #fff;
  .comment-btn {
    width: 140px;
    height: 23px;
    line-height: 23px;
    border: 1px solid #eee;
    font-size: 15px;
    color: #a7a7a7;
  }
}
}
</style>
