import { useContext, useEffect, useState } from 'react';
import WordsAPIContext from '../../contexts/WordsAPIContext';

import FormAddWord from './FormAddWord';
import FormEditWord from './FormEditWord';

import iconEdit from '../../assets/icon-edit.svg';
import iconDelete from '../../assets/icon-delete.svg';
import styles from '../PageWords/pageWords.module.css';

const PageWordsAPI = () => {
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
   // []
   );

   const handleAddWordAPIFunc = (newWordAPI) => {
      console.log(newWordAPI);
      addWordAPIFunc(newWordAPI);
   };

   //////////////////////////////
   // const [editingWord, setEditingWord] = useState(null);
   // const handleEditingWord = (wordAPI) => {
   //    setEditingWord(wordAPI);
   // };
   // const handleUpdateWordAPIFunc = (updateWordAPI) => {
   //    console.log(updateWordAPI);
   //    updateWordAPIFunc(updateWordAPI);
   //    // setEditingWord(null);
   // };
   /////////////////////////////////
   // ✅ Состояние для хранения редактируемого слова
   const [editingWordAPI, setEditingWordAPI] = useState(null);

   // ✅ Функция для включения режима редактирования
   const handleEditClick = (wordAPI) => {
      setEditingWordAPI(wordAPI); // Запоминаем, какое слово редактируем
   };

   // ✅ Обновляем слово и выключаем режим редактирования
   const handleUpdateWordAPIFunc = (updateWordAPI) => {
      updateWordAPIFunc(updateWordAPI);
      setEditingWordAPI(null); // Возвращаемся к обычному виду строки
   };
   /////////////////////////////////

   const handleDeleteWordAPIFunc = (id) => {
      deleteWordAPIFunc(id);
   };

   return (
      <div className={styles.wordsListContainer}>
         <p className="textGrey">[the words from API]</p>
         <h1 className="title">Words from API</h1>
         <div className={styles.wordsTable}>
            <FormAddWord onSubmitAddWord={handleAddWordAPIFunc} />

            {wordsAPI.map((wordAPI) => (
               <div
                  key={wordAPI.id}
                  className={styles.wordRow}
               >
                  {editingWordAPI?.id === wordAPI.id 
                  ? ( // ✅ Показываем форму редактирования, если слово редактируется
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
                              onClick={() => handleUpdateWordAPIFunc(wordAPI)} />
                           <img src={iconDelete} className={styles.icontable} alt="delete"
                              onClick={() => handleDeleteWordAPIFunc(wordAPI.id)} />
                        </div>
                     </>
                  )}
               </div>
            ))}



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

            {/* <FormEditWord word={wordAPI} onSave={handleUpdateWordAPIFunc} /> */}
            <FormEditWord onSubmitUpdateWord={handleUpdateWordAPIFunc} />

         </div>
      </div>
   );
};

export default PageWordsAPI;

                  {/* {editingWord?.id === wordAPI.id
                     ? (<FormEditWord word={wordAPI} onSave={handleUpdateWordAPIFunc} />)
                     : (
                        <>
                           <div className={styles.wordCell}>{wordAPI.english}</div>
                           <div className={styles.wordCell}>{wordAPI.transcription}</div>
                           <div className={styles.wordCell}>{wordAPI.russian}</div>
                           <div className={styles.wordCell}>
                              <img src={iconEdit} className={styles.icontable} alt="edit"
                                 onClick={() => handleEditingWord(wordAPI)} />
                              <img src={iconDelete} className={styles.icontable} alt="delete"
                                 onClick={() => handleDeleteWordAPIFunc(wordAPI.id)} />
                           </div>
                        </> */}