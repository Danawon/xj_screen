import request from '@/utils/request';

// 用户登录
export function login(data) {
    return request({
        url: 'visual/login',
        method: 'POST',
        data
    });
}

// 社区医院运动干预数据统计排名
export function getRank() {
    return request({
        url: 'visual/getInterventionData',
        method: 'get'
    });
}

// 整体项目运动干预统计数据
export function getStatistics() {
    return request({
        url: 'visual/getWholeStatisticalData',
        method: 'get'
    });
}

// 整体项目运动干预效果数据
export function getEffect() {
    return request({
        url: 'visual/getWholeEffectData',
        method: 'get'
    });
}

// 社区医院运动干预效果数据
export function getHospital(params) {
    return request({
        url: 'visual/getStoreInterventionData',
        method: 'get',
        params
    });
}

// 获取长沙天气
export function getWeather() {
    return request({
        url: 'visual/getWeather?city=430100',
        method: 'get'
    });
}

// 获取备案号
export function getConfig(params) {
    return request({
        url: 'visual/config',
        method: 'get',
        params
    });
}