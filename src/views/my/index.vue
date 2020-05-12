<template>
  <div class="my-c">
    <van-cell-group class="my-info">
      <!-- 用户个人信息start -->
      <van-cell
      class="base-info"
      center
      :border="false"
      title="单元格"
      value="内容">
          <van-image
          class="avatar"
          slot="icon"
          fit="cover"
          round
          src="https://img.yzcdn.cn/vant/cat.jpeg" />
        <div slot="title" class="name">昵称</div>
        <van-button
        class="updata-btn"
        round
        size="small">编辑资料</van-button>
      </van-cell>
      <!-- 用户个人信息end -->

      <!-- 用户信息数据统计start-->
      <van-grid :border="false" class="data-info">
        <van-grid-item class="data-info-item">
          <div slot="text" class="text-wrap">
            <div class="count">aaa</div>
            <div class="text">头条</div>
          </div>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <div slot="text" class="text-wrap">
            <div class="count">aaa</div>
            <div class="text">关注</div>
          </div>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <div slot="text" class="text-wrap">
            <div class="count">aaa</div>
            <div class="text">粉丝</div>
          </div>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <div slot="text" class="text-wrap">
            <div class="count">aaa</div>
            <div class="text">获赞</div>
          </div>
        </van-grid-item>
      </van-grid>
    </van-cell-group>
      <!-- 用户信息数据统计end -->

      <!-- 宫格导航start -->
      <van-grid class="nav-grid" :column-num="2">
        <van-grid-item class="nav-grid-item" icon-prefix="toutiao" icon="shoucang" text="收藏" />
        <van-grid-item class="nav-grid-item" icon-prefix="toutiao" icon="lishi" text="历史" />
      </van-grid>
      <!-- 宫格导航end -->

      <!-- 单元格导航start -->
      <van-cell class="message" title="消息通知" is-link to="" />
      <van-cell class="xiaozhi" title="小智同学" is-link to="" />
      <van-cell class="outlogin" title="退出登录"/>
      <!-- 单元格导航end -->
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'MyIndex',
  components: {},
  props: {},
  data () {
    return {}
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {},
  created () {},
  mounted () {},
  methods: {}
}
</script>

<style scoped lang="less">
.my-c {
  .my-info {
    background-size: cover;
    background: url("./banner.png") no-repeat;
    .base-info {
      box-sizing: border-box;
      background-color: unset;
      height: 115px;
      padding-top: 38px;
      padding-bottom: 11px;
      .avatar {
        box-sizing: border-box;
        width: 66px;
        height: 66px;
        border: 1px solid #ffffff;
        margin-right: 11px;
      }
      .name {
        font-size: 16px;
        color: #ffffff;
      }
      .updata-btn {
        height: 20px;
        font-size: 12px;
        color: #666666;
      }
    }
    /deep/.van-grid-item__content {
      background-color: unset;
    }
    .data-info {
      .data-info-item {
        height: 65px;
        color: #ffffff;
        .text-wrap {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          .count {
          font-size: 18px;
          }
          .text {
            font-size: 12px;
          }
        }
      }
    }
  }
  /deep/ .nav-grid {
      .nav-grid-item {
        height: 70px;
        .toutiao {
          font-size: 22px;
        }
        .toutiao-shoucang {
          color: #eb5253;
        }
        .toutiao-lishi {
          color: #ff9d1d;
        }
        .van-grid-item__text {
          font-size: 14px;
          color: #333333;
        }
      }
    }
    .outlogin {
      text-align: center;
      color: #d86262;
    }
    .xiaozhi {
      margin-bottom: 4px;
      font-size: 15px;
    }
    .message {
      margin-top: 4px;
      font-size: 15px;
    }
}
</style>
