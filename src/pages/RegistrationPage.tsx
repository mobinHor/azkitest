import { RootState } from '../Redux/Store';
import React, { useState , useEffect } from 'react'
import CustomInput from '../components/utils/CustomInput'
import CustomBtn from '../components/utils/CustomBtn'
import {connect , ConnectedProps} from 'react-redux'
import { StoreUserInfo } from '../Redux/actions/GlobalActions'
import { useNavigate } from 'react-router-dom'
import { ValidateMobile , ValidatePasswordStrength , ValidatePersianOnly , ValidateNumberOnly } from '../handlers/FormValidations'



const mapStateToProps = (state : RootState)=>({
    StoredUserInfo : state.Global.userInfo
})
const mapDispatch = {
    StoreUserInfo : StoreUserInfo
}
const connector = connect(mapStateToProps, mapDispatch)
type PropsFromRedux = ConnectedProps<typeof connector>

const RegistrationPage = ({StoreUserInfo , StoredUserInfo} : PropsFromRedux ) => {

    const Navigate = useNavigate()

    // state to handle fake loading during signup process
    const [load , setLoad] = useState(false)

    // state to handle form errors => mobile and passowrd validation errors
    // recieves SPOT and TEXT
    // SPOT : defines where the error has occured
    // TEXT : A message to clarify the error
    type errorType = null | {spot : string , text : string}
    const [error , setError] = useState<errorType>(null)

    // when the component is re-rendered and userInfo persists in REDUX , set the data back into private state of this component
    useEffect(() => {
        if(StoredUserInfo){
            setRegisterForm(StoredUserInfo)
        }
    }, [StoredUserInfo])

    // private state to handle registration form
    const [RegisterForm , setRegisterForm] = useState({
        name : '',
        lname : '',
        mobile : '',
        password : '',
    })

    const OnChange = (name : string , value : string)=>{
        // set the error object to null when user changes any input after occuring the error
        setError(null)
        setRegisterForm({
            ...RegisterForm,
            [name] : value
        })
    }

    const HandleSubmitForm = (e : React.SyntheticEvent)=>{
        e.preventDefault()
        if(!ValidateMobile(RegisterForm.mobile)){
            setError({spot : 'mobile' , text :'شماره موبایل وارد شده معتبر نیست'})
            return
        }
        if(!ValidatePasswordStrength(RegisterForm.password)){
            setError({spot : 'password' , text :'طول رمز عبور شما باید بین 4 تا 10 کاراکتر باشد و از حداقل یک حرف لاتین بزرگ ، یک حرف لاتین کوچک و یک عدد استفاده شود'})
            return
        }
        setLoad(true)
        // storing data in REDUX(to persist) and navigate user to next page
        setTimeout(() => {
            StoreUserInfo(RegisterForm)
            setLoad(false)
            Navigate('/car_select')
        }, 1000);
    }

    const CheckDisable = ()=>{
        if(RegisterForm.name==='' || RegisterForm.lname==='' || RegisterForm.mobile==='' || RegisterForm.password===''){
            return true
        }
        return false
    }

    return (
        <section id="Registration">
            <div style={{maxWidth:'600px'}} className='mx-auto mt-0 mt-md-4 p-4'>
                <h4 className='text-center text-md-right font-weight-bold'>ثبت نام</h4>
                <form onSubmit={HandleSubmitForm} className='mt-5 d-flex align-items-end flex-column gap-1'>
                    <div className='d-flex flex-column flex-md-row w-100 gap-1'>
                        <CustomInput 
                            validateFunc={ValidatePersianOnly} 
                            OnChange={OnChange} 
                            name="name" 
                            value={RegisterForm.name} 
                            label={"نام"}
                        />
                        <CustomInput 
                            validateFunc={ValidatePersianOnly} 
                            OnChange={OnChange} 
                            name="lname" 
                            value={RegisterForm.lname} 
                            label={"نام خانوادگی"}
                        />
                    </div>
                    <CustomInput 
                        validateFunc={ValidateNumberOnly} 
                        hasError={error?.spot==="mobile"} 
                        OnChange={OnChange} 
                        name="mobile" 
                        value={RegisterForm.mobile} 
                        label={"شماره موبایل"}
                    />
                    <CustomInput 
                        hasError={error?.spot==="password"} 
                        type="password" 
                        OnChange={OnChange} 
                        name="password" 
                        value={RegisterForm.password} 
                        label={"رمز عبور"}
                    />
                    <p style={{height:'1.5rem'}} className='my-auto text-right w-100 text-danger font-size-0'>{error?.text}</p>
                    <CustomBtn 
                        disabled={CheckDisable()}
                        disableText="لطفا ابتدا فرم را پر نمایید"
                        load={load} 
                        maxWidth={150} 
                        classes={"bg-green text-white radius-rounded p-2" }
                        OnClick={HandleSubmitForm} 
                        text={StoredUserInfo ? "مرحله بعد" : "ثبت نام"} 
                    />
                </form>
            </div>
        </section>
    )
}


export default connector(RegistrationPage)
