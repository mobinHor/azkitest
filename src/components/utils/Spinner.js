import React from 'react'

const Spinner = ({size="sm" , color="light" , fullWidth}) => {
    // fullWidth : when true , the spinner would span accross the parent with larger height and centralized
    return (
        <div>
            {fullWidth ?
                <div className="d-flex flex-column justify-content-center align-items-center" style={{height:'400px'}}>
                    <div className={`spinner-border spinner-border-${size} text-${color}`} role="status">
                        <span className="sr-only"></span>
                    </div> 
                </div>
                :
                <div className={`text-${color}  spinner-border spinner-border-${size}`} role="status">
                    <span className="sr-only"></span>
                </div>
            }
        </div>
    )
}

export default Spinner
