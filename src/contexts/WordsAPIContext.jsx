import { createContext } from "react";

const WordsAPIContext = createContext({
   wordsAPI: [],
   fetchWordsAPIFunc: () => {},
   addWordAPIFunc: () => {},
   updateWordAPIFunc: () => {},
   deleteWordAPIFunc: () => {},
});

export default WordsAPIContext;

// Этот контекст хранит данные и функции, связанные со словами, которые будут доступны всем компонентам, находящимся в его пределах.
// Начальный набор данных и функций в контексте пустой:
// (words: [], fetchWords: () => {}, ...), 
// они заполнены в App.jsx.
// можно вместо () => {} вставить null