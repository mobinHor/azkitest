import React, { useState , useEffect } from 'react'
import CustomBtn from '../components/utils/CustomBtn'
import { useNavigate } from 'react-router-dom'
import chevron from '../assets/icons/arrow.svg'
import DropDown from '../components/utils/DropDown'
import { GetCarTypes } from '../Redux/actions/GlobalActions'
import {connect} from 'react-redux'
import { StoreCarForm } from '../Redux/actions/GlobalActions'

const CarSelectPage = ({StoreCarForm , storedCarForm}) => {

    const Navigate = useNavigate()

    // state to store carTypes comming from ENDPOINT locally
    const [carTypes , setCarTypes] = useState([])

    // getting and setting data to local state
    useEffect(() => {
        (async ()=>{
            let res = await GetCarTypes()
            if(res){
                setCarTypes(res)
            }
        })()
    }, [])

    // state to handle chosen KIND and MODEL of vehicle
    const [carForm , setCarForm] = useState({
        kind : '',
        model : '',
    })

    // when the component is re-rendered and carForm persists in REDUX , set the data back into private state of this component
    useEffect(() => {
        if(storedCarForm){
            setCarForm(storedCarForm)
        }
    }, [storedCarForm])
    const OnChange = (name , value)=>{
        setCarForm({
            ...carForm,
            [name] : value,
            // when user is selecting kind , the carModels list would be revoked, so the selected MODEL should not be valid and must be cleared
            [name==="kind" ? "model" : undefined] : ''
        })
    }


    // generate the list of carModels according to chosen car kind
    const getCarModels = ()=>{
        try {
            if(carForm.kind.id){
                return carTypes.find(c=>c.id===carForm.kind.id).brands
            }else{
                return []
            }
        } catch (error) {
            return []
        }
    }

    // store carForm data to REDUX and proceed to next page
    const HandleSubmitForm = (e)=>{
        e.preventDefault()
        StoreCarForm(carForm)
        Navigate('/previous_insurance')
    }


    return (
        <section id="CarSelect">
            <div style={{maxWidth:'600px'}} className='mx-auto mt-0 mt-md-4 p-4'>
                <h4 className='text-center text-md-right font-weight-bold'>بیمه شخص ثالث</h4>
                <p className='text-center text-md-right  text-grey mt-5'>نوع و مدل خودروی خود را انتخاب کنید.</p>
                <form onSubmit={HandleSubmitForm} className='mt-5  d-flex align-items-end flex-column gap-1'>
                    <div className='d-flex flex-column flex-md-row w-100 gap-1'>
                        <DropDown name="kind" OnChange={OnChange} list={carTypes} listMapProp="title" value={carForm.kind} title="نوع خودرو"/>
                        <DropDown name="model" OnChange={OnChange} list={getCarModels()} listMapProp="title" value={carForm.model} title="مدل خودرو"/>
                    </div>
                    <div className='d-flex justify-content-between align-items-center w-100 gap-1'>
                        <CustomBtn 
                            maxWidth={150} 
                            classes="radius-rounded border-green p-2 text-green" 
                            OnClick={()=>Navigate('/')} 
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
                            disableText={"لطفا موارد بالا را انتخاب کنید"}
                            disabled={carForm.model==='' || carForm.kind===''}
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
    storedCarForm : state.Global.carForm
})

export default connect(mapStateToProps , {StoreCarForm})(CarSelectPage)
