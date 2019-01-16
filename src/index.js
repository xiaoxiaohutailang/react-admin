/*
入口文件
 */
import React from 'react'
import ReactDOM from 'react-dom'

import storageUtils from './utils/storageUtils'
import MemoryUtils from './utils/MemoryUtils'
import App from './App'

const user = storageUtils.getUser()
if(user && user._id){
    MemoryUtils.user = user
}
ReactDOM.render(<App/>,document.getElementById('root'));