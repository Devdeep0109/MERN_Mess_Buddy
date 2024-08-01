import { MdOutlineLocationOn } from "react-icons/md";
import "../pagesCSS/DisplayMessDetails.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Comments from "../components/Comments";
import UserContext from "../UseContext";

const DisplayMessDetails = () => {

  // Comment useState
  const [commentinfo ,setCommentInfo] = useState("");

  const {user} = useContext(UserContext);

  const user_id = user.id


  const handleSubmit = async(e) =>{
    e.preventDefault();
    const data = {
        messId:id,
        createdBy:user_id,
        content: commentinfo
    }
    console.log("Data from handleSubmit",data);
    try{
        axios.post("http://localhost:8000/comment/createComments", {data}).then((res) => {if(res.status == 200){
            console.log(res);
            // fetchComments()
        }}).catch((err) => console.log(err))
    }
    catch(error){
        alert(error.message)
    }
  }


  const {id} = useParams();
  console.log(id);

  //storing mess data.........
  const [mess, setMessDetails] = useState();

  const [viewComment, setViewComment] = useState(false)



  useEffect( () =>{

    if(id){
        axios.get(`http://localhost:8000/mess/single/${id}`)
        .then((result) =>{
          if(result.status == 200){
            setMessDetails(result.data.data)
          }
          else{
            alert(result.data.error);

          }
        })
        .catch((error) =>{
          alert("eror from display mess:" ,error.message)
        })
    }
  },[id])

  

  // if no mess details are there........
  if (!mess) {
    return <div>Loading...</div>;
  }

  return (
    <div className="displayDetails">
      <div className="innerdiv1">
        <h2>{mess.title}</h2>
        <div>
          <MdOutlineLocationOn />
          <b>{mess.address}</b>
        </div>
        <b>+91 {mess.contactInfo}</b>
      </div>

      <div className="innerdiv2">
        <div className="information">
          <p>Price(in Rs):  <b>{mess.price}/-</b>  </p>
          <p>No. of meals: <b>{mess.noOfMeals}</b></p>
          <p>No. of days: <b>{mess.days}</b></p>
          <p>Additional Information: <b>{mess.additionalInfo}</b></p>
        </div>

        <p>Landmark: <b>{mess.landmark}</b></p>

        <div className="address">
          <>Detailed Address</><br/>
          <b>{mess.detailedAddress}</b>
          <p></p>
          
        </div>
      </div>
      <div className="innerdiv3">
      <h2>comments</h2>
      <form onSubmit={handleSubmit} >

        <input className="commentInput" type="text" value={commentinfo} onChange={(e) => setCommentInfo(e.target.value)} />
        <button type="submit" className="commmentButton">Submit</button>

      </form>

      <p onClick={() => {setViewComment(!viewComment)}} style={{cursor: 'pointer', display:'inline', color: 'gray'}} >View Comments </p>
      </div>

      {viewComment && <Comments mess_id={id} /> }    
    </div>
  )
}

export default DisplayMessDetails;
