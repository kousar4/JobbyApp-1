import {Component} from 'react'

import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import Header from '../Header'
import FiltersGroup from '../FiltersGroup'
import JobCard from '../JobCard'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Jobs extends Component {
  state = {
    jobsList: [],
    apiStatus: apiStatusConstants.initial,
    searchInput: '',
    activeEmploymentTypeId: [],
    activeSalaryRangeId: '',
  }

  componentDidMount = () => {
    this.getJobs()
  }

  getJobs = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {
      activeEmploymentTypeId,
      activeSalaryRangeId,
      searchInput,
    } = this.state
    const jwtToken = Cookies.get('jwt_token')
    const employmentTypeIds = activeEmploymentTypeId.join(',')
    console.log(employmentTypeIds)

    const jobsApiUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentTypeIds}&minimum_package=${activeSalaryRangeId}&search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(jobsApiUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.jobs.map(eachJob => ({
        id: eachJob.id,
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        packagePerAnnum: eachJob.package_per_annum,
        title: eachJob.title,
        rating: eachJob.rating,
      }))
      this.setState({
        jobsList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderJobsList = () => {
    const {jobsList} = this.state
    const showJobsList = jobsList.length > 0

    return showJobsList ? (
      <ul className="jobs-list">
        {jobsList.map(eachJob => (
          <JobCard key={eachJob.id} jobData={eachJob} />
        ))}
      </ul>
    ) : (
      <div className="failure-view-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
          className="failure-view-img"
        />
        <h1 className="failure-view-heading">No Jobs Found</h1>
        <p className="failure-view-description">
          We could not find any jobs. Try other filters
        </p>
      </div>
    )
  }

  renderLoader = () => (
    <div className="jobs-loader-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => {
    const onClickJobsFailureRetryBtn = () => {
      this.getJobs()
    }

    return (
      <div className="failure-view-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
          alt="failure view"
          className="failure-view-img"
        />
        <h1 className="failure-view-heading">Oops! Something Went Wrong</h1>
        <p className="failure-view-description">
          We cannot seem to find the page you are looking for.
        </p>

        <button
          type="button"
          className="failure-view-button"
          onClick={onClickJobsFailureRetryBtn}
        >
          Retry
        </button>
      </div>
    )
  }

  renderAllJobs = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobsList()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onEnterSearchInput = event => {
    if (event.key === 'Enter') {
      this.getJobs()
    }
  }

  onClickSearchBtn = () => {
    this.getJobs()
  }

  changeEmploymentType = employmentTypeId => {
    this.setState(
      prevState => ({
        activeEmploymentTypeId: [
          ...prevState.activeEmploymentTypeId,
          employmentTypeId,
        ],
      }),
      this.getJobs,
    )
  }

  removeEmploymentType = employmentTypeId => {
    const {activeEmploymentTypeId} = this.state
    const updatedActiveEmploymentTypeId = activeEmploymentTypeId.filter(
      eachType => eachType !== employmentTypeId,
    )
    this.setState(
      {activeEmploymentTypeId: updatedActiveEmploymentTypeId},
      this.getJobs,
    )
  }

  changeSalaryRange = activeSalaryRangeId => {
    this.setState({activeSalaryRangeId}, this.getJobs)
  }

  render() {
    const {
      searchInput,
      activeEmploymentTypeId,
      activeSalaryRangeId,
    } = this.state

    console.log(activeEmploymentTypeId)

    return (
      <>
        <Header />
        <div className="jobs-container">
          <div className="search-input-container small-view-search">
            <input
              value={searchInput}
              type="search"
              className="search-input"
              placeholder="Search"
              onChange={this.onChangeSearchInput}
              onKeyDown={this.onEnterSearchInput}
            />
            <button
              type="button"
              testid="searchButton"
              className="search-icon-container"
              onClick={this.onClickSearchBtn}
            >
              <BsSearch className="search-icon" />
            </button>
          </div>
          <FiltersGroup
            employmentTypesList={employmentTypesList}
            salaryRangesList={salaryRangesList}
            activeEmploymentTypeId={activeEmploymentTypeId}
            changeEmploymentType={this.changeEmploymentType}
            removeEmploymentType={this.removeEmploymentType}
            activeSalaryRangeId={activeSalaryRangeId}
            changeSalaryRange={this.changeSalaryRange}
          />
          <div className="search-jobs-list-container">
            <div className="search-input-container large-view-search">
              <input
                value={searchInput}
                type="search"
                className="search-input"
                placeholder="Search"
                onChange={this.onChangeSearchInput}
                onKeyDown={this.onEnterSearchInput}
              />
              <button
                type="button"
                testid="searchButton"
                className="search-icon-container"
                onClick={this.onClickSearchBtn}
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            {this.renderAllJobs()}
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
