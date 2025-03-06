import { useContext, useEffect, useState } from 'react';
import WordsAPIContext from '../../contexts/WordsAPIContext';

import FormAddWord from './FormAddWord';
import FormEditWord from './FormEditWord';

import iconEdit from '../../assets/icon-edit.svg';
import iconDelete from '../../assets/icon-delete.svg';
import styles from '../PageWords/pageWords.module.css';

const PageWordsAPI = () => {
   const [loading, setLoading] = useState(true);
   useEffect(() => {
      setLoading(false) //Выключаем индикатор loading
   });
   const bars = [
      { id: 1, left: 0, top: "27px", delay: 0.45, rotate: -90 },
      { id: 2, left: "8px", top: "10px", delay: 0.6, rotate: -45 },
      { id: 3, left: "25px", top: "3px", delay: 0.75, rotate: 0 },
      { id: 4, right: "8px", top: "10px", delay: 0.9, rotate: 45 },
      { id: 5, right: 0, top: "27px", delay: 1.05, rotate: 90 },
      { id: 6, right: "8px", bottom: "7px", delay: 1.2, rotate: 135 },
      { id: 7, left: "25px", bottom: 0, delay: 1.35, rotate: 180 },
      { id: 8, left: "8px", bottom: "7px", delay: 1.5, rotate: -135 },
   ];

   const { 
      wordsAPI, 
      fetchWordsAPIFunc, 
      addWordAPIFunc, 
      updateWordAPIFunc, 
      deleteWordAPIFunc 
   } = useContext(WordsAPIContext);

   useEffect(() => {
      fetchWordsAPIFunc();
   }, 
   []
   );

   const handleAddWordAPIFunc = (newWordAPI) => {
      console.log(newWordAPI);
      addWordAPIFunc(newWordAPI);
   };

   // Состояние для хранения редактируемого слова
   const [editingWordAPI, setEditingWordAPI] = useState(null);

   // Функция для включения режима редактирования
   const handleEditClick = (wordAPI) => {
      setEditingWordAPI(wordAPI); // Запоминаем, какое слово редактируем
   };
   
   // Обновляем слово и выключаем режим редактирования
   const handleUpdateWordAPIFunc = (updateWordAPI) => {
      updateWordAPIFunc(updateWordAPI);
      setEditingWordAPI(null); // Возвращаемся к обычному виду строки
   };

   const handleDeleteWordAPIFunc = (id) => {
      deleteWordAPIFunc(id);
   };

   return (
      <div className={styles.wordsListContainer}>
         <p className="textGrey">[the words from API]</p>
         <h1 className="title">Words from API</h1>
         <div className={styles.wordsTable}>
            <FormAddWord onSubmitAddWord={handleAddWordAPIFunc} />

            { loading
            ? (<div className={styles.floatingBars}>
                  <p>Loading ...</p>
                  {bars.map((bar) => (
                  <div
                     key={bar.id}
                     className={styles.block}
                     style={{
                        left: bar.left,
                        right: bar.right,
                        top: bar.top,
                        bottom: bar.bottom,
                        animationDelay: `${bar.delay}s`,
                        transform: `rotate(${bar.rotate}deg)`,
                     }}
                  ></div>
                  ))}
               </div>)
            : (<>
                  {wordsAPI.map((wordAPI) => (
                     <div
                        key={wordAPI.id}
                        className={styles.wordRow}
                     >
                        {editingWordAPI?.id === wordAPI.id
                        ? ( // Показываем форму редактирования, если слово редактируется
                           <FormEditWord 
                              wordAPI={editingWordAPI} 
                              onSubmitUpdateWord={handleUpdateWordAPIFunc} 
                           />
                        ) : (// Если не редактируем, показываем строку обычного слова
                           <>
                              <div className={styles.wordCell}>{wordAPI.english}</div>
                              <div className={styles.wordCell}>{wordAPI.transcription}</div>
                              <div className={styles.wordCell}>{wordAPI.russian}</div>
                              <div className={styles.wordCell}>
                                 <img src={iconEdit} className={styles.icontable} alt="edit"
                                    onClick={() => handleEditClick(wordAPI)} />
                                 <img src={iconDelete} className={styles.icontable} alt="delete"
                                    onClick={() => handleDeleteWordAPIFunc(wordAPI.id)} />
                              </div>
                           </>
                        )}
                     </div>
                  ))}
               </>)
            }

            {/* {wordsAPI.map((wordAPI) => (
               <div
                  key={wordAPI.id}
                  className={styles.wordRow}
               >
                  <div className={styles.wordCell}>{wordAPI.english}</div>
                  <div className={styles.wordCell}>{wordAPI.transcription}</div>
                  <div className={styles.wordCell}>{wordAPI.russian}</div>
                  <div className={styles.wordCell}>
                     <img src={iconEdit} className={styles.icontable} alt="edit"
                        onClick={() => handleUpdateWordAPIFunc(wordAPI)} />
                     <img src={iconDelete} className={styles.icontable} alt="delete"
                        onClick={() => handleDeleteWordAPIFunc(wordAPI.id)} />
                  </div>
               </div>
            ))} */}

         </div>
      </div>
   );
};

export default PageWordsAPI;