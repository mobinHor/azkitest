import React from 'react'

const CustomInput = ({placeholder , label , type="text" , name , value , OnChange}) => {


    const HandleChange = (e)=>{
        let {name , value} = e.target
        OnChange(name , value)
    }

    return (
        <div className='CustomInputWrapper position-relative w-100'>
            <label className={value.length > 0 ? "activeLabel" : ""}>{label}</label>
            <input className='CustomInput' value={value} name={name} type={type} onChange={HandleChange} placeholder={placeholder ? placeholder : label} />
        </div>
    )
}

export default CustomInput
