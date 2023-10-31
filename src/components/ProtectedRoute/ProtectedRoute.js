
import {Navigate } from 'react-router-dom'
import { useUserAuth } from '../../context/UserAuthContext'

function ProtectedRoute({children}) {
    let userToken = localStorage.getItem('user')

    // console.log(userToken)
    if(!userToken){
        return <Navigate to='/login'/>
    }
    return children
}

export default ProtectedRoute