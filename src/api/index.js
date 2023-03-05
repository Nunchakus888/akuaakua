import axios from './axios';

export const ERROR_MESSAGE = 'Unknown Exception';
// https://github.com/mingzhang96/webui-control#api-doc-for-front

/**
 {
    'code': 0, # 状态码，非0就是错误码
    'info': 下面接口的响应
    'msg': 状态码不为0时的错误信息
}
 */

/**
 *  @return
    'instance_url': "xxxxxxxxx", # 实例url
     102: token非法
     500: 内部错误
 */
export const register = ({ email }) => {
    return axios({
        method: 'post',
        url: '/pay',
        data: {
            email
        }
    });
};

/**
 * @param token
 * @return {Promise<AxiosResponse<any>>}
    {
        'instance_url': "xxxxxxxxx", # 实例url
    }
 */
export const queryInstanceUrl = (token) => {
    return axios({
        method: 'post',
        // 2.5 分钟
        timeout: 2.5 * 60 * 1000,
        url: '/get_instance_url_by_token',
        data: {
            token
        }
    });
};

/**
 * @param instance_url 用户链接
 * @return     'pay_url': 'xxxx' # 支付用的链接，由前端来决定如何跳转
 * 500: 内部错误
 */
export const iframe2pay = (instance_url) => {
    return axios({
        method: 'post',
        url: '/renew',
        data: {
            instance_url
        }
    });
};

/**
 * get_remain_time
 * @param instance_url
 'deadline': 1677818426233.935, # float 单位为ms
 */
export const countdown = (instance_url) => {
    return axios({
        method: 'post',
        url: '/get_remain_time',
        data: {
            instance_url
        }
    });
};
