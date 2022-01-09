


export const ValidateMobile = (mobile)=>{
    try {
        if(mobile[0]==='0' && mobile.length!==11){
            return false
        }
        if(mobile[9]==='0' && mobile[8]==='8'  && mobile.length!==12){
            return false
        }
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

export const ValidatePasswordStrength = (pass)=>{
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

export const ValidateNumberOnly = (num)=>{
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

export const ValidatePersianOnly = (txt)=>{
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