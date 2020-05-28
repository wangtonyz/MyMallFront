<template >
    <div>
    <div class="background">
    <img :src="imgSrc" width="100%" height="100%" alt="" />
    </div>
    <el-card class="login-form-layout">
      <el-form>
        <el-form-item label="用户名">
          <el-input v-model="loginForm.username" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="loginForm.pwd" placeholder="密码" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleLogin">登陆</el-button>
          <el-button type="warning" @click="toRegister">注册</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
 
<script>
export default {
  name: "login",
  data() {
    return {
      loginForm: {
        username: "",
        pwd: ""
      },
      imgSrc:require('@/assets/BGP.jpg')
    }
  },

  methods: {
    toRegister() {
      this.$router.push("/register");
    },
    handleLogin() {
      this.$axios({
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        method: "POST",
        url: "api/checkpwd",
        data: this.$qs.stringify(this.loginForm)
      })
        .then(res => {
          //获取response信息
          console.log(res.data);
          if (res.data == "false") {
            (this.loginForm.username = ""),
              (this.loginForm.pwd = ""),
              this.$alert("用户名密码错误", "提示", {
                confirmButtonText: "确定"
              });
          } else {
             // this.$router.push("/home");
            this.$router.push({
              name: "Home",
              query: {
                username:this.loginForm.username,
                userid:res.data
              }
            });
           
          }
        })
        .catch(Error => {
          console.log(Error);
        });
    }
  }
};
</script>
<style scoped>
.background{
    width:100%;  
    height:100%;  /**宽高100%是为了图片铺满屏幕 */
    z-index:-1;
    position: absolute;
}
.front{
    z-index:1;
    position: absolute;
}

.login-form-layout {
  position: absolute;
  left: 0;
  right: 0;
  width: 360px;
  margin: 140px auto;
}

.login-title {
  text-align: center;
}
.login-button {
  background: #afada7;
}
.login-center-layout {
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
  margin-top: 200px;
}
</style>
