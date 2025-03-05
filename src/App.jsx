import { Routes, Route } from 'react-router';
import Sidebar from './components/Sidebar/Sidebar';
import PageHome from './components/PageHome/PageHome';
import PageWords from './components/PageWords/PageWords';
import PagePractice from './components/PagePractice/PagePractice';

// import PageWordsAPI from './components/PageWordsAPI/PageWordsAPI';
// import PagePracticeAPI from './components/PagePracticeAPI/PagePracticeAPI';
// import { useState } from 'react';
// import WordsAPIContext from './contexts/WordsAPIContext';

import PageHelp from './components/PageHelp/PageHelp';
import PageNoFound from './components/PageNoFound/PageNoFound';

import './App.css';
import './variables.css';

function App() {
  // const [wordsAPI, setWordsAPI] = useState([]);
  
  // // можно прописать с помощью async/await, а можно с помощью then/then/catch
  // const fetchWordsAPIFunc = async () => {
  //   const response = await fetch("/api/words"); // что бы использовать такие запросы fetch("/api/words"), настроен proxy в vite.config.js
  //   const data = await response.json(); // Метод json читает ответ от сервера в формате json и возвращает промис. Из этого промиса потом можно доставать нужные нам данные.
  //   setWordsAPI(data); // Обновляет состояние wordsAPI данными с сервера.
  // };

  // const addWordAPIFunc = async (newWordAPI) => {
  //   const response = await fetch("/api/words/add", { // fetch — делает сетевой запрос на указанный адрес.
  //     method: "POST", // Мы отправляем запрос типа POST — это означает, что мы хотим добавить новые данные на сервер.
  //     headers: {
  //       "Content-Type": "application/json", // В headers указываем тип данных, которые передаем в body. В данном случае это application/json, чтобы сервер понимал, что мы отправляем данные в формате JSON
  //     },
  //     body: JSON.stringify(newWordAPI), // — здесь объект с данными преобразуется в строку формата JSON, поскольку fetch принимает только строку для отправки в теле запроса.
  //   });
  //   const data = await response.json(); // response.json() преобразует ответ сервера в объект JavaScript. // data – это новый объект слова, который сервер вернул после успешного добавления.
  //   setWordsAPI((wordsAPI) => [...wordsAPI, data]); // wordsAPI – текущий массив слов. // ...wordsAPI – копируем все существующие слова. // data – добавляем новое слово, полученное от сервера. // В итоге, в setWordsAPI попадает обновлённый массив, содержащий и старые, и новое слово.
  // };

  // const updateWordAPIFunc = async (updateWordAPI) => {
  //   const response = await fetch(`/api/words/${updateWordAPI.id}/update`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(updateWordAPI),
  //   });
  //   const data = await response.json();
  //   setWordsAPI(wordsAPI.map((wordAPI) => (wordAPI.id === updateWordAPI.id // с пом. map перебираем(пересматриваем список слов)
  //     ? data // если id совпадает → заменяет старое слово на обновлённое data (из ответа сервера).
  //     : wordAPI // если id не совпадает → оставляет слово без изменений.
  //   )));
  // };

  // const deleteWordAPIFunc = async (id) => {
  //   await fetch(`/api/words/${id}/delete`, {
  //     method: "POST",
  //   });
  //   setWordsAPI(wordsAPI.filter((wordAPI) => wordAPI.id !== id)); // удаляет слово из массива wordsAPI по id. // Использует filter(), чтобы оставить только те элементы, у которых id не совпадает с удаляемым id.
  // };

  return (
    <main className="maincontent">
      <Sidebar />
      <Routes>
        <Route index element={<PageHome />} />
        <Route path="words" element={<PageWords />} />
        <Route path="practice" element={<PagePractice />} />

        {/* <Route path="wordsAPI" element={<PageWordsAPI />} />
        <Route path="practiceAPI" element={<PagePracticeAPI />} /> */}

        <Route path="help" element={<PageHelp />} />
        <Route path='*' element={<PageNoFound />} />
      </Routes>
    </main>

    // <WordsAPIContext.Provider
    //   value={{
    //     wordsAPI,
    //     fetchWordsAPIFunc,
    //     addWordAPIFunc,
    //     updateWordAPIFunc,
    //     deleteWordAPIFunc,
    //   }}
    //   // устанавливает значение контекста. Это значение становится доступно всем компонентам, которые обернуты в WordsContext.Provider.
    // >
    //   <Sidebar />

    //   <main className="maincontent">
    //     <Routes>
    //       <Route index element={<PageHome />} />
    //       <Route path="words" element={<PageWords />} />
    //       <Route path="practice" element={<PagePractice />} />

    //       <Route path="wordsAPI" element={<PageWordsAPI />} />
    //       <Route path="practiceAPI" element={<PagePracticeAPI />} />

    //       <Route path="help" element={<PageHelp />} />
    //       <Route path='*' element={<PageNoFound />} />
    //     </Routes>
    //   </main>
    // </WordsAPIContext.Provider>
  );
};

export default App;