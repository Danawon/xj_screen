<template>
    <div>
       <!-- 时间筛选条件 -->
       <div class="toolBox">
            <el-date-picker
                v-model="dateValue"
                type="daterange"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd"
                :picker-options="pickerOptions"
            />
            <el-select v-model="type" placeholder="请选择类型">
                <el-option
                    v-for="item, k in typeList"
                    :key="k"
                    :label="item.name"
                    :value="k"
                />
            </el-select>
            <el-button type="primary" icon="el-icon-search" @click="getPage()">搜索</el-button>
        </div>
        <!-- 表格数据 -->
        <el-table 
            v-loading="loading"
            :data="pageData"
            border
            stripe
            :header-cell-style="{backgroundColor: '#f5f7fa', color: '#000'}"
            height="calc(100vh - 130px)"
            @sort-change="handlesortchange"
        >
            <el-table-column sortable align="center" label="排序" width="80">
                <template slot-scope="scope">
                    {{ scope.$index + 1 }}
                </template>
            </el-table-column>
            <el-table-column prop="nickname" align="center" label="患者名称"/>
            <el-table-column prop="mobile" align="center" label="患者电话"/>
            <el-table-column prop="number" :label="typeName||'类型'" align="center" />
            <el-table-column prop="name" align="center" label="管理医生"/>
        </el-table>
    </div>
</template>
  
<script>
    import { getHospitalRank, getTypeList } from '@/api/detail';
    export default {
    data () {
        return {
            dateValue: '',
            type: null,
            loading: false,
            pickerOptions: {
                shortcuts: [{
                    text: '最近一周',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近一个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近三个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                        picker.$emit('pick', [start, end]);
                    }
                }]
            },
            typeName: '',
            typeList: [],
            pageData: [],
        }
    },
   created() {
        // 获取所有类型
        getTypeList().then(res => {
            this.typeList = res
        })
    },
    methods: {
        // 排序
        handlesortchange({ order }) {
            let asc = order === "ascending" ? 'asc' : 'desc'
            this.getPage(asc)
        },
        // 获取页面数据
        async getPage(order = 'asc') {
            if(this.type == null) return
            const _type = this.typeList[this.type]
            this.typeName = _type.name + '（'+_type.unit+'）'
            this.loading = true
            this.pageData = await getHospitalRank({
                store_id: this.$route.query.id,
                wheretime: this.dateValue ? this.dateValue.join(',') : '',
                type: _type.value,
                order
            })
            setTimeout(() => {
                this.loading = false
            }, 200)
        }
    }
}
</script>

<style lang='less' scoped>
</style>