

// validateing mobile input on forms with regular expression
export const ValidateMobile = (mobile : string) : boolean =>{
    try {
        let regex = /(0|\+98)?([ ]|,|-|[()]){0,2}9[1|2|3|4]([ ]|,|-|[()]){0,2}(?:[0-9]([ ]|,|-|[()]){0,2}){8}/
        if(mobile.match(regex)){
            return true
        }else{
            return false
        }
    } catch (error) {
        return false
    }
}

// validating password input on form , at least 4 chars , at most 10 chars , at least 1 digit , at least 1 Uppercase char , at least 1 Lowercase char
export const ValidatePasswordStrength = (pass : string) : boolean=>{
    try {
        if(pass.length < 4 || pass.length>10){
            return false
        }
        let regex = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/
        if(pass.match(regex)){
            return true
        }else{
            return false
        }
    } catch (error) {
        return false
    }
}

// validate input to accept only number
export const ValidateNumberOnly = (num : string) : boolean =>{
    try {
        if(num===''){
            return true
        }
        let regex = /^\d+$/;
        if(num.match(regex)){
            return true
        }else{
            return false
        }
    } catch (error) {
        return false
    }
}

// validate input to accept only persian characters
export const ValidatePersianOnly = (txt : string) : boolean =>{
    try {
        if(txt===''){
            return true
        }
        let regex = /^[\u0600-\u06FF\uFB8A\u067E\u0686\u06AF\u200C\u200F ]+$/;
        if(txt.match(regex)){
            return true
        }else{
            return false
        }
    } catch (error) {
        return false
    }
}