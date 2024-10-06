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
            <el-select v-model="doctorId" placeholder="请选择医生" clearable>
                <el-option
                    v-for="item, k in doctorList"
                    :key="k"
                    :label="item.name"
                    :value="item.id"
                />
            </el-select>
            <el-button type="primary" icon="el-icon-search" @click="getPage">搜索</el-button>
        </div>
        <div v-loading="loading">
            <!-- 统计数据 -->
            <div class="cardBox">
                <div v-for="item, k in countList" :key="k">
                    {{ item.name }}
                    <p><b>{{ totalData[item.field] || 0 }}</b></p>
                </div>
            </div>
            <!-- 表格数据 -->
            <el-table 
                :data="tableData"
                border
                :header-cell-style="{backgroundColor: '#f5f7fa', color: '#000'}"
                height="calc(100vh - 314px)"
            >
                <el-table-column prop="name" align="center" label="患者名称" />
                <el-table-column prop="phone" label="电话" align="center" />
                <el-table-column align="center" label="体适能">
                    <template slot-scope="scope">
                        {{ scope.row.bodytest ? '完成' : '未完成' }}
                    </template>
                </el-table-column>
                <el-table-column align="center" label="心肺耐力">
                    <template slot-scope="scope">
                        {{ scope.row.ergometry_cycle ? '完成' : '未完成' }}
                    </template>
                </el-table-column>
                <el-table-column align="center" label="医疗数据">
                    <template slot-scope="scope">
                        {{ scope.row.edicaltest ? '完成' : '未完成' }}
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>
  
<script>
    import { getDoctorList, getDoctor } from '@/api/detail';
    export default {
    data () {
        return {
            dateValue: '',
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
            doctorId: '',
            doctorList: [],
            countList: [
                {name: '患者管理人数', field: 'patient_count'},
                {name: '体适能测评人数', field: 'bodytest'},
                {name: '体适能复评人数', field: 'bodytest_re'},
                {name: '心肺耐力初评人数', field: 'ergometry_cycle'},
                {name: '心肺耐力复评人数', field: 'ergometry_cycle_re'},
                {name: '医疗数据初填人数', field: 'edicaltest'},
                {name: '医疗数据复评人数', field: 'edicaltest_re'},
                {name: '管理人群运动总次数', field: 'sports'},
                {name: '管理人群有效分钟数', field: 'fa_burning'},
                {name: '管理人群力量次数', field: 'power'},
                {name: '管理人群干预有效人数', field: 'intervention'},
            ],
            totalData: {},
            tableData: []
        }
    },
    created() {
        getDoctorList().then(res => {
            this.doctorList = res
        })
        this.getPage()
    },
    methods: {
        // 获取页面数据
        async getPage() {
            this.loading = true
            await getDoctor({
                doctor_id: this.doctorId,
                wheretime: this.dateValue ? this.dateValue.join(',') : ''
            }).then(res => {
                this.totalData = res.data
                this.tableData = res.list
            })
            setTimeout(() => {
                this.loading = false
            }, 200)
        }
    }
}
</script>

<style lang='less' scoped>
.cardBox {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    margin-bottom: 20px;
    > div {
        box-shadow: 0px 0px 15px 0px rgba(0,0,0,0.05);
        cursor: pointer;
        background: #fff;
        width: 160px;
        padding: 10px;
        border-radius: 5px;
        color: #777;
        p {
            margin-top: 5px;
            color: #000;
            b {
                font-size: 20px;
            }
        }
    }
}
</style>