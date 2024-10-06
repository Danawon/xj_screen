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
            <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
        </div>
        <!-- 页面数据展示 -->
        <div class="cardBox" v-loading="loading">
            <div v-for="item, k in cardList" :key="k">
                <b>{{ item.name }}</b>
                <p><b>{{ count[item.field] || '---' }}</b>{{ count[item.field] && count[item.field] != '---' ? item.unit : '' }}</p>
            </div>
        </div>
    </div>
</template>
  
<script>
    import { getStoreData } from '@/api/detail';
    export default {
    data () {
        return {
            dateValue: '',
            loading: false,
            cardList: [
                {name: '运动干预初评人数', field: 'interventionNumberA', unit: '人'},
                {name: '运动干预复评人数', field: 'interventionNumberB', unit: '人'},
                {name: '运动处方覆盖人数', field: 'prescriptionNumber', unit: '人'},
                {name: '干预效果有效人数', field: 'effectNumber', unit: '人'},
                {name: '运动打卡每周人均次数', field: 'weeklySportNumber', unit: '次'},
                {name: '运动打卡每周人均有效时长', field: 'weeklySportAvgDuration', unit: '分钟'},
                {name: '体脂下降总人数', field: '', unit: '人'},
                {name: '体脂下降人数占比', field: 'totalBodyFatDecrease', unit: '%'},
                {name: '体脂下降总重量', field: 'bodyFatReductionPercentage', unit: 'KG'},
                {name: '体脂下降人均重量', field: 'totalBodyFatReduction', unit: 'KG'},
                {name: 'BMI下降总人数', field: 'averageBodyFatReductionPerPerson', unit: '人'},
                {name: 'BMI人数下降占比', field: 'averageBMIDecreasePerPerson', unit: '%'},
                {name: 'BMI下降人均数值', field: 'totalPeopleWithFourHighsReduction', unit: '㎡/kg'},
                {name: '四高指标下降总人数', field: 'percentageOfPeopleImprovedCardioEndurance', unit: '人'},
                {name: '四高指标下降人数占比', field: 'numberOfPeopleImprovedCardioEndurance', unit: '%'},
                {name: '心肺耐力值提升人数', field: 'totalCholesterolDecrease', unit: '人'},
                {name: '总胆固醇下降人数', field: '', unit: '人'},
                {name: '总胆固醇人均下降值', field: 'averageCholesterolDecreasePerPerson', unit: 'mmol/l'},
                {name: '低密度脂蛋白下降人数', field: 'averageLDLDecreasePerPerson', unit: '人'},
                {name: '低密度脂蛋白人均下降值', field: 'totalTriglycerideDecrease', unit: 'mmol/l'},
                {name: '甘油三酯下降人数', field: 'averageTriglycerideDecreasePerPerson', unit: '人'},
                {name: '甘油三酯人均下降值', field: 'totalHDLDecrease', unit: 'mmol/l'},
                {name: '高密度脂蛋白提升人数', field: 'averageHDLDecreasePerPerson', unit: '人'},
                {name: '高密度脂蛋白人均提升值', field: '', unit: 'mmol/l'},
                {name: '空腹血糖下降人数', field: 'totalFastingBloodGlucoseDecrease', unit: '人'},
                {name: '空腹血糖人均降值', field: 'averageFastingBloodGlucoseDecreasePerPerson', unit: 'mmol/l'},
                {name: '收缩压下降人数', field: 'totalSystolicDecrease', unit: '人'},
                {name: '收缩压人均下降值', field: 'averageSystolicDecreasePerPerson', unit: 'mmHg'},
                {name: '舒张压下降人数', field: 'totalDiastolicDecrease', unit: '人'},
                {name: '舒张压人均下降值', field: 'averageDiastolicDecreasePerPerson', unit: 'mmHg'},
                {name: '尿酸下降人数', field: 'totalUricAcidDecrease', unit: '人'},
                {name: '尿酸人均下降值', field: 'averageUricAcidDecreasePerPerson', unit: 'mmol/l'},
                {name: '腰围下降人数', field: 'totalWaistCircumferenceDecrease', unit: '人'},
                {name: '腰围人均下降值', field: 'averageWaistCircumferenceDecreasePerPerson', unit: 'CM'}
            ],
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
            count: {}
        }
    },
    created() {
        this.getPage()
    },
    methods: {
        // 点击搜索
        search() {
            let obj = {}
            if(this.dateValue) obj.wheretime = this.dateValue.join(',')
            this.getPage(obj)
        },
        // 获取页面数据
        async getPage(params = {}) {
            this.loading = true
            this.count = await getStoreData({store_id: this.$route.query.id, ...params})
            setTimeout(() => {
                this.loading = false
            }, 200)
        }
    }
}
</script>

<style lang='less' scoped>
@font-face {
  font-family: 'bahnschrift';
  src: url('../../assets/fonts/bahnschrift.ttf'),
}
.cardBox {
    display: flex;
    flex-wrap: wrap;
    gap: 25px;
    > div {
        background: #fff;
        box-shadow: 0 1px 10px 0 rgba(0, 0, 0, .05);
        width: 200px;
        padding: 20px;
        border-radius: 5px;
        color: #777;
        p {
            margin-top: 5px;
            color: #666;
            b {
                font-size: 36px;
                color: #00AAFF;
                font-family: bahnschrift;
                padding-right: 5px;
            }
        }
    }
}
</style>