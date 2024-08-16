import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import RecordsTable from "./components/RecordsTable1";
import GroupActivityTable from "./components/GroupActivityTable";
import SessionsTable from "./components/SessionsTable";

import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<RecordsTable />} />
          <Route path="/group-activity" element={<GroupActivityTable />} />
          <Route path="/sessions" element={<SessionsTable />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
