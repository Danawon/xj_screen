<template>
  <div class='page'>
    <!-- 顶部英文字和数字背景 -->
    <img src="../../assets/Img/word.png">
    <div class='animate__animated animate__fadeInDownBig' >
      <img style='--animate-duration: 10s' class="animate__animated animate__pulse animate__infinite" src="../../assets/Img/num_bg.png" width="100%">
    </div>
    <!-- 页面中间登录内容 -->
    <div class="main-content">
      <p>湘江新区医体融合智慧质控中心<span class='animate__animated animate__flash animate__infinite' style='--animate-duration: 10s' /></p>
      <el-form class='login_form' size="small">
        <el-form-item label='账号：' required>
          <el-input v-model.trim="formData.account" placeholder="请输入账号" />
        </el-form-item>
        <el-form-item label='密码：' required>
          <el-input v-model.trim="formData.password" placeholder="请输入密码" :type='passwordType ? "password" : "text"'>
            <i class="el-icon-view" slot="suffix" @click.stop='passwordType = !passwordType' />
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button class='btn' :loading="loading" @click="submitForm">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 底部悬浮按钮动画 -->
    <ul>
      <li class='animate__animated animate__shakeX animate__infinite'>
        <img src="../../assets/Img/xiaofangshuan_icon.png" alt="">
      </li>
      <li class='animate__animated animate__shakeY animate__infinite animate__delay-1s'>
        <img src="../../assets/Img/shexiangtou_icon.png" alt="">
      </li>
      <li class='animate__animated animate__shakeX animate__infinite'>
        <img src="../../assets/Img/yun_icon.png" alt="">
      </li>
      <li class='animate__animated animate__shakeY animate__infinite animate__delay-2s'>
        <img src="../../assets/Img/baojingqi_icon.png" alt="">
      </li>
      <li class='animate__animated animate__shakeX animate__infinite'>
        <img src="../../assets/Img/mokuai_icon.png" alt="">
      </li>
      <li class='animate__animated animate__shakeY animate__infinite animate__delay-3s'>
        <img src="../../assets/Img/zhuji_icon.png" alt="">
      </li>
    </ul>
    <!-- 备案号 -->
     <p class="recordNumber" v-html="recordNumber" />
  </div>
</template>

<script>
import { login, getConfig } from '@/api';
export default {
  data () {
    return {
      passwordType: true,
      loading: false,
      recordNumber: '',
      formData: {}
    }
  },
  created() {
    this.getRecord()
  },
  mounted () {
   // 监听回车事件
   window.addEventListener('keyup', (event) => {
      if (event.key === 'Enter') {
        this.submitForm()
      }
    })
  },
  beforeDestroy() {
    // 清理监听器
    window.removeEventListener('keyup', () => {});
  },
  methods: {
    // 获取备案号
    getRecord() {
      const domain = window.location.hostname
      getConfig({ domain }).then(res => {
        localStorage.setItem('screenTitle', res.title)
        this.recordNumber = res.filing
      })
    },
    // 登录
    submitForm() {
      if(!this.formData.account || !this.formData.password) {
        this.$message.error('请填写完整数据！');
        return
      }
      login(this.formData).then(res => {
        localStorage.setItem('screenView', res.is_view_data)
        sessionStorage.setItem('screenToken', res.token)
        this.$router.push('/')
      })
    }
  }
}
</script>

<style lang='less' scoped>
@import '../../assets/css/animate.css';
.page {
  width: 100%;
  height: 100vh;
  background: url('../../assets/Img/login_bg.png') bottom no-repeat;
  background-size: cover;
  position: fixed;
  & > img {
    position: fixed;
    top: 20%;
    left: 50%;
    max-width: 100%;
    transform: translate(-50%,-50%);
  }
}
.main-content {
  position: fixed;
  top: 25%;
  left: 50%;
  transform: translate(-50%,-50%);
  p {
    text-align: center;
    color: #fff;
    font-size: 45px;
    margin-bottom: 80px;
    letter-spacing: 20px;
    position: relative;
    white-space: nowrap;
  }
  p > span{
    position: absolute;
    width: 478px;
    height: 383px;
    top: -150px;
    left: -70px;
    background: url('../../assets/Img/sun.png') no-repeat;
    background-size: 100%;
  }
  .login_form {
    background: rgba(255, 255, 255, .1);
    padding: 40px;
    border-radius: 10px;
    position: absolute;
    left: 50%;
    transform: translate(-50%);
    width: 50%;
    /deep/ label{
      color:#fff;
    }
    /deep/ input{
      background: transparent;
      color:#fff;
      -webkit-tap-highlight-color: transparent;
    }
    .el-icon-view {
      cursor: pointer;
    }
  }
  .btn {
    background: 0;
    color: #fff;
    width: 100%;
    margin-top: 40px;
    position: relative;
  }
  .btn::after {
    content: "";
    width: 0;
    height: 30px;
    position: absolute;
    top: 0;
    left: 50%;
    line-height: 30px;
    transition: all .6s;
    background: #000000;
    background: -moz-linear-gradient(left, #5f79ea 40%, #17dacd 100%);
    background: -webkit-gradient(linear, left,right,color-stop(0%,#5f79ea),color-stop(100%,#17dacd));
    background: -webkit-linear-gradient(top, #5f79ea 0%,#17dacd 100%);
    background: -o-linear-gradient(left, #5f79ea 0%,#17dacd 100%);
    background: -ms-linear-gradient(left, #5f79ea 0%,#17dacd 100%);
    background: linear-gradient(to right, #5f79ea 0%,#17dacd 100%);
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#5f79ea', endColorstr='#17dacd',GradientType=0 );
  }
  .btn:hover::after {
    content: "登录";
    line-height: 30px;
    left: 0;
    width: 100%;
  }
}
ul {
  display: flex;
  position: absolute;
  justify-content: space-around;
  bottom: 10%;
  left: 10%;
  width: 80%;
  li{
    position: relative;
    --animate-duration: 25s;
  }
  li:first-child{
    top: 80px;
  }
  li:nth-child(3){
    top: -80px;
  }
  li:nth-child(4){
    top: -20px;
  }
  li:nth-child(6){
    top: 80px;
  }
}
.recordNumber {
  position: absolute;
  text-align: center;
  width: 100%;
  bottom: 2%;
  /deep/ a {
    color: #fff;
    text-decoration: none;
  }
}
</style>
