import React from 'react'
import {Row,Col} from 'antd'

import {reqWeather} from '../../api'
import {formDate} from '../../utils/utils'
import './header.less'
export default class Header extends React.Component {
    state = {
        sysTime:formDate(Date.now()),
        dayPictureUrl:'',
        weather:''
    }

    getWeather = async () => {
      const {dayPictureUrl,weather} = await reqWeather('北京')
        this.setState({
            dayPictureUrl,
            weather
        })
    }
    getSysTime = () => {
        this.intervalId = setInterval(()=>{
            this.setState({
                sysTime:formDate(Date.now())
            })
        },1000)
    }
    componentDidMount(){

        this.getSysTime()
        //发送异步ajax天气请求
        this.getWeather()
    }
    componentWillMount(){
        clearInterval(this.intervalId)
    }
    render() {
        const {sysTime,dayPictureUrl,weather} =this.state
        return(
            <div className='header'>
                <Row className='header-top'>
                    <span>欢迎，admin</span>
                    <a href="javascript:">退出</a>
                </Row>
                <Row className='breadcrumb'>
                    <Col span={4} className='breadcrumb-title'>首页</Col>
                    <Col span={20} className='weather'>
                        <span className='date'>{sysTime}</span>
                        <span className='weather-img'>
                            <img src={dayPictureUrl} alt="weather"/>
                        </span>
                        <span className='weather-detail'>{weather}</span>
                    </Col>
                </Row>
            </div>
        )
    }
}