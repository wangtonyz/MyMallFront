<template>
  <el-container>

    <el-header >
      用户:{{username}}
    </el-header>

    <el-container>
      <el-aside width="200px">
        <template>
         <el-row class="tac">
          <el-col :span="24">
          <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
          unique-opened
          router
           background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
            <el-menu-item @click="createOrder()">创建商品</el-menu-item>
            <el-menu-item @click="checkOrder()">查看订单</el-menu-item>
            <el-menu-item @click="loginOut()">退出</el-menu-item>
         </el-menu>
         </el-col>
        </el-row>
        </template>
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
            <div style="text-align:center">库存</div>
          </el-col>
        </el-row>
        <!-- 列表 -->
        <li v-for="(item,index) in listForm" :key="item" >
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
              <!-- 详情按钮 -->
              <el-col :span="2" >
                <div>
                  <el-button type="primary" @click="indexData=index;drawer = true">详情</el-button>
                  <el-drawer
                    title="商品详情"
                    :visible.sync="drawer"
                    :direction="direction"
                    :before-close="handleClose"
                  >
                    <el-form :model="form">
                      <el-form-item label="商品名称: " :label-width="formLabelWidth">{{listForm[indexData].name}}</el-form-item>
                      <el-form-item label="价格: " :label-width="formLabelWidth">{{listForm[indexData].price}}</el-form-item>
                      <el-form-item label="详情: " :label-width="formLabelWidth">{{listForm[indexData].info}}</el-form-item>
                      <el-form-item label="是否售出: " :label-width="formLabelWidth">{{listForm[indexData].sold}}</el-form-item>
                    </el-form>
                  </el-drawer>
                </div>
              </el-col>
              <!-- 购买按钮 -->
              <el-col :span="2" >
                <div>
                  <el-button type="success" @click="indexData=index;dialogVisible = true">购买</el-button>
                  <el-dialog
                    title="购买确认"
                    :visible.sync="dialogVisible"
                    width="30%"
                    :before-close="handleClose"
                  >
                  商品: {{listForm[indexData].goodname}}<br>
                  价格: {{listForm[indexData].price}}<br>
                    <el-button type="success" @click="onBuy(listForm[indexData].goodid)">确认购买</el-button>
                    <el-button type="warning">取消购买</el-button>
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

      indexData:'0',
      listForm: this.$axios({
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        method: "get",
        url: "api/listGoods"
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

    onBuy(id) {
      this.$axios({
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        method: "POST",
        url: "api/selloutGood",
        data: this.$qs.stringify({ goodid: id })
      })
        .then(res => {
          console.log(res.data);
          if (res.data == true) {
            this.$alert("购买成功", "提示", {
              confirmButtonText: "确定"
            });
            this.$router.push({
              name: "Home",
              query: {
                username: this.username,
                userid: this.userid
              }
            });
            this.dialogVisible = false;
          } else {
            this.$alert("购买失败请重试", "提示", {
              confirmButtonText: "确定"
            });
            this.dialogVisible = false;
          }
        })
        .catch(Error => {
          this.$alert("购买失败请重试", "提示", {
            confirmButtonText: "确定"
          });
          console.log(Error);
        });
    },
    loginOut() {
      this.userid = "";
      this.username = "";
      this.$router.push("/");
    },

    createOrder() {
      this.$router.push({
        name: "CreateOrder",
        query: {
          username: this.username,
          userid: this.userid
        }
      });
    },


    checkOrder() {
      this.$router.push({
        name: "CheckOrder",
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
  background-color: #2450a8;
}
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }
</style>
