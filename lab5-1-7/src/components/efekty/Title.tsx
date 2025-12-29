import {useState, useEffect} from 'react';

function Title(){
    let [title, setTitle] = useState<string>("Base Title");

    useEffect(() => {
        document.title = title;
    });

    return <>
        <input type="text" value={title} onChange={e => {setTitle(e.target.value)}}></input>
    </>
}

export default Title;