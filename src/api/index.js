import axios from './axios';

/**
 * 登录
 * @request
 *    email string 帐号
 *    password string 密码
 *    remember bool 是否记住
 *  @return
 *    {}
 */
export const login = (email, password, remember) => {
    const data = {};
    data['email'] = email;
    data['password'] = password;
    data['remember'] = remember;
    return axios({
        method: 'post',
        url: `/v1/login`,
        // headers: {
        //   'Content-Type': 'application/json; charset=UTF-8',
        // },
        data
    });
};

/**
 * 登出
 * @request
 *  @return
 *    {}
 */
export const logout = () => {
    const data = {};
    return axios({
        method: 'get',
        url: `/v1/logout`,
        // headers: {
        //   'Content-Type': 'application/json; charset=UTF-8',
        // },
        data
    });
};