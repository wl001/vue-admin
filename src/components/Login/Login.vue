<template>
  <div class="login">
      <div class="login_bg">
          <div class="LoginWrap">
              <div class="Login_user">

                 <div class="inpWarp" style="margin-top: 35px;text-align: center">
                   <h3>{{$t('m.login.introduction')}}</h3>
                 </div>
                <el-form style="width:320px" :model="loginForm" status-icon :rules="rules2" ref="loginForm" label-width="60px" class="demo-ruleForm" size="mini">
                  <el-form-item label="账号" prop="username">
                    <el-input  v-model="loginForm.username" auto-complete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="loginForm.password" auto-complete="off"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" :loading="loading" style="width:100%;" @click="submitForm('loginForm')">提交</el-button>
                  </el-form-item>
                </el-form>
              </div>
          </div>
      </div>
  </div>
</template>

<script type="text/babel">
  import { requestLogin } from '../../api/api';
  import Cookies from "js-cookie";
  import { isvalidUsername } from '../../../src/utils/validate'
export default {
  data () {
    const validateUsername = (rule, value, callback) => {
      if (!isvalidUsername(value)) {
        callback(new Error('请输入正确的用户名'))
      } else {
        callback()
      }
    }
    const validatePass = (rule, value, callback) => {
      if (value.length < 5) {
        callback(new Error('密码不能小于5位'))
      } else {
        callback()
      }
    }
    return {
      loading: false,
      loginForm: {
        username: 'admin',
        password: 'admin'
      },
      rules2: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePass }]
      }
    };
  },
  methods:{
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true;
          this.$router.push({ path: '/firstPage' })
          this.$store.dispatch('Login', this.loginForm).then(() => {
            this.loading = false;
            this.$router.push({ path: '/firstPage' })
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });

    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login{
  height:100%;
}
.login .login_bg{
  min-width:1024px;
  height:100%;
  background: url(../../../static/images/login_bg.jpg);
  background-size: 100% 100%;
  position: fixed;
  top: 0;
  left: 0;
  right:0;
  bottom:0;
}
.login .login_bg .LoginWrap{
  width: 880px;
  height: 340px;
  background: url(../../../static/images/login_center.png);
  background-size: 100% 100%;
  position: relative;
  left: 50%;
  top:50%;
  margin-left: -440px;
  margin-top: -170px;
}
.login .LoginWrap .Login_user{
  height: 300px;
  width: 340px;
  position: absolute;
  right: 85px;
  top: 50%;
  margin-top: -150px;
}
.login .LoginWrap .Login_user .inpWarp{
  height:35px;
  width:290px;
  margin: 0 auto;
  margin-bottom: 30px;
}
</style>
