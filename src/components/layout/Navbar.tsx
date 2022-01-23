import React from 'react'
// @ts-ignore
import logo from '../../assets/icons/logo.svg'
// @ts-ignore
import userIcon from '../../assets/icons/user.svg'
import { TranslateUserName } from '../../handlers/Translators'

type NavbarProps = {
    userInfo : {name : string , lname : string} | undefined
}

const Navbar = ({userInfo} : NavbarProps) => {
// this component is user in layout as navbar of pages
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
