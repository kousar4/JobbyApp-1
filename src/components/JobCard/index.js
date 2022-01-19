import {Link} from 'react-router-dom'
import './index.css'
import {MdLocationOn} from 'react-icons/md'
import {AiFillStar} from 'react-icons/ai'
import {BsBriefcaseFill} from 'react-icons/bs'

const JobCard = props => {
  const {jobData} = props
  const {
    id,
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobData
  return (
    <li className="job-item-container">
      <Link to={`/jobs/${id}`} className="job-link-item">
        <div className="company-details-container">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="company-logo-img"
          />
          <div className="title-rating-container">
            <h1 className="job-title">{title}</h1>
            <div className="rating-container">
              <AiFillStar className="rating-img" />
              <p className="job-rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="location-salary-container">
          <div className="location-type-container">
            <div className="job-details-item-container">
              <MdLocationOn className="job-detail-item-img" />
              <p className="job-detail-item-text">{location}</p>
            </div>
            <div className="job-details-item-container">
              <BsBriefcaseFill className="job-detail-item-img" />
              <p className="job-detail-item-text">{employmentType}</p>
            </div>
          </div>
          <p className="job-package">{packagePerAnnum}</p>
        </div>
        <hr className="job-horizontal-line" />
        <h1 className="job-description-heading">Description</h1>
        <p className="job-description">{jobDescription}</p>
      </Link>
    </li>
  )
}

export default JobCard
