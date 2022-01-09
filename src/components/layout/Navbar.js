import React from 'react'
import logo from '../../assets/icons/logo.svg'
import userIcon from '../../assets/icons/user.svg'
import { TranslateUserName } from '../../handlers/Translators'

const Navbar = ({userInfo}) => {

    return (
        <nav id="Navbar">
            <ul className='d-flex align-items-center justify-content-between p-5'>
                <li><img alt="ازکی" src={logo}/></li>
                <li className='font-weight-bold d-none d-md-block'>سامانه مقایسه و خرید آنلاین بیمه</li>
                <li className='font-weight-bold'><img alt="" style={{width:'25px'}} src={userIcon}/> {userInfo ? TranslateUserName(userInfo) : 'ثبت نام'}</li>
            </ul>
        </nav>
    )
}

export default Navbar
