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
    <van-form
    :show-error-message="false"
    :show-error="false"
    :validate-first="false"
    ref="login-form"
    @failed="onFailed"
    @submit="onLogin">
      <!-- 手机号 -->
      <van-field
        v-model="user.mobile"
        icon-prefix="toutiao"
        left-icon="shouji"
        name="mobile"
        placeholder="请输入手机号"
        center
        :rules="forRules.mobile"
      />
      <!-- 验证码 -->
      <van-field
        v-model="user.code"
        icon-prefix="toutiao"
        left-icon="yanzhengma"
        clearable
        name="code"
        placeholder="请输入验证码"
        center
        :rules="forRules.code"
      >
      <template #button>
        <!-- 倒计时 -->
        <van-count-down
          v-if="isCountDownShow"
          format="ss s"
          :time="1000 * 6"
          @finish="isCountDownShow = false"
          />
        <van-button
        v-else
        size="small"
        round class="send-btn"
        :loading="isSendms"
        @click.prevent="onSendms"
        >
          发送验证码</van-button>
      </template>
      </van-field>
      <!-- 登录按钮 -->
      <div class="login-btn-w">
        <van-button
        type="info"
        block class="login-btn"
        >登录</van-button>
      </div>
    <!-- 登录表单end -->
    </van-form>
  </div>
</template>

<script>
import { login, sendms } from '@/api/user'
export default {
  name: 'LoginIndex',
  components: {},
  props: {},
  data () {
    return {
      user: {
        mobile: '', // 手机号
        code: '' // 验证码
      },
      forRules: {
        mobile: [
          { required: true, message: '请填写手机号' },
          { pattern: /^1[3|5|7|8|9]\d{9}$/, message: '手机号格式错误' }
        ],
        code: [
          { required: true, message: '请填写验证码' },
          { pattern: /^\d{6}$/, message: '请输入6位验证码' }
        ]
      },
      isCountDownShow: false, // 发送验证码按钮 和倒计时显示状态
      isSendms: false // 发送验证码按钮loading
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async onLogin () {
      this.$toast.loading({
        message: '登录中...', // 提示文本内容
        forbidClick: true, // 提示框弹出页面时 是否禁止背景点击,true代表禁止
        duration: 0 // tost提示消息框展示时长,0代表在请求期间该提示框一直展示
      })
      try {
        const res = await login(this.user)
        // console.log(res)
        this.$toast.success('登录成功')
        // 吧后端返回的用户登录信息(token)放到vue容器中
        this.$store.commit('setUser', res.data.data)
        // 登录成功跳转到原来页面
        this.$router.back() // 此方法不必建议使用 暂时替代
      } catch (err) {
        // console.log('登陆失败', err)
        this.$toast.fail('登录失败,手机号或验证码错误')
      }
    },
    onFailed (error) {
      if (error.errors[0]) {
        this.$toast({
          message: error.errors[0].message,
          position: 'top' // 提示框显示位置(默认是在页面中间)
        })
      }
    },
    async onSendms () {
      try {
        // 校验手机号码
        await this.$refs['login-form'].validate('mobile')
        // 验证通过 请求发送验证码
        this.isSendms = true // 展示按钮loading状态,防止网速慢 用户会多次点击触发发送行为
        await sendms(this.user.mobile)
        // 验证码发送成功,显示倒计时,倒计时结束,显示发送验证码按钮(倒计时结束 给倒计时注册finish事件)隐藏倒计时,
        this.isCountDownShow = true
      } catch (err) {
        // try 里面有任何代码错误都会进入到catch中,所以要判断怒通错误 给出不同的提示
        // console.dir(err)
        // 验证失败 提示消息
        let message = ''
        if (err && err.response && err.response.status === 429) {
          // 短信发送失败 错误提示
          message = '发送频繁,请稍后再试'
        } else if (err.name === 'mobile') {
          // 表单验证失败 错误提示
          message = err.message
        } else {
          // 未知错误 提示消息
          message = '发送失败,请稍后再试'
        }
        this.$toast({
          message,
          position: 'top'
        })
      }
      // 无论发送验证码是否成功 都要关闭发送按钮loading状态
      this.isSendms = false
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
