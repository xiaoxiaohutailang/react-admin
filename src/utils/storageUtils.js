/*
loacl存储模块
 */
import store from 'store'


const USER_KEY = 'user_key'
//读取数据
function setItem(name, value) {
    if(value && typeof value !== 'function'){
        store.set(name, value)
    }else {
        alert('不支持此类型的数据存储')
    }
}
//获取数据
function getItem(name) {
    return store.get(name) || ''
}
//删除数据
function removeItem(name) {
   store.remove(name)
}

export default {
    //保存数据，调用读取数据，保存user
    saveUser(user){
        setItem(USER_KEY,user)
    },
    getUser(){
        return getItem(USER_KEY)
    },
    removeUser(){
        removeItem(USER_KEY)
    }
}
