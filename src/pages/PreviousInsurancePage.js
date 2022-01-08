import React, { useState , useEffect , useMemo } from 'react'
import CustomBtn from '../components/utils/CustomBtn'
import { useNavigate } from 'react-router-dom'
import chevron from '../assets/icons/arrow.svg'
import DropDown from '../components/utils/DropDown'
import { GetInsuranceCompanies } from '../Redux/actions/GlobalActions'
import {connect} from 'react-redux'
import { StoreCompForm } from '../Redux/actions/GlobalActions'

const PreviousInsurancePage = ({StoreCompForm , storedCompForm}) => {

    const Navigate = useNavigate()

    const [companies , setCompanies] = useState([])

    useEffect(() => {
        (async ()=>{
            let res = await GetInsuranceCompanies()
            if(res){
                setCompanies(res)
            }
        })()
    }, [])
    useEffect(() => {
        if(storedCompForm && comp===''){
            setComp(storedCompForm)
        }
    }, [storedCompForm])

    const [comp , setComp] = useState('')

    const OnChange = (name , value)=>{
        setComp(value)
    }

    const HandleSubmitForm = (e)=>{
        e.preventDefault()
        StoreCompForm(comp)
        Navigate('/discount')
    }


    return (
        <section id="CarSelect">
            <div style={{maxWidth:'600px'}} className='mx-auto mt-4 p-4'>
                <h4 className='text-center text-md-right font-weight-bold'>بیمه شخص ثالث</h4>
                <p className='text-center text-md-right  text-grey mt-5'>شرکت بیمه‌گر قبلی خود را در این بخش اتخاب کنید.</p>
                <form onSubmit={HandleSubmitForm} className='mt-5  d-flex align-items-end flex-column gap-1'>
                    <div className='d-flex flex-column flex-md-row w-100 gap-1'>
                        <DropDown name="comp" OnChange={OnChange} list={companies} listMapProp="title" value={comp} title="شرکت بیمه‌گر قبلی"/>
                    </div>
                    <div className='d-flex justify-content-between align-items-center w-100 gap-1'>
                        <CustomBtn 
                            maxWidth={150} 
                            classes="radius-rounded border-green p-2 text-green" 
                            OnClick={()=>Navigate('/car_select')} 
                            text={
                                <div className='d-flex gap-1 justify-content-center align-items-center'>
                                    <img alt="" style={{width:'8px' , transform:'rotate(180deg)'}} src={chevron}/>
                                    <p className='my-auto'>بازگشت</p>
                                </div>
                            }
                        />
                        <CustomBtn 
                            maxWidth={150} 
                            classes="radius-rounded border-green p-2 text-green" 
                            OnClick={HandleSubmitForm} 
                            text={
                                <div className='d-flex gap-1 justify-content-center align-items-center'>
                                    <p className='my-auto'>مرحله بعد</p>
                                    <img alt="" style={{width:'8px'}} src={chevron}/>
                                </div>
                            }
                        />
                    </div>
                </form>
            </div>
        </section>
    )
}

const mapStateToProps = state=>({
    storedCompForm : state.Global.compForm
})

export default connect(mapStateToProps , {StoreCompForm})(PreviousInsurancePage)
