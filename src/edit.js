import React , {useState, useEffect} from "react";
import { useParams } from 'react-router-dom';
import fb from "./firebase";
const DB =fb.firestore()
const Blogslist = DB.collection('blogs');

const BlogEdit = () => {
    const { id } = useParams();

    const [title , SetTitle] = useState("");
    const [body , SetBody] = useState("");
    const [img, SetImage] = useState(null);

    useEffect( ()=> {
        Blogslist.doc(id).get().then((snapshot) => {
            const data = snapshot.data();
            SetTitle(data.Title);
            SetBody(data.Body);
	    SetImage(data.Img);
        });
    },[]);
        
    const submit =(e)=> {
        e.preventDefault();
        Blogslist.doc(id).update({
            Title: title,
            Body: body,
	    Img: img
        })
        .then((docRef)=> {
            alert("data successfully submit")
        })
        .catch((error) => {
            console.error("error:", error);
        });
    }
    return(
        <div>
            
            <form onSubmit={(event) => {alert(event)}}>    
            <input type="text" placeholder="Title" value={title}
            onChange={(e)=>{SetTitle(e.target.value)}} required />

            <textarea  name="content" type="text" value={body} 
            placeholder="write yoyr content here" 
            rows="10" cols="150" onChange={(e)=>{SetBody(e.target.value)}} required >
            </textarea>
            <input type="text" placeholder="Image Link(Opsional)" 
            onChange={(e)=>{SetImage(e.target.value)}} />

            <button type="submit">Submit</button>
        </form>
        </div>
    );
};
export default BlogEdit;
