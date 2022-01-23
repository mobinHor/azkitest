import React,{useState , useEffect} from 'react'
import Navbar from '../components/layout/Navbar'
import { Outlet } from 'react-router-dom'
// @ts-ignore
import carSvg from '../assets/icons/car-green.svg'
import {connect} from 'react-redux'
import { AuthUser } from '../Redux/actions/GlobalActions'
import Spinner from '../components/utils/Spinner'
import { useNavigate } from 'react-router-dom'

type MainLayoutProps = {
    userInfo : {name : string , lname : string} | undefined,
    AuthUser : () => boolean 
}

const MainLayout = ({userInfo , AuthUser} : MainLayoutProps) => {

    const Navigate = useNavigate()

    // state to handle whole page loading
    const [load , setLoad] = useState(true)

    // on app render , checks wether the user is authorized or not, if not , the user would be redirected to REGISTRATION page
    useEffect(() => {
        setTimeout(() => {
            let res = AuthUser()
            if(res){
                setLoad(false)
            }else{
                Navigate('/')
                setLoad(false)
            }
        }, 1000);
        // eslint-disable-next-line
    }, [])

    if(load) return <Spinner fullWidth size="lg" color="success"/>

    return (
        <main id="MainLayout">
            <Navbar userInfo={userInfo}/>
            <div style={{minHeight:'75vh'}} className='row align-items-start'>
                <div className='col-lg-6'>
                    <Outlet />
                </div>
                <div className='col-lg-6 align-self-end d-flex flex-column justify-content-start align-items-end'>
                    <img style={carStyle} className='img-fluid' src={carSvg} alt=""/>   
                    <div style={MobileYellowBox} className='bg-yellow d-block d-md-none'></div>           
                </div>
            </div>
            <div style={yellowBox} className='bg-yellow d-none d-md-block'></div>
        </main>
    )
}

const carStyle : React.CSSProperties = {
    position : 'relative',
    left : '5vw',
    top : '0',
    maxWidth:'45vw',
}

const yellowBox : React.CSSProperties = {
    position : 'fixed',
    bottom : '0',
    zIndex : -1,
    left : 0,
    minHeight : '100vh',
    width : '100vw',
    maxWidth : '30%',
}
const MobileYellowBox : React.CSSProperties = {
    position : 'relative',
    zIndex : -1,
    left : 0,
    minHeight : '20vh',
    width : '100vw',
}


const mapStateToProps = (state : any) =>({
    userInfo : state.Global.userInfo
})

export default connect(mapStateToProps , {AuthUser})(MainLayout)
