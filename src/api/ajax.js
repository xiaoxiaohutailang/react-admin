/*
用来发送ajax请求模块
 */
import axios from 'axios'
import {message} from 'antd'

export default function ajax(url, data={}, method='GET') {

    return new Promise((resolve,reject) => {
        let promise
        if(method==='GET'){
            promise = axios.get(url,{params:data}, method)
        } else {
            promise = axios.post(url,data, method)
        }
        promise.then(response => {
            resolve(response.data)
        }).catch(error => {
            console.log(url,error);
            message.error('请求出错啦~')
        })
    })
}