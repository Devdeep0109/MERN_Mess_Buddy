
// import { Link } from "react-router-dom";
import CardComponent from "../components/CardComponent";
import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import "../pagesCSS/Home.css";

const Home = () => {

  const [data,setData] = useState([]);
  

const getAllMess = async () => {
  try {
    
    axios.get("http://localhost:8000/mess/allmess",{
      headers:{
        Authorization: `Bearer ${Cookies.get("token")}`
      }
    })
    .then((result) =>{
      console.log(result.data.data);
      setData(result.data.data);
    })
  } catch (error) {
    console.log(error.essage);
  }
}

useEffect(() =>{

  getAllMess();

},[])
  return (
    <div className="mainComponent">
      {/* {data.map((mess,i)=>
        <>
          <p key={i}>{mess.title}</p>
        </>
      )} */}
      
      {data.map((mess,key) => 
          <CardComponent key={key} data={mess} />
      )}
    </div>
  )
}

export default Home