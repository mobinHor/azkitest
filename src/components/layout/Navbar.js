import React from 'react'
import logo from '../../assets/icons/logo.svg'

const Navbar = ({userInfo}) => {

    const TransUserName = ()=>{
        if(userInfo){
            return userInfo.name + ' ' + userInfo.lname
        }else{
            return ''
        }
    }

    return (
        <nav id="Navbar">
            <ul className='d-flex align-items-center justify-content-between p-5'>
                <li><img alt="ازکی" src={logo}/></li>
                <li className='font-weight-bold d-none d-md-block'>سامانه مقایسه و خرید آنلاین بیمه</li>
                <li>{userInfo ? TransUserName() : 'ثبت نام'}</li>
            </ul>
        </nav>
    )
}

export default Navbar
