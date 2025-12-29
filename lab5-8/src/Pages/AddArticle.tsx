import { useContext, useState } from 'react';
import { ArticlesContext } from '../components/ArticlesContext';
import { useNavigate } from 'react-router-dom';

interface ArticleData{
  id: number,
  title: string,
  body: string
}


function AddArticle(){
    const context = useContext(ArticlesContext);
    const navigate = useNavigate();
    if (!context) return <><div>Sth is not working :C</div></>

    const lastIdx = context.articles.length > 0 
    ? Math.max(...context.articles.map(el => el.id)) 
    : 0;

    let [title, setTitle] = useState<string>("");
    let [body, setBody] = useState<string>("");

    return <>
        <div>
            <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
            <input type="text" value={body} onChange={e => setBody(e.target.value)} />
            <input type="button" value="Add" onClick={ e=> {
                if(title==="" || body==="") alert("Some field is missing!");
                else{
                    let tempKom:ArticleData = {
                        id: lastIdx+1,
                        title: title,
                        body: body
                    };
                    context.setArticles(prev => [...prev, tempKom]);
                    navigate(`/blog`);
                }
            } } />
        </div>
    </>
}
export default AddArticle;