<template>
  <screen-adapter>
    <div class="page">
      <div class="title">湘江新区医体融合智慧质控中心</div>
      <!-- 时间和天气 -->
      <div class="head">
        <div class="time">
          <b>{{ time[1] }}</b>
          <p>{{ time[0] }}</p>
        </div>
        <div class="weather">
          <img v-if="weather.image" :src="weather.image" style="width: 28px;">
          <img v-else="weather.weather == '晴'" src="@/assets/Img/icon_sun.png">
          <img src="@/assets/Img/icon_heat.png" style="margin: 0 8px 0 6px;">
          <span>{{ weather.temperature || 0 }}℃</span>
        </div>
      </div>
      <!-- 主体内容 -->
      <div class="contentWrap">
        <!-- 左侧内容 -->
        <div style="width: 30.684%">
          <div class="s_title">
            <i>社区医院运动干预数据统计排名</i>
            <img src="@/assets/Img/title_bg.png" />
          </div>
          <div class="box-bg" style="height: 840px;">
            <div class="tabs">
              <div>
                <span v-for="item, k in tabs" :key="k" @click="activeIndex = k" :class="activeIndex == k && 'active'">
                  {{ item }}
                </span>
                <img src="@/assets/Img/tab_btn.png" :style="{'transform': `translateX(${activeIndex * 100}%)`}" />
              </div>
            </div>
            <div class="rank">
              <div class="tb_th">
                <div>排名</div><div>名称</div><div>{{tabs[activeIndex]}}占比</div><div>数量</div>
              </div>
              <div class="tb_tr" v-for="item, k in rankList[activeIndex]" :key="k">
                <div class="sort">
                  <template v-if="k < 3">
                    <img v-if="k == 0" src="@/assets/Img/rank_one.png" />
                    <img v-if="k == 1" src="@/assets/Img/rank_two.png" />
                    <img v-if="k == 2" src="@/assets/Img/rank_three.png" />
                    <img src="@/assets/Img/rank_light.png" class="light" />
                  </template>
                  <span v-else>{{ k + 1 }}</span>
                </div>
                <div>{{ item.name }}</div>
                <div>
                  <el-progress style="width: 150px;" :percentage="changePer(item.percent)" :stroke-width="10" text-color="#fff" ref="progress" define-back-color="rgba(54,105,157,.4)" />
                </div>
                <div class="num">{{ item.number }}</div>
              </div>
            </div>
          </div>
        </div>
        <!-- 中间内容 -->
        <div style="width: 36.425%;">
          <!-- 统计数据 -->
          <div class="s_title">
            <i>整体项目运动干预统计数据</i>
            <img src="@/assets/Img/title_bg.png" />
          </div>
          <div class="box-bg statistics" style="height: 287px;">
            <div>
              <div class="countItem">
                <img src="@/assets/Img/icon_data_one.png" />
                <div>
                  <i>运动处方覆盖总人数</i>
                  <p>{{ statistics.prescriptionNumber }}</p>
                </div>
              </div>
              <div class="countItem">
                <img src="@/assets/Img/icon_data_two.png" />
                <div>
                  <i>当天运动总人数</i>
                  <p>{{ statistics.todaySportNumber }}</p>
                </div>
              </div>
              <div class="countItem">
                <img src="@/assets/Img/icon_data_three.png" />
                <div>
                  <i>实时运动在线人数</i>
                  <p>{{ statistics.onlineSportNumber }}</p>
                </div>
              </div>
            </div>
            <div class="dataItem">
              <img src="@/assets/Img/icon_A.png" />
              运动干预初评人数:
              <b>{{ statistics.interventionNumberA }}</b>
            </div>
            <div class="dataItem" style="margin: 30px 0;">
              <img src="@/assets/Img/icon_B.png" />
              运动干预复评人数:
              <b>{{ statistics.interventionNumberB }}</b>
            </div>
            <div class="dataItem">
              <img src="@/assets/Img/icon_time.png" />
              运动打卡上周达标人数:
              <b>{{ statistics.weekSportNumber }}</b>
            </div>
          </div>
          <!-- 效果数据 -->
          <div class="s_title" style="margin-top: 20px;">
            <i>整体项目运动干预效果数据</i>
            <img src="@/assets/Img/title_bg.png" />
          </div>
          <div class="box-bg effect" style="height: 454px;">
            <div>
              <div class="countItem">
                <img src="@/assets/Img/icon_data_one.png" />
                <div>
                  <i>脂肪下降总人数：{{ effect.totalPeopleWithFatReduction }}{{ effect.totalBodyFatDecrease != '---' ? '人' : '' }}</i>
                  <div>共减脂肪<p>{{ effect.totalBodyFatReduction }}</p>kg</div>
                </div>
              </div>
              <div class="countItem">
                <img src="@/assets/Img/icon_data_two.png" />
                <div>
                  <i>BMI下降总人数：{{ effect.totalBodyFatDecrease }}{{ effect.totalBodyFatDecrease != '---' ? '人' : '' }}</i>
                  <div>人均下降<p>{{ effect.averageBodyFatReductionPerPerson }}</p>㎡/kg</div>
                </div>
              </div>
            </div>
            <!-- <div class="dataItem" style="margin-bottom: 20px;">
              <img src="@/assets/Img/icon_A.png" />
              心肺耐力值提升人数:
              <b>{{ effect.numberOfPeopleImprovedCardioEndurance }}</b>
            </div> -->
            <div class="dataItem" style="margin: 25px 0;">
              <img src="@/assets/Img/icon_B.png" />
              四高指标下降总人数:
              <b>{{ effect.totalPeopleWithFourHighsReduction }}</b>
            </div>
            <p class="chartTitle">
              <img src="@/assets/Img/line_title_icon.png" />
              <i>运动干预人数趋势图</i>
            </p>
            <div ref="chart" style="height: 246px;" />
          </div>
        </div>
        <!-- 右侧内容 -->
        <div style="width: 30.684%">
          <div class="s_title">
            <i>社区医院运动干预效果数据</i>
            <img src="@/assets/Img/title_bg.png" />
          </div>
          <div class="box-bg" style="height: 840px;">
            <div class="listTitle">
              <div class="up" @click="changeData('up')" />
              <span @click="toViewDetail(hospital.store_id)">{{ hospital.store_name }}</span>
              <div class="down" @click="changeData('down')" />
            </div>
            <div class="listItem" v-for="item, k in hpField" :key="k">
              <img src="@/assets/Img/list_icon.png" />
              {{ item.text }}
              <b>{{ hospital[item.name] }}</b>
              <span v-if="hospital[item.name] != '---'">{{ item.unit }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </screen-adapter>
</template>

<script>
import ScreenAdapter from '@/components/ScreenAdapter';
import {getRank, getStatistics, getEffect, getHospital, getWeather} from '@/api';
const echarts = require('echarts/lib/echarts');
require('echarts/lib/chart/line');
require('echarts/lib/component/tooltip');
require('echarts/lib/component/grid');
require('echarts/lib/component/legend');
export default {
  components: { ScreenAdapter },
  data() {
    return {
      tabs: [],
      rankList: [],
      activeIndex: 0,
      statistics: {},
      effect: {},
      hospital: {},
      hpIndex: 0,
      hpField: [
        {name: 'interventionNumberA', text: '运动干预初评人数', unit: '人'},
        {name: 'interventionNumberB', text: '运动干预复评人数', unit: '人'},
        {name: 'prescriptionNumber', text: '运动处方覆盖人数', unit: '人'},
        {name: 'effectNumber', text: '干预效果有效人数', unit: '人'},
        {name: 'weeklySportNumber', text: '运动打卡每周人均次数', unit: '次'},
        {name: 'weeklySportAvgDuration', text: '运动打卡每周人均有效时长', unit: '分钟'},
        {name: 'totalBodyFatDecrease', text: '体脂下降总人数', unit: '人'},
        {name: 'bodyFatReductionPercentage', text: '体脂下降人数占比', unit: '%'},
        {name: 'totalBodyFatReduction', text: '体脂下降总重量', unit: 'kg'},
        {name: 'averageBodyFatReductionPerPerson', text: '体脂下降人均重量', unit: 'kg'},
        {name: 'totalBMIDecrease', text: 'BMI下降总人数', unit: '人'},
        {name: 'BMIReductionPercentage', text: 'BMI人数下降占比', unit: '%'},
        {name: 'averageBMIDecreasePerPerson', text: 'BMI下降人均数值', unit: '㎡/kg'},
        {name: 'totalPeopleWithFourHighsReduction', text: '四高指标下降总人数', unit: '人'},
        {name: 'percentageOfPeopleImprovedCardioEndurance', text: '四高指标下降人数占比', unit: '%'},
      ],
      chart: null,
      lineChartsData: {},
      listInterval: null,
      rightListInterval: null,
      timeInterval: null,
      weatherInterval: null,
      totalInterval: null,
      tabInterval: null,
      toolTipInterval: null,
      time: null,
      weather: {}
    }
  },
  wacth: {
    // 当用户手动切换，重新开始轮询
    activeIndex() {
      this.tabInterval && clearInterval(this.tabInterval);
      this.tabLoop()
    }
  },
  mounted() {
    this.initChart()
  },
  created() {
    // 1s左上角时间
    this.time = this.formatDate()
    this.timeInterval = setInterval(() => {
      this.time = this.formatDate()
    }, 1000);
    // 30m获取天气
    this.getWeather()
    this.weatherInterval = setInterval(() => {
      this.getWeather()
    }, 60000 * 30);
    // 左侧tab轮询
    this.tabLoop()
    // 20s轮询左列表数据
    this.getList()
    this.listInterval = setInterval(() => {
      this.getList()
    }, 20000)
    // 5s轮询中间统计数据
    this.getTotal()
    this.totalInterval = setInterval(() => {
      this.getTotal()
    }, 5000)
    // 右侧列表数据轮询
    this.changeData()
  },
  beforeDestroy() {
    this.listInterval && clearInterval(this.listInterval);
    this.totalInterval && clearInterval(this.totalInterval);
    this.timeInterval && clearInterval(this.timeInterval);
    this.weatherInterval && clearInterval(this.weatherInterval);
    this.tabInterval && clearInterval(this.tabInterval);
    this.rightListInterval && clearInterval(this.rightListInterval);
    this.toolTipInterval && clearInterval(this.toolTipInterval);
  },
  methods: {
    // 右侧门店切换
    changeData(type) {
      const params = {}
      if(type) {
        this.rightListInterval && clearInterval(this.rightListInterval);
        params.store_id = this.hospital.store_id
        params.switch = type
      }
      this.getRightList(params)
      this.rightListInterval = setInterval(() => {
        this.getRightList()
      }, 10000)
    },
    // 获取社区医院运动干预效果数据
    getRightList(params = {}) {
      getHospital(params).then(res => {
        this.hospital = res
      })
    },
    // 左侧tab每隔5s自动切换
    tabLoop() {
      this.tabInterval = setInterval(() => {
        if(this.activeIndex == this.tabs.length - 1) {
          this.activeIndex = 0
        } else {
          this.activeIndex++
        }
      }, 5000)
    },
    // 获取天气
    getWeather() {
      getWeather().then(res => {
        this.weather = res
      })
    },
    // 获取当前时间格式化
    formatDate() {
      let date = new Date();
      let Y = date.getFullYear() + '-';
      let M = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) + '-' : date.getMonth() + 1 + '-';
      let D = date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate() + ' ';
      let h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() + ':';
      let m = date.getMinutes()  < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes() + ':';
      let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
      return [Y + M + D, h + m + s];
    },
    // 小数点数据格式化 
    changePer(data) {
      const _data = Number(data.toFixed(1))
      return Number.isInteger(_data) ? Number(data.toFixed(0)) : _data
    },
    // 整体项目运动干预统计数据、整体项目运动干预效果数据
    getTotal() {
      // 统计数据
      getStatistics().then(res => {
        this.statistics = res
      })
      // 效果数据
      getEffect().then(res => {
        this.lineChartsData = res.sportInterventionTrendData
        this.drawLineChart()
        this.effect = res
      })
    },
    // 社区医院运动干预数据统计排名
    getList() {
      getRank().then(res => {
        const tabs = [], list = []
        res.map(item => {
          tabs.push(item.name)
          list.push(item.storeList)
        })
        this.tabs = tabs
        this.rankList = list
      })
    },
    // 初始化折线图配置项
    initChart() {
      this.chart = echarts.init(this.$refs.chart)
      const legenData = ['初评人数','复评人数','运动处方人数','有效运动时长达标人数']
      const color = ['20,70,188', '66,170,211', '201,168,81', '56,159,149']
      let option = {
        legend: {
          orient: 'horizontal',
          left: 'center',
          bottom: 0,
          padding: 0,
          itemGap: 20,
          data: legenData,
          itemHeight: 18,
          textStyle: { color: '#FFFFFF' }
        },
        grid: { 
          containLabel: true,
          left: 0,
          top: 15,
          right: 0,
          bottom: 34,
        },
        tooltip: { 
          trigger: 'axis',
          triggerOn: 'click',
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
          borderWidth: 0,
          textStyle: {
            color: '#000',
            fontWeight: 'bold'
          }
        },
        xAxis: {
          data: [],
          axisTick: { show: false },
          axisLabel: { color: '#B4C5D4'},
          axisLine: {
            lineStyle: {
              color: '#506578'
            }
          }
        },
        yAxis: {
          axisLabel: { color: '#96A6B5' },
          splitLine: {
            show: true,
            lineStyle: {
              color: '#283F57',
              type: 'dashed'
            }
          }
        }
      }
      let series = []
      legenData.map((item, k) => {
        let _series = {
          name: item,
          type: 'line',
          symbolSize: ['18', '18'],
          symbol:'image://'+ require(`../../assets/Img/line_icon_${k}.png`),
          data: [],
          itemStyle: { color: `rgb(${color[k]})` },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 1,
              x2: 0,
              y2: 0,
              colorStops: [
                {offset: 0, color: 'transparent'},
                {offset: 1, color: `rgba(${color[k]}, .33)`}
              ]
            }
          }
        }
        series.push(_series)
      })
      option.series = series
      this.chart.setOption(option)
      // 鼠标悬浮
      let xIndex = 0
      this.chart.getZr().on('click', (params) => {
        let pointInPixel = [params.offsetX, params.offsetY];
        if (this.chart.containPixel('grid', pointInPixel)) {
          this.toolTipInterval && clearInterval(this.toolTipInterval);
          this.toolTipInterval = 0
          let pointInGrid = this.chart.convertFromPixel({ seriesIndex: 0 }, pointInPixel);
          xIndex = pointInGrid[0];
        }
      });
      // 鼠标移开
      this.chart.on('globalout', () => {
        this.toolTipInterval === 0 && this.toolTipLoop(xIndex)
      });
    },
    // 数据变化重绘折线图
    drawLineChart() {
      const field = ['initialEvaluation', 'reassessment', 'sportPrescription', 'effectiveSportDuration']
      let option = {
        xAxis: {
          data: this.lineChartsData.months
        },
        series: []
      }
      field.map(item => {
        option.series.push({
          data: this.lineChartsData.data[item]
        })
      })
      this.chart.setOption(option)
      this.toolTipInterval === null && this.toolTipLoop(0)
    },
    // 图标提示框循环
    toolTipLoop(dataIndex) {
      this.chart.dispatchAction({
        type: 'showTip',
        seriesIndex: 0,
        dataIndex
      });
      const dataLen = this.lineChartsData.months.length
      dataIndex = dataIndex == dataLen - 1 ? 0 : dataIndex + 1
      this.toolTipInterval = setInterval(() => {
        this.chart.dispatchAction({
          type: 'showTip',
          seriesIndex: 0,
          dataIndex
        });
        dataIndex++
        if(dataIndex >= dataLen) dataIndex = 0
      }, 5000)
    },
    // 跳转详情页面
    toViewDetail(id) {
      const screenView = localStorage.getItem('screenView')
      if(!screenView || screenView == 'false') return
      this.$router.push({
        path: '/home/summary', 
        query: { id }
      })
    }
  }
}
</script>

<style lang='less' scoped>
@font-face {
  font-family: 'YouSheBiaoTiHei';
  src: url('../../assets/fonts/ysbthzt.ttf'),
}
@font-face {
  font-family: 'bahnschrift';
  src: url('../../assets/fonts/bahnschrift.ttf'),
}
@font-face {
  font-family: 'ShiShangZhongHeiJianTi';
  src: url('../../assets/fonts/ShiShangZhongHeiJianTi.ttf'),
}
@font-face {
  font-family: 'AlibabaPuHuiTi';
  src: url('../../assets/fonts/AlibabaPuHuiTi-3-55-Regular.ttf'),
}
@font-face {
  font-family: 'AlibabaPuHuiTiB';
  src: url('../../assets/fonts/AlibabaPuHuiTi-3-85-Bold.ttf'),
}
.flex-layout(@display: flex, @align: stretch, @justify: flex-start) {
  display: @display;
  justify-content: @justify;
  align-items: @align;
}
.font-style(@size, @family) {
  font-family: @family;
  font-size: @size;
}
.text-clip(@h, @color1, @color2) {
  background: linear-gradient(0deg, @color1 0%, @color2 100%);
  line-height: @h;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.page {
  width: 100%;
  min-height: 100vh;
  max-height: 100%;
  background: #021124 url('../../assets/Img/home_border.png') center no-repeat;
  background-size: 100% 100%;
  padding: 12px 54px 48px 54px;
  line-height: 1;
  box-sizing: border-box;
  color: #fff;
  font-family: 'AlibabaPuHuiTi';
}
.title {
  .font-style(42px, YouSheBiaoTiHei);
  text-shadow: 0px 2px 3px rgba(17,20,22,0.31);
  text-align: center;
}
.head {
  .flex-layout(flex, center ,space-between);
  margin-top: -7px;
  .time {
    width: 90px;
    text-align: right;
    .font-style(18px, bahnschrift);
    p {
      margin-top: 2px;
    }
    b {
      font-size: 26px;
      letter-spacing: 2px;
    }
  }
  .weather {
    .flex-layout(@align: center);
    .font-style(24px, ShiShangZhongHeiJianTi);
    letter-spacing: 3px;
  }
}
.contentWrap {
  display: flex;
  gap: 20px;
  margin-top: 16px;
}
.s_title {
  .font-style(22px, AlibabaPuHuiTiB);
  position: relative;
  padding: 0 0 15px 44px;
  i {
    position: relative;
    z-index: 2;
    display: inline-block;
    .text-clip(1, #B9E8FF, #F9FEFF)
  }
  img {
    position: absolute;
    left: -22px;
    z-index: 1;
    bottom: 0;
    width: calc(100% + 22px);
    height: 121.4%;
  }
}
.box-bg {
  padding: 20px;
  background: rgba(11, 47, 84, 0.38);
  border: 1px solid #213C55;
}
.tabs {
  padding: 4px 10px;
  background: url('../../assets/Img/tab_bg.png') no-repeat;
  background-size: 100% 100%;
  font-size: 12px;
  span, img {
    width: 25%;
    height: 41px;
    line-height: 41px;
  }
  > div, span {
    position: relative;
  }
  span {
    display: inline-block;
    color: #C9ECFF;
    text-align: center;
    cursor: pointer;
    z-index: 2;
    &.active {
      color: #FDFFFF;
      font-size: 13px;
      text-shadow: 0px 4px 6px rgba(2,41,62,0.84);
    }
  }
  img {
    position: absolute;
    left: 0;
    transition: .3s cubic-bezier(.645,.045,.355,1);
    z-index: 1;
  }
}
.rank {
  font-size: 14px;
  margin-top: 20px;
  .tb_th, .tb_tr {
    .flex-layout(@align: center);
    > div {
      &:first-child {
        width: 15.5%;
        text-align: center;
      }
      &:nth-child(2) {
        width: 37.21%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        word-break: break-all;
        padding-right: 10px;
        box-sizing: border-box;
      }
      &:nth-child(3) {
        width: 35.65%;
      }
    }
  }
  .tb_th {
    color: #A5C5D8;
    padding: 12px 0;
    background: rgba(11,47,84,0.38);
    border: 1px solid #213C55;
  }
  .tb_tr {
    height: 52px;
    background: rgba(26,67,124,0.2);
    box-shadow: 0px 1px 0px 0px rgba(86,132,183,0.2);
    span, .num {
      font-family: Bahnschrift;
    }
    .num {
      font-size: 22px;
      color: #00AAFF;
    }
  }
  .sort {
    position: relative;
    span {
      font-size: 18px;
      color: #A5B2C8;
      display: inline-block;
      width: 29px;
      height: 29px;
      line-height: 29px;
      background: linear-gradient(0deg, #324968, #3D577D);
      border-radius: 50%;
    }
    .light {
      position: absolute;
      left: 5px;
      top: -20%;
    }
  }
  /deep/ .el-progress-bar__inner {
    background: linear-gradient(90deg, #00A9FF 0%, #01F0FF 100%);
  }
  /deep/ .el-progress__text {
    font-size: 14px !important;
  }
}
.countItem {
  .flex-layout(@align: center);
  i {
    font-size: 14px;
    background: linear-gradient(90deg, rgba(2,52,80,0) 0%, rgba(32,82,121,0.99) 50%, rgba(1,42,66,0.05) 97%);
    padding: 8px 0;
    display: inline-block;
    min-width: 134px;
    text-align: center;
  }
  p {
    .font-style(29px, Bahnschrift);
    .text-clip(20px, #A3EAFF, #FFFFFF);
    font-weight: bold;
    margin: 6px 0 0 9px;
  }
}
.statistics > div:first-child {
  .flex-layout(@justify: space-between);
  margin-bottom: 25px;
}
.effect > div:first-child {
  .flex-layout(@justify: space-between);
  margin-bottom: 20px;
  .countItem {
    img {
      margin-right: 10px;
    }
    div {
      margin-top: 6px;
    }
  }
  p {
    display: inline-block;
    margin: 0 5px;
  }
  padding: 0 50px;
}
.rowItem {
  .flex-layout(@align: center);
  font-size: 16px;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  img {
    margin-right: 13px;
  }
  b {
    margin-left: auto;
    font-family: Bahnschrift;
    .text-clip(21px, #0B99F3, #FFFFFF);
  }
}
.dataItem:extend(.rowItem all) {
  padding: 0 20px 9px 18px;
  background-image: url('../../assets/Img/data_bg.png');
  b {
    font-size: 32px;
  }
}
.chartTitle {
  .font-style(16px, AlibabaPuHuiTiB);
  .flex-layout(@align: center);
  margin-top: 13px;
  i {
    margin-left: -9px;
  }
  img {
    margin-left: -13px;
  }
}
.listTitle {
  .font-style(18px, AlibabaPuHuiTiB);
  text-align: center;
  text-shadow: 0px 5px 1px #09254B;
  background: url('../../assets/Img/list_title.png') no-repeat;
  background-size: 100% 100%;
  padding: 20px 0;
  letter-spacing: 2px;
  margin: -3px 0 10px 0;
  position: relative;
  .up, .down, span {
    cursor: pointer;
  }
  .up, .down {
    position: absolute;
    height: 100%;
    bottom: 0;
    top: 0;
    margin: auto;
    width: 50px;
  }
  .down {
    right: 0;
  }
}
.listItem:extend(.rowItem all) {
  // padding: 12px 25px 12px 21px;
  padding: 12px 21px;
  background-image: url('../../assets/Img/list_bg.png');
  margin-top: 8px;
  b {
    font-size: 28px;
  }
  span {
    display: inline-block;
    width: 30px;
    font-size: 14px;
    padding-left: 5px;
  }
}
</style>