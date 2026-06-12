import { Navigate } from 'react-router'
const IsAuth = ({ children }) => {
    const checkToken = localStorage.getItem("token")
    console.log("from auth checkToken",checkToken)
    if (!checkToken) {
        return <Navigate to={'/login'} replace />
    }
    else {
        return children
    }
}

export default IsAuth
