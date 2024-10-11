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
            :data="pageResult.data"
            border
            stripe
            :header-cell-style="{backgroundColor: '#f5f7fa', color: '#000'}"
            height="calc(100vh - 172px)"
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
        <!-- 分页 -->
        <el-pagination
            layout="total, sizes, prev, pager, next, jumper"
            @size-change="handleSizeChange"
            @current-change="refreshPageRequest"
            :current-page="pageRequest.page"
            :page-sizes="[10, 20, 50, 100, 200, 500, 1000]"
            :page-size="pageRequest.list_rows"
            :total="pageResult.total"
        />
    </div>
</template>
  
<script>
    import { getHospitalRank, getTypeList } from '@/api/detail';
    export default {
    data () {
        return {
            dateValue: '',
            type: 0,
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
                        const now = new Date();
                        const year = now.getFullYear();
                        const month = now.getMonth();
                        picker.$emit('pick', [new Date(year, month - 1, 1), new Date(year, month, 0)]);
                    }
                }, {
                    text: '最近三个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近一年',
                    onClick(picker) {
                        const now = new Date();
                        const year = now.getFullYear();
                        const month = now.getMonth();
                        const day = now.getDate();
                        picker.$emit('pick', [new Date(year-1, month, day), new Date(year, month, day)]);
                    }
                }]
            },
            typeName: '',
            typeList: [],
            pageRequest: {
                order: 'asc',
                store_id: this.$route.query.id,
                page: 1,
                list_rows: 20
            },
            pageResult: {}
        }
    },
   created() {
        // 获取所有类型
        getTypeList().then(res => {
            this.typeList = res
            this.getPage()
        })
    },
    methods: {
        // 排序
        handlesortchange({ order }) {
            this.pageRequest.order = order === "ascending" ? 'asc' : 'desc'
            this.getPage()
        },
        // 每页展示条数修改
        handleSizeChange(size) {
            this.pageRequest.list_rows = size
            this.getPage()
        },
        // 翻页
        refreshPageRequest(page) {
            this.pageRequest.page = page
            this.getPage()
        },
        // 获取页面数据
        async getPage() {
            const _type = this.typeList[this.type]
            this.typeName = _type.name + '（'+_type.unit+'）'
            this.loading = true
            this.pageRequest.wheretime = this.dateValue ? this.dateValue.join(',') : ''
            this.pageRequest.type = _type.value
            this.pageResult = await getHospitalRank(this.pageRequest)
            setTimeout(() => {
                this.loading = false
            }, 200)
        }
    }
}
</script>

<style lang='less' scoped>
.el-pagination {
    margin-top: 10px;
    width: fit-content;
    margin-left: auto;
}
</style>