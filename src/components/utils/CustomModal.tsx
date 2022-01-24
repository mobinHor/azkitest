import React, { ReactNode } from 'react'
import { useRef } from 'react'
import OutsideClick from '../../handlers/OutsideClick'


type CustomModalTypes = {
    open : boolean,
    setOpen : React.Dispatch<React.SetStateAction<boolean>>,
    children : ReactNode,
    maxWidth : number
}

const CustomModal = ({open , setOpen , children , maxWidth} : CustomModalTypes) => {
    // open , setOpen => to handle showing and hiding the modal

    const handleClose = ()=>{
        setOpen(false)
    }

    const modalRef = useRef(null)
    OutsideClick(modalRef , ()=>handleClose())

    if(open){
        return (
            <>
                <div className='backDrop'></div>
                <div className='modalWrapper'>
                    <div ref={modalRef} style={{maxWidth : maxWidth}} className='modalStyle'>
                        {children}
                    </div>
                </div>
            </>
        )
    }else{
        return null
    }

}

export default CustomModal
