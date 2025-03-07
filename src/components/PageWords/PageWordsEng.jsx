import wordsList from '../wordsEng.js';

import iconEdit from '../../assets/icon-edit.svg';
import iconDelete from '../../assets/icon-delete.svg';
import styles from './pageWords.module.css';

const PageWords = () => {
   return (
      <div className={styles.wordsListContainer}>
         <p className="textGrey">[the words]</p>
         <h1 className="title">the words from API</h1>
         <h2 className="textDashed">usage mobX</h2>
         <div className={styles.wordsTable}>
            <form action="" className={styles.formAddWordRow}>
               <label htmlFor=""><input type="text" placeholder='word in English' className={styles.formAddWordCell} /></label>
               <label htmlFor=""><input type="text" placeholder='transcription' className={styles.formAddWordCell} /></label>
               <label htmlFor=""><input type="text" placeholder='translation' className={styles.formAddWordCell} /></label>
               <button className={styles.formSaveBtn}>save</button>
            </form>
            {wordsList.slice().reverse().map((word) => ( // slice().reverse() => отображаем список слов в обратном порядке
               <div
                  key={word.id}
                  className={styles.wordRow}
               >
                  <div className={styles.wordCell}>{word.english}</div>
                  <div className={styles.wordCell}>{word.transcription}</div>
                  <div className={styles.wordCell}>{word.russian}</div>
                  <div className={styles.wordCell}>
                     <img src={iconEdit} className={styles.icontable} alt="edit" />
                     <img src={iconDelete} className={styles.icontable} alt="delete" />
                  </div>
               </div>
            ))}
         </div>
      </div>
   )
};

export default PageWords;