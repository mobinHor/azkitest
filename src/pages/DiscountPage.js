import React, { useState , useEffect } from 'react'
import CustomBtn from '../components/utils/CustomBtn'
import { useNavigate } from 'react-router-dom'
import DropDown from '../components/utils/DropDown'
import { GetDriverDiscounts , GetThirdDiscounts } from '../Redux/actions/GlobalActions'
import {connect} from 'react-redux'
import { StoreDiscountForm } from '../Redux/actions/GlobalActions'

const DiscountPage = ({StoreDiscountForm , storedDiscountForm}) => {

    const Navigate = useNavigate()

    const [thirdDiscounts , setThirdDiscounts] = useState([])
    const [driverDiscounts , setDriverDiscounts] = useState([])

    useEffect(() => {
        (async()=>{
            let third = await GetThirdDiscounts()
            if(third){
                setThirdDiscounts(third)
            }
            let driver = await GetDriverDiscounts()
            if(driver){
                setDriverDiscounts(driver)
            }
        })()
    }, [])
    
    const [discountForm , setDiscountForm] = useState({
        third : '',
        driver : '',
    })
    useEffect(() => {
        if(storedDiscountForm){
            setDiscountForm(storedDiscountForm)
        }
    }, [storedDiscountForm])

    const OnChange = (name , value)=>{
        setDiscountForm({
            ...discountForm,
            [name] : value
        })
    }

    const HandleSubmitForm = (e)=>{
        e.preventDefault()
        StoreDiscountForm(discountForm)
    }


    return (
        <section id="CarSelect">
            <div style={{maxWidth:'600px'}} className='mx-auto mt-0 mt-md-5 p-4'>
                <h4 className='text-center text-md-right font-weight-bold'>بیمه شخص ثالث</h4>
                <p className='text-center text-md-right  text-grey mt-5'>درصد تخفیف بیمه شخص ثالث و حوادث راننده را وارد کنید.</p>
                <form onSubmit={HandleSubmitForm} className='mt-5  d-flex align-items-end flex-column gap-1'>
                    <DropDown name="third" OnChange={OnChange} list={thirdDiscounts} listMapProp="title" value={discountForm.third} title="درصد تخفیف ثالث"/>
                    <DropDown name="driver" OnChange={OnChange} list={driverDiscounts} listMapProp="title" value={discountForm.driver} title="درصد تخفیف حودث راننده"/>
                    <CustomBtn 
                        maxWidth={180} 
                        classes="radius-rounded border-green p-2 bg-green text-white" 
                        OnClick={()=>Navigate('/previous_insurance')} 
                        text="استعلام قیمت"
                    />
                </form>
            </div>
        </section>
    )
}

const mapStateToProps = state=>({
    storedDiscountForm : state.Global.discountForm
})

export default connect(mapStateToProps , {StoreDiscountForm})(DiscountPage)
