<template>
  <el-container>
    <!-- 标题头 -->
    <el-header style="text-align: right; font-size: 12px">
      <el-button size="medium" type="warning" @click="loginOut()">登出</el-button>
      用户:{{username}}
    </el-header>

    <el-container>
      <!-- 侧边栏 -->
      <el-aside class="el-aside" width="200px">
        
        <br />
        <el-button type="primary" style="font-size:15px; width:190px " @click="returnHome()">返回</el-button>
      </el-aside>

      <!-- 主要部分 -->
      <el-main>
        <!-- 列表头 -->
        <el-row gutter="2">
          <el-col :span="5">
            <div style="text-align:center">名称</div>
          </el-col>
          <el-col :span="5">
            <div style="text-align:center">价格</div>
          </el-col>
          <el-col :span="5">
            <div style="text-align:center">详情</div>
          </el-col>
          <el-col :span="5">
            <div style="text-align:center">是否出售</div>
          </el-col>
        </el-row>
        <!-- 列表 -->
        <li v-for="(item,index) in listForm" :key="item">
          <el-row gutter="2">
            <div>
              <el-col :span="5">
                <div class="grid-content bg-purple">{{item.name}}</div>
              </el-col>
              <el-col :span="5">
                <div class="grid-content bg-purple-light">{{item.price}}</div>
              </el-col>
              <el-col :span="5">
                <div class="grid-content bg-purple">{{item.info}}</div>
              </el-col>
              <el-col :span="5">
                <div class="grid-content bg-purple-light">{{item.sold}}</div>
              </el-col>

              <!-- 删除按钮 -->
              <el-col :span="4">
                <div>
                  <el-button type="success" @click="indexData=index;dialogVisible = true">删除</el-button>
                  <el-dialog
                    title="删除确认"
                    :visible.sync="dialogVisible"
                    width="30%"
                    :before-close="handleClose"
                  >
                    <el-button type="success" @click="deleteOder(listForm[indexData].goodid)">确认删除</el-button>
                    <el-button type="warning">取消删除</el-button>
                  </el-dialog>
                </div>
              </el-col>
            </div>
          </el-row>
        </li>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  data() {
    return {
      drawer: false,
      dialogVisible: false,
      userid: this.$route.query.userid,
      username: this.$route.query.username,
      buyid: "",
      indexData:'',
      listForm: this.$axios({
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        method: "post",
        url: "api/listuserGoods",
        data: this.$qs.stringify({ userid: this.$route.query.userid })
      })
        .then(res => {
          this.listForm = res.data;
        })
        .catch(Error => {
          console.log(Error);
        })
    };
  },
  methods: {
    deleteOder(id) {
      this.$axios({
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        method: "post",
        url: "api/deleteGood",
        data: this.$qs.stringify({ goodid: id })
      })
        .then(res => {
          console.log(res.data);
          this.dialogVisible=false;
        })
        .catch(Error => {
          console.log(Error);
        });
    },
    //登出
    loginOut() {
      //防止路由记录
      this.userid = "";
      this.username = "";
      this.$router.push("/");
    },
    returnHome() {
      this.$router.push({
        name: "Home",
        query: {
          username: this.username,
          userid: this.userid
        }
      });
    }
  }
};
</script>


<style>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.publish-button {
  margin-right: 15px;
  font-size: 30px;
  font-weight: bold;
}
.el-row {
  margin-bottom: 20px;
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 50 px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
