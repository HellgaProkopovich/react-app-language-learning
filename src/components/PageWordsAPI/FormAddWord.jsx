import { useState } from 'react';
import PropTypes from 'prop-types'; // импортируем PropTypes, чтобы ESLint смог проверить тип onSubmitInFormAddWord
import styles from '../PageWords/pageWords.module.css';

const FormAddWord = ({ onSubmitInFormAddWord }) => {
   const [english, setEnglish] = useState("");
   const [transcription, setTranscription] = useState("");
   const [russian, setRussian] = useState("");

   const handleSubmit = (e) => {
      e.preventDefault();
      const newWordAPI = {
         english,
         transcription,
         russian,
         tags: "",
         tags_json: "",
      };
      console.log(newWordAPI);
      onSubmitInFormAddWord(newWordAPI);
      setEnglish("");
      setTranscription("");
      setRussian("");
   };

   return (
      <form onSubmit={handleSubmit} className={styles.formAddWordRow}>
         <label htmlFor=""><input 
            type="text" 
            placeholder='word in English'
            value={english}
            onChange={(e) => setEnglish(e.target.value)}
            className={styles.formAddWordCell}
         /></label>
         <label htmlFor=""><input 
            type="text" 
            placeholder='transcription'
            value={transcription}
            onChange={(e) => setTranscription(e.target.value)}
            className={styles.formAddWordCell} 
         /></label>
         <label htmlFor=""><input 
            type="text" 
            placeholder='word in Russian'
            value={russian}
            onChange={(e) => setRussian(e.target.value)}
            className={styles.formAddWordCell} 
         /></label>
         <button
            type='submit'
            className={styles.formSaveBtn}>
            save
         </button>
      </form>
   );
};

FormAddWord.propTypes = {
   onSubmitInFormAddWord: PropTypes.func.isRequired, // говорим, что `onSubmit` должен быть функцией и обязательным
};

export default FormAddWord;