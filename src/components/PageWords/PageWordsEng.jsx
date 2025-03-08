import { useState } from 'react';

import wordsList from '../wordsEng.js';

import iconEdit from '../../assets/icon-edit.svg';
import iconDelete from '../../assets/icon-delete.svg';
import iconEditYes from '../../assets/icon-check-yes.svg';
import iconEditNo from '../../assets/icon-check-no.svg';
import styles from './pageWords.module.css';

// ADD
//--------
// EDIT:
// ПОДТВЕРДИТЬ РЕДАКЦИЮ => принять изменения и отобразить изменённое слово
// V ОТМЕНИТЬ РЕДАКЦИЮ => (НЕ принять изменения) и отобразить слово, каким оно было
// -------
// DELETE

const PageWords = () => {
   // const [wordsList, setWordsList] = useState([]); - for edit
   // const [newWord, setNewWord] = useState([]);

   const [english, setEnglish] = useState("");
   const [transcription, setTranscription] = useState("");
   const [russian, setRussian] = useState("");
   const handleClickAddWord = (e) => {
      e.preventDefault();
      const newWord = {
         english,
         transcription,
         russian,
         tags: "",
         tags_json: "",
      };
      console.log(newWord);

      // добавляем в массив
      // setNewWord((newWord) => [...wordsList, newWord]);
      // setWordsList((wordsList) => [...wordsList, newWord]); 
      // setWordsList((prevWords) => [...prevWords, newWord]);

      setEnglish(""); // clear form
      setTranscription("");
      setRussian("");
   }

   // Состояние для хранения редактируемого слова
   const [editingWord, setEditingWord] = useState(null);
   // function for switching on editing mode
   const handleEditClick = (word) => {setEditingWord(word)}; // memorize what word is editing

   // const handleEditYesClick - дописать
   const handleEditNoClick = () => {setEditingWord(null)}; // or null?

   return (
      <div className={styles.wordsListContainer}>
         <p className="textGrey">[the words]</p>
         <h1 className="title">the words from API</h1>
         <h2 className="textDashed">usage mobX</h2>
         <div className={styles.wordsTable}>

            {/* form add word */}
            <form action="" className={styles.formAddWordRow}>
               <label htmlFor=""><input
                  type="text"
                  placeholder='word in English'
                  value={english}
                  onChange={(e) => setEnglish(e.target.value)}
                  className={styles.formAddWordCell} /></label>
               <label htmlFor=""><input 
                  type="text" 
                  placeholder='transcription'
                  value={transcription}
                  onChange={(e) => setTranscription(e.target.value)}
                  className={styles.formAddWordCell} /></label>
               <label htmlFor=""><input
                  type="text"
                  placeholder='translation'
                  value={russian}
                  onChange={(e) => setRussian(e.target.value)}
                  className={styles.formAddWordCell} /></label>
               <button onClick={handleClickAddWord} className={styles.formSaveBtn}>save</button>
            </form>
            
            {/* words table */}
            {wordsList.slice().reverse().map((word) => ( // slice().reverse() => отображаем список слов в обратном порядке
               <div key={word.id}>
                  {editingWord?.id === word.id
                  ? ( // show form edit word, if editing
                     <form 
                     // onSubmit={handleSubmitUpdateWord}
                     className={styles.formAddWordRow}>
                        <input
                           name="english"
                           type="text"
                           value={word.english}
                           // onChange={handleChange}
                           // onChange={(e) => setEnglish(e.target.value)}
                           className={styles.formAddWordCell}
                        />
                        <input
                           name="transcription"
                           type="text"
                           value={word.transcription}
                           // onChange={handleChange}
                           // onChange={(e) => setTranscription(e.target.value)}
                           className={styles.formAddWordCell}
                        />
                        <input
                           name="russian"
                           type="text"
                           value={word.russian}
                           // onChange={handleChange}
                           // onChange={(e) => setRussian(e.target.value)}
                           className={styles.formAddWordCell}
                        />
                        <div className={styles.wordCell}>
                           <img src={iconEditYes} className={styles.icontable} alt="edityes"
                              // onClick={() => handleEditYesClick(word)}
                               />
                           <img src={iconEditNo} className={styles.icontable} alt="editno"
                              onClick={() => handleEditNoClick(word)} />
                        </div>
                     </form>
                  ) : ( // if not, show table row
                     <div className={styles.wordRow}>
                        <div className={styles.wordCell}>{word.english}</div>
                        <div className={styles.wordCell}>{word.transcription}</div>
                        <div className={styles.wordCell}>{word.russian}</div>
                        <div className={styles.wordCell}>
                           <img src={iconEdit} className={styles.icontable} alt="edit"
                              onClick={() => handleEditClick(word)} />
                           <img src={iconDelete} className={styles.icontable} alt="delete" />
                        </div>
                     </div>
                  )}
               </div>
            ))}

         </div>
      </div>
   )
};

export default PageWords;