import { NavLink } from "react-router-dom";

const Signin = () =>{
    return (
        <div className="App-header flex flex-col">
           
            <input type="text"  className="m-4 px-8 py-2 rounded-lg text-sm text-black" placeholder="Email or Phone Number"/>
            <input type="password"  className="m-4 px-8 py-2 rounded-lg text-sm text-black" placeholder="Password"/>
            
<div className=" flex flex-row ">
     <NavLink to="/app">
            <button className="m-8  bg-red-800 rounded-lg py-4 px-8">Sign in</button>

     </NavLink>
            <button className="m-8  bg-blue-800 rounded-lg py-4 px-8">Register</button>
        </div>
        </div>
    )
}
export default Signin;