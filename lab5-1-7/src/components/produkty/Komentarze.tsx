import {useState, useEffect} from 'react';
import Komentarz from './Komentarz';

interface User {
    id: number,
    username: string,
    fullName: string
}

interface KomData{
    id:number, 
    body:string, 
    postId:number, 
    likes:number, 
    user:User
}

function Komentarze(){
    let [comments, setComments] = useState<KomData[]>([]);
    let [errorMsg, setErrorMsg] = useState<string>("");


    useEffect(()=>{

        fetch("https://dummyjson.com/comments")
            .then(resp => {
                if(!resp.ok){
                    setErrorMsg("Something went wrong :(");
                }
                return resp.json();
            })
            .then( (data) => {
                setComments(data.comments);
            })
            .catch(e => {
                setErrorMsg("Something went wrong during fetch process :(")
            });

    },[]);

    return <>
        <div>
            <div>{errorMsg}</div>
            {comments.map(kom => (<Komentarz id={kom.id} postId={kom.postId} body={kom.body} 
            likes={kom.likes} user={kom.user}/>) )}
        </div>
    </>
}

export default Komentarze;