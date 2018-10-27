<style lang="less">
  @import './login.less';
</style>

<template>
  <div class="login">
    <div class="login-con">
      <Card icon="log-in" title="欢迎登录" :bordered="false">
        <div class="form-con">
          <Form ref="loginForm" :model="form" :rules="rules" @keydown.enter.native="handleSubmit">
            <FormItem prop="userName">
              <Input v-model="form.userName" placeholder="请输入用户名">
                <span slot="prepend">
                  <Icon :size="16" type="ios-person"></Icon>
                </span>
              </Input>
            </FormItem>
            <FormItem prop="password">
              <Input type="password" v-model="form.password" placeholder="请输入密码">
                <span slot="prepend">
                  <Icon :size="14" type="md-lock"></Icon>
                </span>
              </Input>
            </FormItem>
            <FormItem prop="captcha">
              <Input v-model="form.captcha" placeholder="请输入验证码">
                <span slot="prepend">
                  <Icon :size="14" type="md-lock"></Icon>
                </span>
              </Input>
            </FormItem>
            <div>
              <img alt="如果看不清楚，请单击图片刷新！" class="pointer" :src="captchaPath" @click="getCaptcha">
              <div class="refresh"><a href="javascript:;" @click="getCaptcha">点击刷新</a></div>
            </div>
            <FormItem>
              <Button @click="handleSubmit" type="primary" long>登录</Button>
            </FormItem>
          </Form>
          <p class="login-tip">输入任意用户名和密码即可</p>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
  import { getUUID } from '@/utils'
  export default {
      props: {
        userNameRules: {
          type: Array,
          default: () => {
            return [
              { required: true, message: '账号不能为空', trigger: 'blur' }
            ]
          }
        },
        passwordRules: {
          type: Array,
          default: () => {
            return [
              { required: true, message: '密码不能为空', trigger: 'blur' }
            ]
          }
        },
        captchaRules: {
          type: Array,
          default: () => {
            return [
              { required: true, message: '验证码不能为空', trigger: 'blur' }
            ]
          }
        }
    },
    data () {
      return {
        form: {
          userName: '',
          password: '',
          uuid: '',
          captcha: ''
        },
        captchaPath: ''
      }
    },
    computed: {
      rules () {
        return {
          userName: this.userNameRules,
          password: this.passwordRules,
          captcha: this.captchaRules
        }
      }
    },
    created () {
      this.getCaptcha()
    },
    methods: {
      // 提交表单
      handleSubmit () {
        this.$refs.loginForm.validate((valid) => {
          if (valid) {
            this.$http({
              url: this.$http.adornUrl('/login'),
              method: 'post',
              data: this.$http.adornData({
                'userName': this.form.userName,
                'password': this.form.password,
                // 'uuid': this.form.uuid,
                'captcha': this.form.captcha
              })
            }).then((res) => {
              if (res && res.data.sucess === true) {
                this.$cookie.set('token', res.data.data)
                this.$router.replace({ name: 'home' })
                console.log(res.data.data)
              } else {
                this.getCaptcha()
                this.$Message.error(res.data.message)
              }
            }).catch((error) =>{
              this.$Message.error("服务器内部错误")
            })
          }
        })
      },
      // 获取验证码
      getCaptcha () {
        console.log(getUUID())
        this.form.uuid = getUUID()
        this.captchaPath = this.$http.adornUrl(`/captcha.jpg?uuid=${this.form.uuid}`)
      }
    }
  }
</script>

<style>
  .refresh {
      text-align: right;
      vertical-align: middle;
      float: right;
      font-size: 12px;
      color: #495060;
      line-height: 1;
      padding: 14px 12px 10px 0;
      box-sizing: border-box;
  }
</style>