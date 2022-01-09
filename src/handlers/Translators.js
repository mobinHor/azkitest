
// translate username , recieves userInfo and returns fullname of user
export const TranslateUserName = (userInfo)=>{
    if(userInfo){
        return userInfo.name + ' ' + userInfo.lname
    }else{
        return ''
    }
}