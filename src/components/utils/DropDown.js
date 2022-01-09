import React,{useState , useRef} from 'react'
import OutsideClick from '../../handlers/OutsideClick'

const DropDown = ({title , list=[] , value , name , OnChange , listMapProp}) => {
    // title : displayed label on the top right corner of select
    // list : incomiing list of options to show on drop down
    // name : the name of select to target the desired key of state on parent element
    // listMapProp : we got a list of objects on dropdown , this will hanlde wich key of that object should be displayed as LI

    const [open , setOpen] = useState(false)
    
    const DropRef = useRef(null)
    // handling click out side of select component , dropdown would be closed
    OutsideClick(DropRef , ()=>setOpen(false))

    // selecting the element on dropdown , changing the state of parent with OnChange , closing the dropdown 
    const HandleSelect = (e , selected)=>{
        e.stopPropagation()
        OnChange(name , selected)
        setOpen(false)
    }

    return (
        <div ref={DropRef} onClick={()=>setOpen(true)} className="DropDownWrapper w-100">
            <label className={value!=='' ? "activeDropLabel" : ""}>{title}</label>
            <div className='DropHeader'>
                <p className={(value!=='' ? "selectedDrop" : "") + ' my-auto'}>{value!=='' ? value[listMapProp] : title}</p>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 9L12 15L18 9" stroke="#828282" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>
            <ul className={open ? "showList" : ""}>
                {list.map(l=>(
                    <li onClick={(e)=>HandleSelect(e , l)} key={l.id}>{l[listMapProp]}</li>
                ))}
            </ul>
        </div>
    )
}

export default DropDown
