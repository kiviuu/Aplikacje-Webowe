import { createContext } from "react";

export interface ArticleData {
  id: number;
  title: string;
  body: string;
}

export const ArticlesContext = createContext<{
  articles: ArticleData[],
  setArticles: React.Dispatch<React.SetStateAction<ArticleData[]>>
} | null>(null);