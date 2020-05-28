<template>
  <el-container>
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="600px">
      <el-form-item label-width="600px">
        <div class="div-head">Register</div>
      </el-form-item>
      <el-form-item label="Username" prop="username">
        <el-input v-model="ruleForm.username"></el-input>
      </el-form-item>
      <el-form-item label="Password" prop="pwd">
        <el-input type="password" v-model="ruleForm.pwd" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="Confirm password" prop="checkPass">
        <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button el-button type="warning" plain @click="submitInfo()">注册</el-button>
        <!-- <el-button el-button type="warning" plain @click="submitInfo">注册</el-button> -->
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-container>
</template>


<script>
export default {
  data() {
    var checkName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("Username cannot be empty"));
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Please input password"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("please input password again"));
      } else if (value !== this.ruleForm.pwd) {
        callback(new Error("The two passwords are inconsistent"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        pwd: "",
        username: "",
        checkPass: ""
      },
      rules: {
        pwd: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        username: [{ validator: checkName, trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
          //发送请求
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    toLoginPage: function() {
      this.$router.push("/");
    },
    submitInfo() {
      //两次密码不一致重新输入
      if (this.ruleForm.pwd != this.ruleForm.checkPass) {
        this.$alert("两次密码不一致,请重新输入", "提示", {
          confirmButtonText: "确定"
        });
        this.ruleForm.pwd = "";
        this.ruleForm.checkPass = "";
        return false;
      }
      // 发送注册请求
      this.$axios({
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        method: "POST",
        url: "api/addUser",
        data: this.$qs.stringify({
          username: this.ruleForm.username,
          pwd: this.ruleForm.pwd
        })
      })
        .then(res => {
          console.log(res.data);
          if (res.data == true) {
            //响应注册成功
            this.$alert("注册成功", "提示", {
              confirmButtonText: "确定"
            });
            this.$router.push("/");
          } else {
            //响应注册失败
            this.$alert("注册失败,请重新创建", "提示", {
              confirmButtonText: "确定"
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
