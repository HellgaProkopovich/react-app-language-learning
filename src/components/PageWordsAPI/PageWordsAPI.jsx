import { useContext, useEffect, useState } from 'react';
import WordsAPIContext from '../../contexts/WordsAPIContext';

import FormAddWord from './FormAddWord';
import FormEditWord from './FormEditWord';

import iconEdit from '../../assets/icon-edit.svg';
import iconDelete from '../../assets/icon-delete.svg';
import styles from '../PageWords/pageWords.module.css';

const PageWordsAPI = () => {
   const { wordsAPI, fetchWordsAPIFunc, addWordAPIFunc, updateWordAPIFunc, deleteWordAPIFunc } = useContext(WordsAPIContext);

   useEffect(() => {
      fetchWordsAPIFunc();
   }, []);

   const [editingWord, setEditingWord] = useState(null);
   const handleEditingWord = (wordAPI) => {
      setEditingWord(wordAPI);
   };

   const handleAddWordAPIFunc = (newWordAPI) => {
      console.log(newWordAPI);
      addWordAPIFunc(newWordAPI);
   };

   const handleUpdateWordAPIFunc = (updateWordAPI) => {
      console.log(updateWordAPI);
      updateWordAPIFunc(updateWordAPI);
      setEditingWord(null);
   };

   const handleDeleteWordAPIFunc = (id) => {
      deleteWordAPIFunc(id);
   };

   return (
      <div className={styles.wordsListContainer}>
         <p className="textGrey">[the words from API]</p>
         <h1 className="title">Words from API</h1>
         <div className={styles.wordsTable}>
            <FormAddWord onSubmitInFormAddWord={handleAddWordAPIFunc} />
            {wordsAPI.map((wordAPI) => (
               <div
                  key={wordAPI.id}
                  className={styles.wordRow}
               >
                  {editingWord?.id === wordAPI.id
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
                        </>
                  )}
                  
               </div>
            ))}
         </div>
      </div>
   );
};

export default PageWordsAPI;