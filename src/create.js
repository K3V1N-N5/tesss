import React, {useState} from "react";
import { uploadBytes, getDownloadURL } from 'firebase/storage';
import fb from "./firebase";
import { useNavigate } from "react-router-dom";

const DB = fb.firestore()
const Blogslist = DB.collection('blogs');
const storage = fb.storage;
const ref = fb.refStorage;

const CreateBlog = () => {
	const navigate = useNavigate();
	
    const uuid = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    let r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

    const uuidPrimary = uuid();
    const[title, SetTitle] = useState("");
    const[body, SetBody] = useState("");
    const[img, SetImage] = useState("");

    const submit = async (e) => {
	    const uuidSecond = uuidPrimary;
	    alert("Please Wait 5-15 Seconds");
            const dataFile = document.getElementById("files").files[0];
            if(dataFile !== undefined) {
               uploadBytes(ref(storage, `${uuidPrimary}/${dataFile?.name}`), dataFile).then((res1) => {
		       getDownloadURL(ref(storage, `${uuidSecond}/${dataFile?.name}`)).then((url) => {
                            Blogslist.add({
            Title: title,
            Body: body,
            Img: url,
	    timestamp: fb.firestore.FieldValue.serverTimestamp()
        }).then((docRef)=> {
            alert("data successfully submit");
            navigate("/");    
        }).catch((error) => {
            alert(error);
            console.error("error:", error);
        });
	               });
	       })
	}
    }

    const HandleFiles = async (e) => {
        if(e.files[0] !== undefined && e.files[0]?.type.includes("image/")) {
            alert(e.files[0]?.name);
            document.getElementById("submit").disabled = false;     
        } else {
            alert(`${e.files[0]?.name} Not Image!`);
            document.getElementById("submit").disabled = true;
        }
    }
    
    return(
        <div>
            <div>    
            <input type="text" placeholder="Title" 
            onChange={(e)=>{SetTitle(e.target.value)}} required />

            <textarea  name="content" type="text" placeholder="write your content here" 
            rows="10" cols="150" onChange={(e)=>{SetBody(e.target.value)}} required >
            </textarea>
            <input type="file" id="files"
            onChange={(e)=>{HandleFiles(e.target)}} required />

            <button id="submit" onClick={(event) => {submit(event)}}>Submit</button>
         </div>
        </div>
    );
};

export default CreateBlog;
