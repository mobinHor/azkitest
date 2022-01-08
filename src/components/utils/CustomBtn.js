import React from 'react'
import Spinner from './Spinner'

const CustomBtn = ({classes , OnClick , disabled , text , maxWidth , load}) => {

    const handleClick = ()=>{
        if(!disabled){
            OnClick()
        }
    }

    return (
        <button 
            style={{maxWidth:maxWidth}} 
            className={classes + ' btn w-100'}
            onClick={handleClick} 
            disabled={disabled}>
                {load ? <Spinner size="sm"/> : text}
        </button>
    )
}

export default CustomBtn
