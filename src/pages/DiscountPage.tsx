import React, { useState , useEffect } from 'react'
import CustomBtn from '../components/utils/CustomBtn'
import { useNavigate } from 'react-router-dom'
import DropDown from '../components/utils/DropDown'
import { GetDriverDiscounts , GetThirdDiscounts } from '../Redux/actions/GlobalActions'
import {connect, ConnectedProps} from 'react-redux'
import { StoreDiscountForm } from '../Redux/actions/GlobalActions'
import CustomModal from '../components/utils/CustomModal'
import {TranslateUserName} from '../handlers/Translators'
import { RootState } from '../Redux/Store'

type ModalTableElementProps = {title : string , value : string | number}
const ModalTableElement = ({title , value} : ModalTableElementProps)=>(
    <div className='d-flex align-items-center justify-content-between'>
        <p className='my-auto font-weight-bold text-grey'>{title}</p>
        <p className='my-auto'>{value}</p>
    </div>
)

const DiscountPage = ({StoreDiscountForm , storedDiscountForm , storedUserInfo , storedCompForm , storedCarForm} : ComponentReduxTypes) => {

    const Navigate = useNavigate()

    // state to handle list of THIRD_DISCOUNTS comming from ENDPOINT
    const [thirdDiscounts , setThirdDiscounts] = useState([])

    // state to handle list of DRIVER_DISCOUNTS comming from ENDPOINT
    const [driverDiscounts , setDriverDiscounts] = useState([])

    // state to handle opening and closing the final modal
    const [openModal , setOpenModal] = useState(false)

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
    
    // local state to handle selected THIRD and DRIVER discount
    const [discountForm , setDiscountForm] = useState({
        third : '',
        driver : '',
    })
    
    // when the component is re-rendered and carForm persists in REDUX , set the data back into private state of this component
    // in this page we do not have previous step , this process is used when user tries to navigate back with browser action
    useEffect(() => {
        if(storedDiscountForm){
            setDiscountForm(storedDiscountForm)
        }
    }, [storedDiscountForm])

    const OnChange = (name : string , value : string)=>{
        setDiscountForm({
            ...discountForm,
            [name] : value
        })
    }

    // store carForm data to REDUX and open the final modal
    const HandleSubmitForm = (e : React.SyntheticEvent)=>{
        e.preventDefault()
        StoreDiscountForm(discountForm)
        setOpenModal(true)
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
                        disableText={"لطفا موارد بالا را انتخاب کنید"}
                        disabled={discountForm.third==='' || discountForm.driver===''}
                        classes="radius-rounded border-green p-2 bg-green text-white" 
                        OnClick={HandleSubmitForm} 
                        text="استعلام قیمت"
                    />
                </form>
            </div>
            <CustomModal maxWidth={500} open={openModal} setOpen={setOpenModal}>
                <div className='bg-white radius-smooth p-4 d-flex flex-column gap-1'>
                    <ModalTableElement title="نام و نام خانوادگی" value={`${TranslateUserName(storedUserInfo)}`}/>
                    <ModalTableElement title="شماره موبایل" value={`${storedUserInfo?.mobile}`}/>
                    <ModalTableElement title="وسیله نقلیه" value={`${storedCarForm?.kind.title} - ${storedCarForm?.model.title}`}/>
                    <ModalTableElement title="شرکت بیمه‌گر قبلی" value={`${storedCompForm?.title}`}/>
                    <ModalTableElement title="درصد تخفیف ثالث" value={`${storedDiscountForm?.third.title}`}/>
                    <ModalTableElement title="درصد تخفیف حوادث راننده" value={`${storedDiscountForm?.driver.title}`}/>
                    <div className='centeralize mt-4'>
                        <CustomBtn 
                            maxWidth={180} 
                            disableText={"لطفا موارد بالا را انتخاب کنید"}
                            disabled={discountForm.third==='' || discountForm.driver===''}
                            classes="radius-rounded border-green p-2 bg-green text-white" 
                            OnClick={()=>Navigate('/car_select')} 
                            text="استعلام مجدد"
                        />
                    </div>
                </div>
            </CustomModal>
        </section>
    )
}

const mapState = (state : RootState)=>({
    storedDiscountForm : state.Global.discountForm,
    storedCarForm : state.Global.carForm,
    storedCompForm : state.Global.compForm,
    storedUserInfo : state.Global.userInfo
})
const mapDispatch = { StoreDiscountForm : StoreDiscountForm}
const connector = connect(mapState , mapDispatch)
type ComponentReduxTypes = ConnectedProps<typeof connector>

export default connector(DiscountPage)
