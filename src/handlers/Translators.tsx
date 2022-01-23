

// translate username , recieves userInfo and returns fullname of user
export const TranslateUserName = (userInfo : {name : string , lname : string} | undefined)=>{
    if(userInfo){
        return userInfo.name + ' ' + userInfo.lname
    }else{
        return ''
    }
}