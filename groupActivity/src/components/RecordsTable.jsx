import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const RecordsTable = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [orgUnitSearchTerm, setOrgUnitSearchTerm] = useState("");
  const [selectedOrgUnit, setSelectedOrgUnit] = useState("");
  const [orgUnits, setOrgUnits] = useState([]);
  const [filteredOrgUnits, setFilteredOrgUnits] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAddingRecord, setIsAddingRecord] = useState(false);
  const [newRecord, setNewRecord] = useState({
    code: "",
    nameOfCSO: "",
    groupType: "",
    subGroup: "",
    activity: "",
    description: "",
    dateOfActivity: "",
    venue: ""
  });
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;

  // Fetch Organisation Units based on search term
  const fetchOrgUnits = async (searchTerm) => {
    try {
      const response = await fetch('http://localhost:3001/organisationUnits', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ location: searchTerm }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      const units = data.organisationUnits || [];
      setOrgUnits(units.map((unit) => ({ displayName: unit.displayName, id: unit.id })));
    } catch (error) {
      console.error("Failed to fetch orgUnits:", error);
    }
  };

  // Fetch Tracked Entity Instances based on selected Org Unit
  const fetchTrackedEntityInstances = async (orgUnitId) => {
    try {
      const response = await fetch('http://localhost:3001/trackedEntityInstances', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orgUnitId }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      const rows = data.rows || [];
      const mappedData = rows.map((row) => ({
        code: row[8],
        nameOfCSO: row[9],
        groupType: row[10],
        subGroup: row[12],
        activity: row[13],
        description: row[14],
        dateOfActivity: row[15],
        venue: row[16],
      }));
      setFilteredData(mappedData);
    } catch (error) {
      console.error("Failed to fetch tracked entity instances:", error);
    }
  };

  // Effect to fetch tracked entity instances when selectedOrgUnit changes
  useEffect(() => {
    if (selectedOrgUnit) {
      fetchTrackedEntityInstances(selectedOrgUnit);
    }
  }, [selectedOrgUnit]);

  // Handle input change for search term
  const handleOrgUnitSearch = async (e) => {
    const searchValue = e.target.value.toLowerCase();
    setOrgUnitSearchTerm(searchValue);

    if (searchValue === "") {
      setFilteredOrgUnits([]);
      setIsDropdownOpen(false);
      return;
    }

    // Fetch org units when the user types something
    await fetchOrgUnits(searchValue);

    // Update filteredOrgUnits based on the new search term
    const filteredUnits = orgUnits.filter(unit => 
      unit.displayName.toLowerCase().includes(searchValue)
    );
    setFilteredOrgUnits(filteredUnits);
    setIsDropdownOpen(true);
  };

  // Handle org unit selection
  const handleOrgUnitSelect = (unit) => {
    setSelectedOrgUnit(unit.id);
    setOrgUnitSearchTerm(unit.displayName);
    setFilteredOrgUnits([]);
    setIsDropdownOpen(false);
  };

  // Close dropdown when focus is lost
  const handleBlur = () => {
    setTimeout(() => setIsDropdownOpen(false), 200);
  };

  // Pagination calculations
  const totalPages = Math.ceil(filteredData.length / recordsPerPage);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredData.slice(indexOfFirstRecord, indexOfLastRecord);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container mt-5">
      <div className="row mb-3">
        <div className="col-md-3">
          <div className="position-relative">
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Search OrgUnit..."
              value={orgUnitSearchTerm}
              onChange={handleOrgUnitSearch}
              onFocus={() => setIsDropdownOpen(true)}
              onBlur={handleBlur}
            />
            {isDropdownOpen && filteredOrgUnits.length > 0 && (
              <ul className="list-group position-absolute w-100" style={{ zIndex: 1, maxHeight: '200px', overflowY: 'auto' }}>
                {filteredOrgUnits.map((org, index) => (
                  <li
                    key={index}
                    className="list-group-item list-group-item-action"
                    onMouseDown={() => handleOrgUnitSelect(org)}
                  >
                    {org.displayName}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className="col-md-3 text-end">
          <button className="btn btn-primary" onClick={() => setIsAddingRecord(true)}>
            Add Record
          </button>
          {/* <Link to="/group-activity" className="btn btn-secondary ms-2">Next Table</Link> */}
        </div>
      </div>

      <table className="table table-striped table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Code</th>
            <th>Name of CSO/P</th>
            <th>Group Type</th>
            <th>Sub Group</th>
            <th>Activity</th>
            <th>Description</th>
            <th>Date of Activity</th>
            <th>Venue</th>
          </tr>
        </thead>
        <tbody>
          {currentRecords.length > 0 ? (
            currentRecords.map((item, index) => (
              <tr key={index}>
                <td><Link to={`/group-activity`} className="link">{item.code}</Link></td>
                <td><Link to={`/group-activity`} className="link">{item.nameOfCSO}</Link></td>
                <td><Link to={`/group-activity`} className="link">{item.groupType}</Link></td>
                <td><Link to={`/group-activity`} className="link">{item.subGroup}</Link></td>
                <td><Link to={`/group-activity`} className="link">{item.activity}</Link></td>
                <td><Link to={`/group-activity`} className="link">{item.description}</Link></td>
                <td><Link to={`/group-activity`} className="link">{item.dateOfActivity}</Link></td>
                <td><Link to={`/group-activity`} className="link">{item.venue}</Link></td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center">
                No data found
              </td>
            </tr>
          )}

          {isAddingRecord && (
            <tr>
              <td>
                <input
                  type="text"
                  name="code"
                  value={newRecord.code}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </td>
              <td>
                <input
                  type="text"
                  name="nameOfCSO"
                  value={newRecord.nameOfCSO}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </td>
              <td>
                <input
                  type="text"
                  name="groupType"
                  value={newRecord.groupType}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </td>
              <td>
                <input
                  type="text"
                  name="subGroup"
                  value={newRecord.subGroup}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </td>
              <td>
                <input
                  type="text"
                  name="activity"
                  value={newRecord.activity}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </td>
              <td>
                <input
                  type="text"
                  name="description"
                  value={newRecord.description}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </td>
              <td>
                <input
                  type="date"
                  name="dateOfActivity"
                  value={newRecord.dateOfActivity}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </td>
              <td>
                <input
                  type="text"
                  name="venue"
                  value={newRecord.venue}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </td>
              <td>
                <button className="btn btn-success" onClick={handleAddRecord}>Save</button>
                <button className="btn btn-secondary" onClick={() => setIsAddingRecord(false)}>Cancel</button>
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <nav aria-label="Page navigation">
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <button
              className="page-link"
              onClick={() => handlePageChange(currentPage - 1)}
              aria-label="Previous"
            >
              <span aria-hidden="true">&laquo;</span>
            </button>
          </li>
          {Array.from({ length: totalPages }, (_, index) => (
            <li
              key={index}
              className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
            >
              <button
                className="page-link"
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            </li>
          ))}
          <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
            {/* <button
              className="page-link"
              onClick={() => handlePageChange(currentPage + 1)}
              aria-label="Next"
            >
              <span aria-hidden="true">&raquo;</span>
            </button> */}
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default RecordsTable;
