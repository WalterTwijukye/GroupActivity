import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";


const SessionsTable = () => {
  const [sessions, setSessions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await axios.post('http://localhost:3001/sessions', {
          instanceId: 'USvlLwypRfE'
        });
        setSessions(response.data);
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching sessions:', err);
        setError('Error fetching sessions data');
        setIsLoading(false);
      }
    };

    fetchSessions();
  }, []);

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
          {/* <Link to="/sessions" className="btn btn-secondary ms-2">Next</Link> */}
        </div>
      </div>  
      <h3>Sessions</h3>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th>GAT. Individual Code *</th>
              <th>Session</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {sessions.length > 0 ? (
              sessions.map((session, index) => (
                <tr key={index}>
                  <td>{session.Code}</td>
                  <td>{session.Session}</td>
                  <td>{session.SessionDate}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SessionsTable;
