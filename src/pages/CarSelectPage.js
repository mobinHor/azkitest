import React, { useState , useEffect , useMemo } from 'react'
import CustomBtn from '../components/utils/CustomBtn'
import { useNavigate } from 'react-router-dom'
import chevron from '../assets/icons/arrow.svg'
import DropDown from '../components/utils/DropDown'
import { GetCarTypes } from '../Redux/actions/GlobalActions'
import {connect} from 'react-redux'
import { StoreCarForm } from '../Redux/actions/GlobalActions'

const CarSelectPage = ({StoreCarForm , storedCarForm}) => {

    const Navigate = useNavigate()

    const [carTypes , setCarTypes] = useState([])

    useEffect(() => {
        (async ()=>{
            let res = await GetCarTypes()
            if(res){
                setCarTypes(res)
            }
        })()
    }, [])

    const [carForm , setCarForm] = useState({
        kind : '',
        model : '',
    })
    const OnChange = (name , value)=>{
        setCarForm({
            ...carForm,
            [name] : value,
        })
    }

    // generate the list of car types according to data fetched from end-point
    const genCarTypes = ()=>{
        try {
            // mapping through elements and slice out their id and title to create the list
            return carTypes.map(c=>{
                return {
                    id : c.id,
                    title : c.title
                }
            })
        } catch (error) {
            return []
        }
    }
    // using useMemo to prevent re-rendering caused by state changes in the scope
    // useMemo is sensitive to carTypes (data comming from end-point)
    const carTypesList = useMemo(() => genCarTypes(), [carTypes]);

    // generate the list of car types according to data fetched from end-point
    const getCarModels = ()=>{
        try {
            // reset the value of model
            OnChange('model' , '')
            // mapping through elements and slice out their id and title to create the list
            if(carForm.kind.id){
                return carTypes.find(c=>c.id===carForm.kind.id).brands
            }else{
                return []
            }
        } catch (error) {
            return []
        }
    }
    // using useMemo to prevent re-rendering caused by state changes in the scope
    // useMemo is sensitive to carForm.kind (data comming from our state)
    const carModelsList = useMemo(() => getCarModels(), [carForm.kind]);

    const HandleSubmitForm = (e)=>{
        e.preventDefault()
        StoreCarForm(carForm)
        Navigate('/previous_insurance')
    }


    return (
        <section id="CarSelect">
            <div style={{maxWidth:'600px'}} className='mx-auto mt-4 p-4'>
                <h4 className='text-center text-md-right font-weight-bold'>بیمه شخص ثالث</h4>
                <p className='text-center text-md-right  text-grey mt-5'>نوع و مدل خودروی خود را انتخاب کنید.</p>
                <form onSubmit={HandleSubmitForm} className='mt-5  d-flex align-items-end flex-column gap-1'>
                    <div className='d-flex flex-column flex-md-row w-100 gap-1'>
                        <DropDown name="kind" OnChange={OnChange} list={carTypesList} listMapProp="title" value={carForm.kind} title="نوع خودرو"/>
                        <DropDown name="model" OnChange={OnChange} list={carModelsList} listMapProp="title" value={carForm.model} title="مدل خودرو"/>
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
