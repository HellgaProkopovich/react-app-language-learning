import { useState } from 'react';

import wordsList from '../words.js';

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

// вкл.редактирования и отмена редакции возможна с useState (без useEffect), т.к. это просто локальное состояние (useState), которое не требует сторонних эффектов.
// Можно ли добавить/удалить/отредактировать слово без useEffect?
// Если wordsList – просто массив, не получится изменять его динамически, потому что React не отслеживает изменения в простом массиве.
// useEffect нужен При загрузке слов из внешнего источника (API, localStorage, IndexedDB, БД). + При сохранении данных после изменений. (после перезагрузки страницы)
// => раздели список слов:
// - сделай часть в связке с localStorage, чтобы реализовать функционал добавления/редактирования/удаления
// - ниже сделай список статичный из массива (для наполненности приложения)

// ✅ Как будет работать LocalStorage в твоём проекте?
// Когда пользователь добавляет/удаляет/редактирует слово, ты обновляешь LocalStorage.
// При загрузке страницы ты загружаешь слова из LocalStorage и отображаешь их.
// Пример:
// useEffect(() => {
//    localStorage.setItem("wordsList", JSON.stringify(wordsList));
// }, [wordsList]); // сохраняем, когда wordsList изменяется

// А при загрузке приложения:
// useEffect(() => {
//    const savedWords = JSON.parse(localStorage.getItem("wordsList"));
//    if (savedWords) {
//       setWordsList(savedWords);
//    }
// }, []);

const PageWords = () => {
   // const [wordsList, setWordsList] = useState([]); - for edit mode
   // const [newWord, setNewWord] = useState([]);

   const [wordgreek, setWordGreek] = useState("");
   const [wordenglish, setWordEnglish] = useState("");
   const [wordclass, setWordClass] = useState("");
   const handleClickAddWord = (e) => {
      e.preventDefault();
      const newWord = {
         wordgreek,
         wordenglish,
         wordclass,
      };
      console.log(newWord);

      // добавляем в массив
      // setNewWord((newWord) => [...wordsList, newWord]);
      // setWordsList((wordsList) => [...wordsList, newWord]); 
      // setWordsList((prevWords) => [...prevWords, newWord]);

      setWordGreek(""); // clear form
      setWordEnglish("");
      setWordClass("");
   }

   // Состояние для хранения редактируемого слова
   const [editingWord, setEditingWord] = useState(null);
   // function for switching on editing mode
   const handleEditClick = (word) => {setEditingWord(word)}; // memorize what word is editing

   // const handleEditConfirmClick - дописать
   const handleEditCancelClick = () => {setEditingWord(null)}; // or null?

   // const handleDeleteClick - дописать

   return (
      <div className={styles.wordsListContainer}>
         <p className="textGrey">[the words]</p>
         <h1 className="title">οι	λέξεις</h1>
         <div className={styles.wordsTable}>

            {/* form add word */}
            <form action="" className={styles.formAddWordRow}>
               <label htmlFor=""><input
                  type="text"
                  placeholder='word in Greek'
                  value={wordgreek}
                  onChange={(e) => setWordGreek(e.target.value)}
                  className={styles.formAddWordCell} /></label>
               <label htmlFor=""><input
                  type="text"
                  placeholder='translation'
                  value={wordenglish}
                  onChange={(e) => setWordEnglish(e.target.value)}
                  className={styles.formAddWordCell} /></label>
               <label htmlFor=""><input
                  type="text"
                  placeholder='word class'
                  value={wordclass}
                  onChange={(e) => setWordClass(e.target.value)}
                  className={styles.formAddWordCell} /></label>
               <button onClick={handleClickAddWord} className={styles.formSaveBtn}>save</button>
            </form>

            {/* words table */}
            {wordsList.map((word) => ( // slice().reverse() => если отобразить список слов в обратном порядке
               <div key={word.wordgreek}>
                  {editingWord?.wordgreek === word.wordgreek
                  ? ( // show form edit word, if editing
                     <form 
                     // onSubmit={handleSubmitUpdateWord}
                     className={styles.formAddWordRow}>
                        <input
                           name="wordgreek"
                           type="text"
                           value={word.wordgreek}
                           // onChange={handleChange}
                           // onChange={(e) => setEnglish(e.target.value)}
                           className={styles.formAddWordCell}
                        />
                        <input
                           name="wordenglish"
                           type="text"
                           value={word.wordenglish}
                           // onChange={handleChange}
                           // onChange={(e) => setTranscription(e.target.value)}
                           className={styles.formAddWordCell}
                        />
                        <input
                           name="wordclass"
                           type="text"
                           value={word.wordclass}
                           // onChange={handleChange}
                           // onChange={(e) => setRussian(e.target.value)}
                           className={styles.formAddWordCell}
                        />
                        <div className={styles.wordCell}>
                           <img src={iconEditYes} className={styles.icontable} alt="edityes"
                              // onClick={() => handleEditConfirmClick(word)}
                               />
                           <img src={iconEditNo} className={styles.icontable} alt="editno"
                              onClick={() => handleEditCancelClick(word)} />
                        </div>
                     </form>
                  ) : ( // if not, show table row
                     <div className={styles.wordRow}>
                        <div className={styles.wordCell}>{word.wordgreek}</div>
                        <div className={styles.wordCell}>{word.wordenglish}</div>
                        <div className={styles.wordCell}>{word.wordclass}</div>
                        <div className={styles.wordCell}>
                           <img src={iconEdit} className={styles.icontable} alt="edit"
                              onClick={() => handleEditClick(word)} />
                           <img src={iconDelete} className={styles.icontable} alt="delete"
                              // onClick={() => handleDeleteClick(word)}
                               />
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