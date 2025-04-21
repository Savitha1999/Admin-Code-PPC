




import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Admin from "./Admin";
import Dashboard from "./Dashboard";
import EditProperty from "./EditProperty";
import GetForm from "./DataAddAdmin/GetForm";
import AdminSetForm from "./DataAddAdmin/AdminSetForm";
import Plan from "./Plan";
import Detail from "./Detail";
import GetBuyerAssistance from "./GetBuyerAssistance";
import PropertyAssistance from "./PropertyAssistance";
import { useDispatch } from 'react-redux';
import { setName } from './redux/adminSlice';



const App = () => {

  
  const dispatch = useDispatch();

  useEffect(() => {
    const name = localStorage.getItem('name');
    if (name) {
      dispatch(setName(name));
    }
  }, [dispatch]);
  
  return (
    // <Router>
    //   <Routes>
    //     <Route path="/process" element={<Navigate to="/admin" />} />
    //     <Route path="/admin" element={<Admin />} />
    //     <Route path="/dashboard/*" element={<Dashboard />} />

    //      {/* <Route path="/edit-property" element={<EditProperty />} />
    //     <Route path="/mode" element={<GetForm />} />
    //     <Route path="/type" element={<AdminSetForm />} />
    //     <Route path="/plan" element={<Plan />} />
    //     <Route path="/detail" element={<Detail />} />
    //     <Route path="/property-assistance" element={<PropertyAssistance />} /> */}

    //   </Routes>
    // </Router>

    <Router basename="/process">
    <Routes>
      <Route path="/admin" element={<Admin />} />
      <Route path="/dashboard/*" element={<Dashboard />} />
      <Route path="*" element={<Navigate to="/admin" replace />} />
    </Routes>
    </Router>
    
  );
};

export default App;




