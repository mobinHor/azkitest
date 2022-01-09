import React from 'react'
import { useRef } from 'react'
import OutsideClick from '../../handlers/OutsideClick'

const CustomModal = ({open , setOpen , children , maxWidth}) => {

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
