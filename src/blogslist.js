import React , {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import fb from "./firebase";

const DB = fb.firestore()
const Blogslist = DB.collection("blogs")
.orderBy("timestamp", "desc");

const BlogslistView = () => {
    const[blogs, Setblogs] = useState([]);
    useEffect(() =>{
        const unsubscribe = Blogslist.limit(100).onSnapshot(querySnapshot => {
            // Get all documents from collection - with IDs
            const data = querySnapshot.docs.map(doc => ({
              ...doc.data(),
              id: doc.id,
            }));
            // Update state
            Setblogs(data);
          });
  
          // Detach listener
          return unsubscribe;
    }, []);

    const DeleteBlog = (id)=> {
        Blogslist.doc(id).delete().then(() => {
            alert("Document successfully deleted!");
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
    };
	
    return(
        <>
        <div style={{ marginTop: "100px" }} >
            {blogs.sort(function(a,b){
var c = new Date(a.date);
var d = new Date(b.date);
return c - d }).map(blog=> (
                <div key={blog.id}>
                  <div class="card h-75 w-75 p-3 mx-auto" style={{ marginTop: "25px" }} >
                   <h5 class="card-header">{blog.Title}</h5>
                  <div class="card-body">
                    {blog.Img ? (
                     <img src={blog.Img} alt={blog.Title} class="card-title paddingn" />
                    ) : null }
                  <p class="card-text blockquote">{blog.Body}</p>
                    <button class="btn btn-danger"
                        onClick={()=> {console.log(blog.id)}} 
                    >delete</button>
    </div>
    </div>
        </div>
        ))}
    </div>
    </>
    );
};

export default BlogslistView;
