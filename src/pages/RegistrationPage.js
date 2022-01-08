import React, { useState } from 'react'
import CustomInput from '../components/utils/CustomInput'
import CustomBtn from '../components/utils/CustomBtn'
import {connect} from 'react-redux'
import { StoreUserInfo } from '../Redux/actions/GlobalActions'
import { useNavigate } from 'react-router-dom'

const RegistrationPage = ({StoreUserInfo}) => {

    const Navigate = useNavigate()

    const [load , setLoad] = useState(false)

    const [RegisterForm , setRegisterForm] = useState({
        name : '',
        lname : '',
        mobile : '',
        password : '',
    })

    const OnChange = (name , value)=>{
        setRegisterForm({
            ...RegisterForm,
            [name] : value
        })
    }

    const HandleSubmitForm = (e)=>{
        e.preventDefault()
        setLoad(true)
        setTimeout(() => {
            StoreUserInfo(RegisterForm)
            setLoad(false)
            Navigate('/car_select')
        }, 1000);
    }

    return (
        <section id="Registration">
            <div style={{maxWidth:'600px'}} className='mx-auto mt-4 p-4'>
                <h4 className='text-center text-md-right font-weight-bold'>ثبت نام</h4>
                <form onSubmit={HandleSubmitForm} className='mt-5  d-flex align-items-end flex-column gap-1'>
                    <div className='d-flex flex-column flex-md-row w-100 gap-1'>
                        <CustomInput OnChange={OnChange} name="name" value={RegisterForm.name} label={"نام"}/>
                        <CustomInput OnChange={OnChange} name="lname" value={RegisterForm.lname} label={"نام خانوادگی"}/>
                    </div>
                    <CustomInput OnChange={OnChange} name="mobile" value={RegisterForm.mobile} label={"شماره موبایل"}/>
                    <CustomInput type="password" OnChange={OnChange} name="password" value={RegisterForm.password} label={"رمز عبور"}/>
                    <CustomBtn load={load} maxWidth={150} classes="radius-rounded bg-green p-2 text-white" OnClick={HandleSubmitForm} text="ثبت نام" />
                </form>
            </div>
        </section>
    )
}

export default connect(null , {StoreUserInfo})(RegistrationPage)
