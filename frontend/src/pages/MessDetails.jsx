import { useContext, useState } from "react";
import "../pagesCSS/MessDetails.css";
import axios from "axios";
import {useNavigate } from "react-router-dom";
import Cookies from "js-cookie"
import UserContext from "../UseContext";


const MessDetails = () => {

  const [title ,setTitle] = useState('');
  const [price ,setPrice] = useState('');
  const [noOfMeals ,setNoOfMeals] = useState('');
  const [contactInfo ,setcontactInfo] = useState('');
  const [days ,setdays] = useState('');
  const [address ,setAddress] = useState('');
  const [detailedAddress ,setDetailedaddress] = useState('');
  const [landmark ,setLandmark] = useState('');
  const [additionalInfo ,setAddInfo] = useState('');
  const [coverimage ,setCoverimage] = useState('');

  const {user} = useContext(UserContext);
  console.log("User: ", user);

   const navigate = useNavigate();


  const handleChange = (e) =>{
    e.preventDefault();
    const id = user.id;

    let data = {
      title ,price,noOfMeals,contactInfo,days,address,detailedAddress,landmark,additionalInfo,id
    }
    
    // setData( {
    //   title ,price,noOfMeals,contactInfo,days,address,detailedAddress,landmark,additionalInfo,id
    // })
    console.log(data);
   
    console.log("Cover Image: ",coverimage);

    //logic to send data to backend
    axios.post("http://localhost:8000/mess/messdetails" ,{coverimage, data},{
      headers: {
        "Authorization": `Bearer ${Cookies.get("token")}`,
        'Content-Type': 'multipart/form-data'
      },
    })
    .then((result) =>{
      console.log("Mess: ",result);
      if(result.status == 200){
        navigate("/");
      }
      else{
        alert(result.err)
      }
    })
    .catch(err => {
      alert(err.message)
    })

  }

  return (
    <div className="details">
      
      <div className="maindiv">
        <h1>Add details</h1>

        <form action="" className="container5" >

          <label htmlFor="">Cover Image</label>
          <input type="file" name="coverimage" onChange={(e) => setCoverimage(e.target.files[0])}/>

          <label htmlFor="">Title</label>
          <input type="text" name="" id="" placeholder="Ram mess"  
            value={title} onChange={(e) =>{setTitle(e.target.value)}}
          />

          <label htmlFor="">Price (In Rs.)</label>
          <input type="number" placeholder="0" 
          value={price} onChange={(e) =>{setPrice(e.target.value)}}
          />

          <label htmlFor="">No. of Meals</label>
          <input type="number" placeholder="0" 
          value={noOfMeals} onChange={(e) =>{setNoOfMeals(e.target.value)}}
          />

          <label htmlFor="">contact Info.</label>
          <input type="tel" placeholder="98234XXXXX" 
          value={contactInfo} onChange={(e) =>{setcontactInfo(e.target.value)}}
          />

          <label htmlFor="">Days (in week)</label>
          <input type="text" placeholder="monday-saturday" 
          value={days} onChange={(e) =>{setdays(e.target.value)}}
          />

          <label htmlFor="">Address</label>
          <input type="text" placeholder="Station Road, raipur-chhattisgarh" 
            value={address} onChange={(e) =>{setAddress(e.target.value)}}
          />

          <label htmlFor=""> Detailed Address</label>
          <input type="text" placeholder="Room N 370, Kabir Nagar., , Raipur-Chhattisgarh - 492001 " 
            value={detailedAddress} onChange={(e) =>{setDetailedaddress(e.target.value)}}
          />

          <label htmlFor="">Landmark</label>
          <input type="text" placeholder="near Shiv Mandir" 
            value={landmark} onChange={(e) =>{setLandmark(e.target.value)}}
          />
          

          <label htmlFor="">Additional Information</label>
          <input type="text" placeholder="clean and cheap food" 
            value={additionalInfo} onChange={(e) =>{setAddInfo(e.target.value)}}
          />

          <button onClick={handleChange}>Add</button>

        </form>
      </div>
    </div>
  )
}

export default MessDetails;
