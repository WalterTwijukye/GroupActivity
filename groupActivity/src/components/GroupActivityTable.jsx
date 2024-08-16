import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";


const GroupActivityTable = () => {
  const [groupActivities, setGroupActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchGroupActivities = async () => {
      try {
        const response = await axios.post("http://localhost:3001/groupActivity", {
          instanceId: "USvlLwypRfE",
        });
        setGroupActivities(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching group activities:", error);
        setIsError(true);
        setIsLoading(false);
      }
    };

    fetchGroupActivities();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading data.</div>;
  }

  return (
    <div className="container mt-5">
      <div className="row mb-3">
        <div className="col-md-3">
          <Link to="/" className="btn btn-secondary">Back</Link>
        </div>
        <div className="col-md-3 text-end">
          <button className="btn btn-primary" onClick={() => setIsAddingRecord(true)}>
            Add Row
          </button>
          <Link to="/sessions" className="btn btn-secondary ms-2">Next</Link>
        </div>
      </div>

      <h3>Group Activity</h3>
      <table className="table table-striped table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Beneficiary Type *</th>
            <th>GAT. Individual Code *</th>
            <th>Name *</th>
            <th>Sex *</th>
            <th>Age *</th>
          </tr>
        </thead>
        <tbody>
          {groupActivities.length > 0 ? (
            groupActivities.map((activity, index) => (
              <tr key={index}>
                <td>{activity.BeneficiaryType}</td>
                <td>{activity.Code}</td>
                <td>{activity.Name}</td>
                <td>{activity.Sex}</td>
                <td>{activity.Age}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default GroupActivityTable;
