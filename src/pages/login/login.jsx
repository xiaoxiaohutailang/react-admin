import React from 'react'
import {Form,
        Icon,
        Input,
        Button} from 'antd'

import storageUtils from '../../utils/storageUtils'
import memoryUtils from '../../utils/MemoryUtils'
import {reqLogin} from '../../api'
import logo from '../../assets/images/logo.png'
import './index.less'
export default class Login extends React.Component {
    state = {
        errorMsg:''
    }

    login = async (username,password) => {
       const result = await reqLogin(username,password)
        console.log('result', result);
        if(result.status === 0){
           const user = result.data;

            storageUtils.saveUser(user)
            memoryUtils.user = user
            this.props.history.replace('/')
         }else {

           this.setState({
               errorMsg:result.msg
           })
        }
    }
render() {
        const {errorMsg} = this.state
    return(
    <div className='login'>
        <div className='login-header'>
            <img src={logo} alt="logo"/>
            React项目：后台应用管理
        </div>

        <div className='login-content'>
            <div className='login-box'>
                <div className='error-msg-wrap'>
                    <div className={errorMsg ? 'show' : ''}>
                        {errorMsg}
                    </div>
                </div>
                <div className='title'>用户登录</div>
                <LoginForm ref='login' login={this.login}/>
            </div>
        </div>
    </div>
    )
  }
}


class LoginForm extends React.Component{
    clickLogin = (e) => {
        e.preventDefault()

        this.props.form.validateFields((err,value) => {
            if(!err){
                this.props.login(value.username,value.password)
                // console.log(this.props.login);
            }
        })
    }

    checkUsername = (rule,value,callback) => {
        if(!value){
            callback('请输入用户名')
        }else if(value.length < 4){
            callback('用户名必须大于4位')
        }else{
            callback()
        }
    }
    render(){
        const {getFieldDecorator} = this.props.form
        return(
            <Form className='login-form'>
                <Form.Item>
                    {
                        getFieldDecorator('username',{
                            initialValue:'admin',
                            rules:[{
                                validator:this.checkUsername,

                            }]
                        })( <Input prefix={<Icon type='user'/>} placeholder='username'/>)
                    }
                </Form.Item>
                <Form.Item>
                    {
                        getFieldDecorator('password',{
                            rules:[
                            {
                              type:'string',
                              require:true,
                              min:4,
                              message:'请输入长度大于4位',
                            },
                            {
                                type:'string',
                                require:true,
                                max:8,
                                message:'请输入长度小于8！！'
                            }
                            ]
                        })(<Input prefix={<Icon type='lock'/>} placeholder='password' type='password'/>)
                    }
                </Form.Item>
                <Button className='login-form-button' type='primary' onClick={this.clickLogin}>登录</Button>
            </Form>
        )
    }
}



LoginForm = Form.create()(LoginForm)