import {useState} from 'react';

interface user {
    id: number,
    username: string,
    fullName: string
}

interface komProps{
    id:number, 
    postId:number, 
    body:string, 
    likes:number, 
    user:user
}

function Komentarz( { id, postId, body, likes, user }: komProps ){
    let [likesCnt, setLikesCnt] = useState<number>(likes);
    let [isLiked, setIsLiked] = useState<boolean>(false);

    return <>
        <div className="kom">
            <div>
                <span>USER: {user.id} {user.username} {user.fullName}</span>
            </div>
            <div>
                <span>POST_ID: {postId}  KOM_ID: {id}</span>
                <span>{body}</span>
            </div>
            <small>Likes: {likesCnt}</small>
            <input type="button" onClick={ () => {
                if(isLiked) setLikesCnt(prev => prev - 1);
                else setLikesCnt(prev => prev + 1);
                setIsLiked(prev => !prev);
            } }
            value={isLiked ? "UNLIKE" : "LIKE"}></input>
        </div>
    </>
}

export default Komentarz;