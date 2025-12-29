import { useContext } from 'react';
import { ArticlesContext } from '../components/ArticlesContext';
import Article from './Article';
import {Link} from 'react-router-dom';

function Blog(){
    const context = useContext(ArticlesContext);
    if (!context) return <><div>Sth is not working :C</div></>
    return <>
        <div>
            <ul>
            {context.articles.map( article => (
                <div className='art-link'>
                    <Link to={`/article/${article.id}`}>
                        {article.id}   {article.title}
                    </Link>
                </div>
            ) ) }
            </ul>
        </div>
    </>
}
export default Blog;