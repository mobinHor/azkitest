
export const TranslateUserName = (userInfo)=>{
    if(userInfo){
        return userInfo.name + ' ' + userInfo.lname
    }else{
        return ''
    }
}