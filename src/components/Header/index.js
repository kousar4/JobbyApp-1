import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import {AiFillHome} from 'react-icons/ai'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <nav className="nav-bar-container">
      <div className="nav-content">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="header-website-logo"
          />
        </Link>
        <ul className="nav-menu-list-mobile">
          <li className="nav-menu-item-mobile">
            <Link to="/" className="nav-link">
              <AiFillHome className="nav-item-img" />
            </Link>
          </li>
          <li className="nav-menu-item-mobile">
            <Link to="/jobs" className="nav-link">
              <BsFillBriefcaseFill className="nav-item-img" />
            </Link>
          </li>
          <li className="nav-menu-item-mobile">
            <button
              type="button"
              className="nav-mobile-btn"
              onClick={onClickLogout}
            >
              <FiLogOut className="nav-item-img" />
            </button>
          </li>
        </ul>
        <ul className="nav-bar-list-desktop">
          <li className="nav-bar-item-desktop">
            <Link to="/" className="nav-link-desktop">
              Home
            </Link>
            <Link to="/jobs" className="nav-link-desktop">
              Jobs
            </Link>
          </li>
          <li className="nav-bar-item-desktop">
            <button
              type="button"
              className="nav-desktop-logout-btn"
              onClick={onClickLogout}
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default withRouter(Header)
