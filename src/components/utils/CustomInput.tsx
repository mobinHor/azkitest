import React, { ChangeEvent } from 'react'

type CustomInputProps = {
    label : string,
    name : string,
    value : number | string
    OnChange : (name: string, value: string) => void
    hasError? : boolean,
    placeholder? : string,
    type? : 'text' | 'password' | 'number',
    validateFunc? : Function
}

const CustomInput = ({hasError ,placeholder , label , type="text" , name , value , OnChange , validateFunc} : CustomInputProps) => {
    // hasError : it is TRUE when the input has validation error
    // name : the name of input to target the desired key of state on parent element
    // validateFunc : incomming validation function to validate input value on onChange

    const HandleChange = (e : ChangeEvent<HTMLInputElement>)=>{
        let {name , value} = e.target
        if(validateFunc){
            if(validateFunc(value)){
                OnChange(name , value)
            }
        }else{
            OnChange(name , value)
        }
    }

    return (
        <div className={'CustomInputWrapper position-relative w-100'}>
            <label className={value!=='' ? "activeLabel" : ""}>{label}</label>
            <input className={(hasError ? "IputHasError" : "") + ' CustomInput'} value={value} name={name} type={type} onChange={HandleChange} placeholder={placeholder ? placeholder : label} />
        </div>
    )
}

export default CustomInput
