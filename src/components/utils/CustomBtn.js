import React from 'react'
import Spinner from './Spinner'

const CustomBtn = ({classes , OnClick , disabled , text , maxWidth , load , disableText}) => {
    // classes : identical to className , everything inside classes will go straight to className of button
    // OnClick : to handle click event of the button
    // disabled : true when button is disabled
    // text : what displays inside the button 
    // maxWidth : default width of button is 100% of its container , with this prop , it could be limited
    // load : loading status , for showing spinner in async calls , this comes from parent component and modifies there
    // disableText : displayed on tooltip of button as error message when button is disabled

    const handleClick = ()=>{
        if(!disabled){
            OnClick()
        }
    }

    return (
        <button 
            data-bs-toggle="tooltip" data-bs-placement="top" 
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
