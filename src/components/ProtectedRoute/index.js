import {Route, Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

const ProtectRoute = props => {
  const accessToken = Cookies.get('jwt_token')
  if (accessToken === undefined) {
    return <Redirect to="/login" />
  }
  return <Route {...props} />
}

export default ProtectRoute
