import { useState, useEffect } from 'react';

// import wordsList from '../wordsEng.js';
import wordsStore from '../../store/wordsStore';
import { observer } from 'mobx-react-lite';

import iconEdit from '../../assets/icon-edit.svg';
import iconDelete from '../../assets/icon-delete.svg';
import iconEditYes from '../../assets/icon-check-yes.svg';
import iconEditNo from '../../assets/icon-check-no.svg';
import styles from './pageWords.module.css';

// v ADD
//--------
// v EDIT:
// ПОДТВЕРДИТЬ РЕДАКЦИЮ => принять изменения и отобразить изменённое слово
// V ОТМЕНИТЬ РЕДАКЦИЮ => (НЕ принять изменения) и отобразить слово, каким оно было
// -------
// v DELETE

const PageWords = observer(() => { // оборачиваем в observer, чтобы приложение все заменяло автоматически
   const { words, fetchWords, addWord, updateWord, deleteWord } = wordsStore; // извлекаем (деструктуризируем) то, что нам надо из хранилища
   
   // GET WORDS
   useEffect(() => {
      fetchWords();
   }, []);

   // ADD new word
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
      addWord(newWord);
      setEnglish(""); // clear form
      setTranscription("");
      setRussian("");
   }



   // EDIT word
   // Состояние для хранения редактируемого слова
   const [editingWord, setEditingWord] = useState(null);
   // function for switching on editing mode
   const handleEditClick = (word) => {setEditingWord(word)}; // memorize what word is editing

   // EDIT CONFIRM word
   const handleEditConfirmClick = (updatedWord, e) => {
      e.preventDefault();
      // надо дописать события onChange, чтобы ловить, что пишут в форме, и повесить их на поля формы
      updateWord(updatedWord);
      setEditingWord(updatedWord);
   };

   // EDIT CANCEL word
   const handleEditCancelClick = () => {setEditingWord(null)};



   // DELETE word
   const handleDeleteClick = (id) => {
      deleteWord(id);
   };

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
            {words.slice().reverse().map((word) => ( // slice().reverse() => отображаем список слов в обратном порядке
               <div key={word.id}>
                  {editingWord?.id === word.id

                  ? ( // show form edit word, if editing
                     <form
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
                              onClick={() => handleEditConfirmClick(word)}
                               />
                           <img src={iconEditNo} className={styles.icontable} alt="editno"
                              onClick={() => handleEditCancelClick(word)} />
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
                           <img src={iconDelete} className={styles.icontable} alt="delete"
                              onClick={() => handleDeleteClick(word.id)} />
                        </div>
                     </div>
                  )}

               </div>
            ))}

         </div>
      </div>
   )
});

export default PageWords;