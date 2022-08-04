import { Routes, Route } from "react-router-dom";
import App from "../App";
import Signin from "./Signin";

const All_routes = () =>{
    return (
        <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/app" element={<App />} />
        
      </Routes> 
    )
}
export default All_routes;