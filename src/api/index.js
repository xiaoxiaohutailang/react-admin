import ajax from './ajax'

import jsonp from 'jsonp'
const BASE = 'http://localhost:5000'
//登录
export const reqLogin = (username,password) => ajax('/login',{username,password},'POST')
//注册用户
export const reqAddUser = (user) => ajax('/manage/user/add',user,'POST')

//获取天气
export function reqWeather(city) {
    return  new Promise(function (resolve,reject) {
        const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
        jsonp(url,
            {prams:'callback'},
            (erorr,data) => {
            console.log('callback',erorr,data)
                if(!erorr){//成功调用resolve
                    const {dayPictureUrl,weather} = data.result[0].weather_data[0]

                    resolve({dayPictureUrl,weather})
                }else{
                alert('请求接口出错啦！')
                }
            }
        )
    })
}

// reqWeather('北京').then(() => {}).catch(() => {})