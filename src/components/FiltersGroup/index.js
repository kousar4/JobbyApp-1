import ProfileDetails from '../ProfileDetails'
import './index.css'

const FiltersGroup = props => {
  const renderSalaryRangeList = () => {
    const {salaryRangesList} = props
    return salaryRangesList.map(eachRange => {
      const {activeSalaryRangeId, changeSalaryRange} = props
      const onClickSalaryRange = () =>
        changeSalaryRange(eachRange.salaryRangeId)

      return (
        <li key={eachRange.salaryRangeId} className="filter-item-container">
          <input
            type="radio"
            id={eachRange.salaryRangeId}
            onChange={onClickSalaryRange}
            checked={activeSalaryRangeId === eachRange.salaryRangeId}
          />
          <label
            className="filter-item-type-label"
            htmlFor={eachRange.salaryRangeId}
          >
            {eachRange.label}
          </label>
        </li>
      )
    })
  }

  const renderSalaryRangeFilters = () => (
    <>
      <h1 className="filter-type-heading">Salary Range</h1>
      <ul className="filter-type-list">{renderSalaryRangeList()}</ul>
    </>
  )

  const renderEmploymentTypeList = () => {
    const {employmentTypesList} = props
    return employmentTypesList.map(eachType => {
      const {removeEmploymentType, changeEmploymentType} = props
      const onClickEmploymentType = event => {
        if (event.target.checked === true) {
          changeEmploymentType(event.target.value)
        } else {
          removeEmploymentType(event.target.value)
        }
      }
      return (
        <li key={eachType.employmentTypeId} className="filter-item-container">
          <input
            type="checkbox"
            value={eachType.employmentTypeId}
            id={eachType.employmentTypeId}
            onChange={onClickEmploymentType}
          />
          <label
            className="filter-item-type-label"
            htmlFor={eachType.employmentTypeId}
          >
            {eachType.label}
          </label>
        </li>
      )
    })
  }

  const renderEmploymentTypeCategories = () => (
    <>
      <h1 className="filter-type-heading">Type of Employment</h1>
      <ul className="filter-type-list">{renderEmploymentTypeList()}</ul>
    </>
  )
  return (
    <div className="filters-container">
      <ProfileDetails />
      <hr className="line" />
      {renderEmploymentTypeCategories()}
      <hr className="line" />
      {renderSalaryRangeFilters()}
    </div>
  )
}

export default FiltersGroup
