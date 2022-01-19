import {MdLocationOn} from 'react-icons/md'
import {AiFillStar} from 'react-icons/ai'
import {BsBriefcaseFill} from 'react-icons/bs'
import './index.css'

const SimilarJobItem = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    title,
    rating,
    jobDescription,
    location,
    employmentType,
  } = jobDetails

  return (
    <li className="similar-job-item-container">
      <div className="similar-job-company-details-container">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
          className="similar-job-company-logo-img"
        />
        <div className="similar-job-title-rating-container">
          <h1 className="similar-job-title">{title}</h1>
          <div className="similar-job-rating-container">
            <AiFillStar className="similar-job-rating-img" />
            <p className="similar-job-rating">{rating}</p>
          </div>
        </div>
      </div>

      <h1 className="similar-job-details-heading">Description</h1>

      <p className="similar-job-description">{jobDescription}</p>
      <div className="similar-job-location-salary-container">
        <div className="similar-job-location-type-container">
          <div className="similar-job-details-item-container">
            <MdLocationOn className="similar-job-detail-item-img" />
            <p className="similar-job-detail-item-text">{location}</p>
          </div>
          <div className="similar-job-details-item-container">
            <BsBriefcaseFill className="similar-job-detail-item-img" />
            <p className="similar-job-detail-item-text">{employmentType}</p>
          </div>
        </div>
      </div>
    </li>
  )
}

export default SimilarJobItem
