<template>
  <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="商品名称: ">
      <el-input v-model="form.goodname" placeholder="请输入商品名称"></el-input>
    </el-form-item>

    <el-form-item label="价格   : ">
      <el-input-number v-model="form.price" :precision="2" :step="1" :max="9999"></el-input-number>
    </el-form-item>

    <el-form-item label="详细信息: ">
      <el-input type="textarea" :rows="5" placeholder="请输入联系方式、商品详细信息" v-model="form.info"></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="success" @click="onSubmit()">提交</el-button>
      <el-button type="warning" @click="onCancel()">取消</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  data() {
    return {
        username:this.$route.query.username,
       
      form: {
        userid: this.$route.query.userid,
        goodname: "",
        price: "",
        info: "",
        isbuy: 1
      }
    };
  },
  methods: {
    onSubmit() {
      this.$axios({
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        method: "POST",
        url: "api/addGood",
        data: this.$qs.stringify(this.form)
      })
        .then(res => {
          //获取response信息
          console.log(res.data);
          if (res.data == "false") {
            this.form.goodname = "";
            this.form.price = 0;
            this.form.info = "";
            this.form.isbuy = 0;
            this.$alert("输入错误，请重新输入", "提示", {
              confirmButtonText: "确定"
            });
            
          } else {
            this.$alert("商品发布成功", "提示", {
              confirmButtonText: "确定"
            });
            this.$router.push({
              name: "Home",
              query: {
                username: this.username,
                userid: this.form.userid
              }
            });
          }
        })
        .catch(Error => {
          console.log(Error);
        });
    },

    //取消功能
    onCancel() {
      //将表单清空
      this.form.goodname = "";
      this.form.price = 0;
      this.form.info = "";
      this.form.isbuy = 0;
      this.$router.push("/home");
    }
  }
};
</script>