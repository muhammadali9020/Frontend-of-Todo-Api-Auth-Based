import { Navigate } from 'react-router'
const IsAuth = ({ children }) => {
    const checkCookie = document.cookie
    if (!checkCookie) {
        return <Navigate to={'/login'} replace />
    }
    else {
        return children
    }
}

export default IsAuth