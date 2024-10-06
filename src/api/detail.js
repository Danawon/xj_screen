import request from '@/utils/request';

// 获取门店完整干预数据
export function getStoreData(params) {
    return request({
        url: 'visual/getStoreInterventionDataAll',
        method: 'get',
        params
    });
}

// 医院干预效果排名
export function getHospitalRank(params) {
    return request({
        url: 'visual/getHospitalEffectRank',
        method: 'get',
        params
    });
}

// 医生数据查询
export function getDoctor(params) {
    return request({
        url: 'visual/getDoctorData',
        method: 'get',
        params
    });
}

// 医生列表
export function getDoctorList() {
    return request({
        url: 'visual/getDoctorList',
        method: 'get'
    });
}

// 获取筛选类型
export function getTypeList() {
    return request({
        url: 'visual/getFilterTypeList',
        method: 'get'
    });
}