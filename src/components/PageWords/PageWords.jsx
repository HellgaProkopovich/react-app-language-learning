import wordsList from '../words.js';
import iconEdit from '../../assets/icon-edit.svg';
import iconDelete from '../../assets/icon-delete.svg';
import styles from './pageWords.module.css';

const PageWords = () => {
   return (
      <div className={styles.wordsListContainer}>
         <p className="textGrey">[the words]</p>
         <h1 className="title">οι	λέξεις</h1>
         <div className={styles.wordsTable}>
            <form action="" className={styles.formAddWordRow}>
               <label htmlFor=""><input type="text" placeholder='word in Greek' className={styles.formAddWordCell} /></label>
               <label htmlFor=""><input type="text" placeholder='translation' className={styles.formAddWordCell} /></label>
               <label htmlFor=""><input type="text" placeholder='word class' className={styles.formAddWordCell} /></label>
               <button className={styles.formSaveBtn}>save</button>
            </form>
            {wordsList.map((word) => (
               <div
                  key={word.wordgreek}
                  className={styles.wordRow}
               >
                  <div className={styles.wordCell}>{word.wordgreek}</div>
                  <div className={styles.wordCell}>{word.wordenglish}</div>
                  <div className={styles.wordCell}>{word.wordclass}</div>
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