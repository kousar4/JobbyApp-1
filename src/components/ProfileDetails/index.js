import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class ProfileDetails extends Component {
  state = {profileDetails: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getProfileDetails()
  }

  getProfileDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')

    const profileApiUrl = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(profileApiUrl, options)

    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = {
        name: fetchedData.profile_details.name,
        profileImageUrl: fetchedData.profile_details.profile_image_url,
        shortBio: fetchedData.profile_details.short_bio,
      }
      this.setState({
        profileDetails: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderProfileDetails = () => {
    const {profileDetails} = this.state
    const {name, profileImageUrl, shortBio} = profileDetails
    return (
      <div className="profile-content">
        <img src={profileImageUrl} alt="profile" className="profile-img" />
        <h1 className="profile-name">{name}</h1>
        <p className="profile-bio">{shortBio}</p>
      </div>
    )
  }

  renderProfileFailureView = () => {
    const onClickProfileRetryBtn = () => {
      this.getProfileDetails()
    }

    return (
      <div className="profile-view-container">
        <button
          type="button"
          className="profile-failure-view-button"
          onClick={onClickProfileRetryBtn}
        >
          Retry
        </button>
      </div>
    )
  }

  renderProfileLoader = () => (
    <div className="profile-view-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderProfile = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderProfileDetails()
      case apiStatusConstants.inProgress:
        return this.renderProfileLoader()
      case apiStatusConstants.failure:
        return this.renderProfileFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="profile-details-container">{this.renderProfile()}</div>
    )
  }
}

export default ProfileDetails
