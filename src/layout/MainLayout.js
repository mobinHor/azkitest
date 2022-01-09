import React,{useState , useEffect} from 'react'
import Navbar from '../components/layout/Navbar'
import { Outlet } from 'react-router-dom'
import carSvg from '../assets/icons/car-green.svg'
import {connect} from 'react-redux'
import { AuthUser } from '../Redux/actions/GlobalActions'
import Spinner from '../components/utils/Spinner'
import { useNavigate } from 'react-router-dom'

const MainLayout = ({userInfo , AuthUser}) => {

    const Navigate = useNavigate()

    const [load , setLoad] = useState(true)

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

const carStyle = {
    position : 'relative',
    left : '5vw',
    maxWidth:'45vw',
}

const yellowBox = {
    position : 'fixed',
    bottom : '0',
    zIndex : -1,
    left : 0,
    minHeight : '100vh',
    width : '100vw',
    maxWidth : '30%',
}
const MobileYellowBox = {
    position : 'relative',
    bottom : '0',
    zIndex : -1,
    left : 0,
    minHeight : '20vh',
    width : '100vw',
}

const mapStateToProps = state=>({
    userInfo : state.Global.userInfo
})

export default connect(mapStateToProps , {AuthUser})(MainLayout)
