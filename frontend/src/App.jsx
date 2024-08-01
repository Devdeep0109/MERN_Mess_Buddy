import './App.css';
import {Routes ,Route} from "react-router-dom";
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS here
import UserContext from './UseContext';
import axios from 'axios';
import Cookies from "js-cookie"
import { useEffect, useState } from 'react';
import NavbarComponent from "./components/NavbarComponent"
import MessDetails from './pages/MessDetails';
import DisplayMessDetails from './pages/DisplayMessDetails';

function App() {

 
  const [user, setUser] = useState({
    name: "",
    id :"",
    email: "",
    state: false
  })
  const getUser = async () => {
    try {
      axios.get("http://localhost:8000/api/profile", {
        headers:{
          "Authorization": `Bearer ${Cookies.get("token")}`
        }
      }).then(res => {
        console.log("Before json res: ",res.data);
        if(!res.data.success){
          alert(res.data.error);
        }
        else{
          console.log("name: ",res.data.data.username);
       
          setUser({
            name:  res.data.data.username,
            state: true,
            id: res.data.data._id
          })
          console.log("User instance",user);
        }
        
      })

    } catch (error) {
      console.log(error.message);
    }
  }
  
  useEffect(() => {
    getUser()
  }, [])
  

  return (
    <UserContext.Provider value={{user,setUser, getUser}}>
      <NavbarComponent/>
   <Routes>
    <Route path="/" element={<Home/>} />
    <Route path="/signup" element={<SignUp/>} />
    <Route path="/signin" element={<SignIn/>} />
    <Route path="/addmess" element={<MessDetails/>} />
    <Route path="/displaymess" element={<DisplayMessDetails/>} />
    <Route path="/displaymess/:id" element={<DisplayMessDetails/>} />
    
   </Routes>
    </UserContext.Provider>
  )
}

export default App
