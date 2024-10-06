<template>
    <div class="home">
        <!-- 导航菜单栏 -->
        <div class="home_menu">
            <el-menu router :default-active="activeIndex" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
                <el-menu-item v-for="item, k in menu" :key="k" :index="item.url">
                    {{ item.name }}
                </el-menu-item>
            </el-menu>
        </div>
        <!-- 中间内容 -->
         <div class="home_main">
            <router-view />
         </div>
    </div>
</template>
  
<script>
    export default {
    data () {
        return {
            activeIndex: '',
            menu: [
                {name: '社区医院总结数据', url: `/home/summary?id=${this.$route.query.id}`},
                {name: '社区医院干预效果排名数据', url: `/home/rank?id=${this.$route.query.id}`},
                {name: '医生数据查询', url: `/home/doctor?id=${this.$route.query.id}`},
            ]
        }
    },
    created() {
        this.activeIndex = this.$route.fullPath
    },
    methods: {
    }
}
</script>

<style lang='less' scoped>
.home {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
 
  .home_menu {
    width: 260px;
    height: 100%;

    .el-menu {
      width: 100%;
      height: 100%;
    }
  }
 
  .home_main {
    width: calc(100% - 260px);
    height: 100%;
    padding: 30px;
    box-sizing: border-box;
    overflow-y: scroll;
    background: #FCFDFD;
  }
}
</style>
  