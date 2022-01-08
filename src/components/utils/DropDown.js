import React,{useState , useRef} from 'react'
import OutsideClick from '../../handlers/OutsideClick'

const DropDown = ({title , list=[] , value , name , OnChange , listMapProp}) => {

    const [open , setOpen] = useState(false)
    
    const DropRef = useRef(null)
    OutsideClick(DropRef , ()=>setOpen(false))

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
