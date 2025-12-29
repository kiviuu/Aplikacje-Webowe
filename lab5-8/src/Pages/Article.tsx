import { useContext } from 'react';
import {useParams} from 'react-router-dom';
import { ArticlesContext } from '../components/ArticlesContext';

interface ArticleData{
  id: number,
  title: string,
  body: string
}

function Article(){
    const {id} = useParams<{id:string}>();
    const context = useContext(ArticlesContext);
    if (!context) return <><div>Sth is not working :C</div></>
    const art:ArticleData|undefined = context.articles.find(a => a.id===Number(id));
    if (art===undefined) return <><div>Article with this Id does not exsist :C</div></>
    return <>
        <div>{id}   {art.title}</div>
        <div>{art.body}</div>
    </>
}
export default Article;