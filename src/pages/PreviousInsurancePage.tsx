import React, { useState , useEffect } from 'react'
import CustomBtn from '../components/utils/CustomBtn'
import { useNavigate } from 'react-router-dom'
// @ts-ignore
import chevron from '../assets/icons/arrow.svg'
// @ts-ignore
import DropDown from '../components/utils/DropDown'
import { GetInsuranceCompanies } from '../Redux/actions/GlobalActions'
import {connect, ConnectedProps} from 'react-redux'
import { StoreCompForm } from '../Redux/actions/GlobalActions'
import { RootState } from '../Redux/Store'

const PreviousInsurancePage = ({StoreCompForm , storedCompForm} : ComponentReduxProps) => {

    const Navigate = useNavigate()

    // local state to store COMPANIES list comming from ENDPOINT
    const [companies , setCompanies] = useState([])

    useEffect(() => {
        (async ()=>{
            let res = await GetInsuranceCompanies()
            if(res){
                setCompanies(res)
            }
        })()
    }, [])

    // local state to handle selected company company
    const [comp , setComp] = useState('')

    // when the component is re-rendered and CompForm persists in REDUX , set the data back into private state of this component
    useEffect(() => {
        if(storedCompForm && comp===''){
            setComp(storedCompForm)
        }
        // eslint-disable-next-line
    }, [storedCompForm])



    const OnChange = (name : string , value : string)=>{
        setComp(value)
    }

    // store carForm data to REDUX and proceed to next page
    const HandleSubmitForm = (e : React.SyntheticEvent)=>{
        e.preventDefault()
        StoreCompForm(comp)
        Navigate('/discount')
    }


    return (
        <section id="CarSelect">
            <div style={{maxWidth:'600px'}} className='mx-auto mt-0 mt-md-5 p-4'>
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
                            disableText={"لطفا مورد بالا را انتخاب کنید"}
                            disabled={comp===''}
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

const mapState = (state: RootState)=>({ storedCompForm : state.Global.compForm })
const mapDispatch = { StoreCompForm : StoreCompForm }
const connector = connect(mapState , mapDispatch)
type ComponentReduxProps =  ConnectedProps<typeof connector>

export default connector(PreviousInsurancePage)
