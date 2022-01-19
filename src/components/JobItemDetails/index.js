import {Component} from 'react'

import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {MdLocationOn} from 'react-icons/md'
import {AiFillStar} from 'react-icons/ai'
import {BsBriefcaseFill} from 'react-icons/bs'
import {FiExternalLink} from 'react-icons/fi'

import Header from '../Header'
import SimilarJobItem from '../SimilarJobItem'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobItemDetails extends Component {
  state = {
    jobDetailsData: {},
    similarJobsData: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobItemDetails()
  }

  getJobItemDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jobDetailsApiUrl = `https://apis.ccbp.in/jobs/${id}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(jobDetailsApiUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()

      const jobDetails = fetchedData.job_details
      const formatJobDetails = {
        id: jobDetails.id,
        companyLogoUrl: jobDetails.company_logo_url,
        companyWebsiteUrl: jobDetails.company_website_url,
        employmentType: jobDetails.employment_type,
        jobDescription: jobDetails.job_description,
        location: jobDetails.location,
        packagePerAnnum: jobDetails.package_per_annum,
        rating: jobDetails.rating,
        title: jobDetails.title,
      }

      const updatedLifeAtCompany = {
        description: jobDetails.life_at_company.description,
        imageUrl: jobDetails.life_at_company.image_url,
      }

      const updatedSkills = jobDetails.skills.map(eachSkill => ({
        name: eachSkill.name,
        imageUrl: eachSkill.image_url,
      }))

      const updatedSimilarJobs = fetchedData.similar_jobs.map(eachJob => ({
        id: eachJob.id,
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        rating: eachJob.rating,
        title: eachJob.title,
      }))

      this.setState({
        jobDetailsData: {
          ...formatJobDetails,
          lifeAtCompany: updatedLifeAtCompany,
          skills: updatedSkills,
        },
        similarJobsData: updatedSimilarJobs,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoader = () => (
    <div className="specific-job-loader-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => {
    const onClickFailureRetryBtn = () => {
      this.getJobItemDetails()
    }

    return (
      <div className="specific-job-failure-view-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
          alt="failure view"
          className="specific-job-failure-view-img"
        />
        <h1 className="specific-job-failure-view-heading">
          Oops! Something Went Wrong
        </h1>
        <p className="specific-job-failure-view-description">
          We cannot seem to find the page you are looking for.
        </p>

        <button
          type="button"
          className="specific-job-failure-view-button"
          onClick={onClickFailureRetryBtn}
        >
          Retry
        </button>
      </div>
    )
  }

  renderJobItemDetails = () => {
    const {jobDetailsData, similarJobsData} = this.state
    console.log(jobDetailsData, similarJobsData)
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      title,
      skills,
      lifeAtCompany,
    } = jobDetailsData

    const {imageUrl, description} = lifeAtCompany

    return (
      <div className="jobs-item-container">
        <div className="specific-job-item-container">
          <div className="specific-job-company-details-container">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
              className="specific-job-company-logo-img"
            />
            <div className="specific-job-title-rating-container">
              <h1 className="specific-job-title">{title}</h1>
              <div className="specific-job-rating-container">
                <AiFillStar className="specific-job-rating-img" />
                <p className="specific-job-rating">{rating}</p>
              </div>
            </div>
          </div>
          <div className="specific-job-location-salary-container">
            <div className="specific-job-location-type-container">
              <div className="specific-job-details-item-container">
                <MdLocationOn className="specific-job-detail-item-img" />
                <p className="specific-job-detail-item-text">{location}</p>
              </div>
              <div className="specific-job-details-item-container">
                <BsBriefcaseFill className="specific-job-detail-item-img" />
                <p className="specific-job-detail-item-text">
                  {employmentType}
                </p>
              </div>
            </div>
            <p className="specific-job-package">{packagePerAnnum}</p>
          </div>
          <hr className="specific-job-horizontal-line" />
          <div className="specific-job-description-container">
            <h2 className="specific-job-details-heading">Description</h2>
            <a href={companyWebsiteUrl} className="specific-job-company-url">
              <p>Visit</p>
              <FiExternalLink className="specific-job-company-link-icon" />
            </a>
          </div>
          <p className="specific-job-description">{jobDescription}</p>
          <h1 className="specific-job-details-heading">skills</h1>
          <ul className="specific-job-skills-list">
            {skills.map(skill => (
              <li className="each-skill-container" key={skill.name}>
                <img
                  src={skill.imageUrl}
                  className="specific-skill-img"
                  alt={skill.name}
                />
                <p className="specific-skill-name">{skill.name}</p>
              </li>
            ))}
          </ul>
          <h1 className="specific-job-details-heading">Life at Company</h1>
          <div className="specific-job-life-company-container">
            <p className="specific-job-life-description">{description}</p>
            <div className="life-at-company-img-container">
              <img
                src={imageUrl}
                alt="life at company"
                className="life-at-company-img"
              />
            </div>
          </div>
        </div>
        <h1 className="similar-jobs-heading">Similar Jobs</h1>
        <ul className="similar-jobs-list">
          {similarJobsData.map(eachJob => (
            <SimilarJobItem key={eachJob.id} jobDetails={eachJob} />
          ))}
        </ul>
      </div>
    )
  }

  renderJobDetails = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobItemDetails()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="job-item-details-container">
          {this.renderJobDetails()}
        </div>
      </>
    )
  }
}

export default JobItemDetails
