import React, { useState } from 'react';
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ Component }) => {
 
    return !!localStorage.getItem("userToken") || new URLSearchParams(location.search).get("token") ? <Component /> : <Navigate to="/" />;
    
};

export default PrivateRoute;