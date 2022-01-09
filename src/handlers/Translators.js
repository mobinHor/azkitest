
export const TransUserName = (userInfo)=>{
    if(userInfo){
        return userInfo.name + ' ' + userInfo.lname
    }else{
        return ''
    }
}