<template>
  <div class="login-c">
    <!-- 头部start -->
    <van-nav-bar
    class="app-nav-bar"
      title="登录/注册"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- 头部end -->

    <!-- 登录表单start -->
    <van-cell-group>
  <van-field
    v-model="user.mobile"
    icon-prefix="toutiao"
    left-icon="shouji"
    placeholder="请输入手机号"
  />
  <van-field
    v-model="user.code"
    icon-prefix="toutiao"
    left-icon="yanzhengma"
    clearable
    placeholder="请输入验证码"
  >
  <template #button>
    <van-button size="small" round class="send-btn">获取验证码</van-button>
  </template>
  </van-field>
</van-cell-group>
<!-- 登录按钮 -->
<div class="login-btn-w">
  <van-button
  type="info"
  block class="login-btn"
  @click="onlogin"
  >登录</van-button>
</div>
    <!-- 登录表单end -->
  </div>
</template>

<script>
import { login } from '@/api/user'
export default {
  name: 'LoginIndex',
  components: {},
  props: {},
  data () {
    return {
      user: {
        mobile: '', // 手机号
        code: '' // 验证码
      }
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async onlogin () {
      try {
        const res = await login(this.user)
        console.log(res)
      } catch (err) {
        console.log('登陆失败', err)
      }
    }
  }
}
</script>

<style scoped lang="less">
.login-btn-w {
    padding: 26px 15px;
    .login-btn {
      background-color: #6db4fb;
      border: 0;
      .van-button__text {
          font-size: 15px;
      }
    }
}
.send-btn {
  background-color: #ededed;
  width: 76px;
  height: 25px;
  .van-button__text {
    font-size: 11px;
    color: #666666;
  }
}
</style>
