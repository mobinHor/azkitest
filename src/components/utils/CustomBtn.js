import React from 'react'
import Spinner from './Spinner'

const CustomBtn = ({classes , OnClick , disabled , text , maxWidth , load , disableText}) => {

    const handleClick = ()=>{
        if(!disabled){
            OnClick()
        }
    }

    return (
        <button 
            title={disabled ? disableText : ''}
            style={{maxWidth:maxWidth , opacity : disabled ? '0.6' : 1}} 
            className={classes + ' btn w-100'}
            onClick={handleClick} 
            disabled={disabled}>
                {load ? <Spinner size="sm"/> : text}
        </button>
    )
}

export default CustomBtn
