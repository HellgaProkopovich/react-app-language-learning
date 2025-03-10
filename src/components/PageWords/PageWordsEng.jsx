import { useState, useEffect } from 'react';

// import wordsList from '../wordsEng.js';
import wordsStore from '../../store/wordsStore';
import { observer } from 'mobx-react-lite';

import iconEdit from '../../assets/icon-edit.svg';
import iconDelete from '../../assets/icon-delete.svg';
import iconEditYes from '../../assets/icon-check-yes.svg';
import iconEditNo from '../../assets/icon-check-no.svg';
import styles from './pageWords.module.css';

const PageWords = observer(() => { // оборачиваем в observer, чтобы приложение все заменяло автоматически
   const { words, fetchWords, addWord, deleteWord } = wordsStore; // извлекаем (деструктуризируем) то, что нам надо из хранилища
   
   // GET WORDS
   useEffect(() => {
      fetchWords();
   }, [fetchWords]); // React ESLint рекомендует добавить fetchWords в массив зависимостей, так как fetchWords может изменяться между рендерами, а не оставлять пустой массив []

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
   const handleEditConfirmClick = (e) => {
      e.preventDefault();
      wordsStore.editWord(editingWord);
      setEditingWord(null); // switching off editing mode
   };

   // EDIT CANCEL word
   const handleEditCancelClick = () => {setEditingWord(null)};

   // DELETE word
   const handleDeleteClick = (id) => {
      deleteWord(id);
   };

   // LOADING
   const [loading, setLoading] = useState(true);
   useEffect(() => {
      setLoading(false) //Выключаем индикатор loading
   }, []);
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
            { loading
            ? (<div className={styles.floatingBars}>
                  {/* <p>Loading ...</p> */}
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
               {words.slice().reverse().map((word) => ( // slice().reverse() => отображаем список слов в обратном порядке
                  <div key={word.id}>
                     {editingWord?.id === word.id

                     ? ( // show form edit word, if editing
                        <form
                        className={styles.formAddWordRow}>
                           <input
                              name="english"
                              type="text"
                              value={editingWord.english}
                              onChange={(e) => setEditingWord({...editingWord, english: e.target.value})}
                              className={styles.formAddWordCell}
                           />
                           <input
                              name="transcription"
                              type="text"
                              value={editingWord.transcription}
                              onChange={(e) => setEditingWord({...editingWord,transcription: e.target.value})}
                              className={styles.formAddWordCell}
                           />
                           <input
                              name="russian"
                              type="text"
                              value={editingWord.russian}
                              onChange={(e) => setEditingWord({...editingWord,russian: e.target.value})}
                              className={styles.formAddWordCell}
                           />
                           <div className={styles.wordCell}>
                              <img src={iconEditYes} className={styles.icontable} alt="edityes"
                                 onClick={handleEditConfirmClick} />
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
            </>)
            }
         </div>
      </div>
   )
});

export default PageWords;