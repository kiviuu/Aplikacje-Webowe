import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Licznik from './components/Licznik';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import Blog from './Pages/Blog';
import { ArticlesContext } from './components/ArticlesContext';
import AddArticle from './Pages/AddArticle';
import Article from './Pages/Article';
import Home from './Pages/Home';

interface ArticleData{
  id: number,
  title: string,
  body: string
}


function App() {
  const [articles, setArticles] = useState<ArticleData[]>(() => {
    const saved = window.localStorage.getItem("datas");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    window.localStorage.setItem("datas", JSON.stringify(articles));
  }, [articles]);

  return <>
  <ArticlesContext.Provider value={{articles,setArticles}}>
    <BrowserRouter>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/blog">Blog</Link>
                <Link to="/add">Add</Link>
            </nav>
            <Routes>
                <Route path='/' element={<Home />}></Route>
                <Route path='/blog' element={<Blog />}></Route>
                <Route path='/add' element={<AddArticle />}></Route>
                <Route path="/article/:id" element={<Article />} />
            </Routes>
    </BrowserRouter>
    </ArticlesContext.Provider>
  </>
}

export default App
