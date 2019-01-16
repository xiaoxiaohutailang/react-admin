import React from 'react'
import {NavLink,withRouter} from 'react-router-dom'
import {Menu, Icon} from 'antd'


import menuList from '../../config/menuConfig'
import logo from '../../assets/images/logo.png'

import './left-nav.less'

const SubMenu = Menu.SubMenu
const Item = Menu.Item

class LeftNav extends React.Component {

    getMenuNodes = (menus) =>{
        return menus.reduce((pre,item) => {
            if(item.children){
                const subMenu = (
                    <SubMenu key={item.key}
                             title={<span><Icon type={item.icon}/><span>{item.title}</span></span>}>
                        {
                            this.getMenuNodes(item.children)
                        }
                    </SubMenu>
                )
                pre.push(subMenu)
            }else {
                const menuItem = (
                    <Item key={item.key}>
                        <NavLink to={item.key}>
                            <Icon type={item.icon}/>{item.title}
                        </NavLink>
                    </Item>
                )
                pre.push(menuItem)
            }
            return pre
        },[])
    }
    componentWillMount(){
        this.menuNodes = this.getMenuNodes(menuList)
    }
    render() {
        const path = this.props.location.pathname
        return(
            <div className='left-nav'>
                <NavLink to='/home' className='logo'>
                    <img src={logo} alt="logo"/>
                    <h1>硅谷后台</h1>
                </NavLink>

                <Menu  mode="inline" theme='dark' defaultSelectedKeys={[path]} >
                    {this.menuNodes}
                </Menu>
            </div>
        )
    }
}
export default withRouter(LeftNav)