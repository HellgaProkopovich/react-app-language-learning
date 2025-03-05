import { useState } from 'react';
import styles from '../PageWords/pageWords.module.css';

const FormEditWord = ({ wordAPI, onSubmitUpdateWord }) => {
   const [updatedWordAPI, setUpdatedWordAPI] = useState({
      id: wordAPI.id,
      english: wordAPI.english,
      transcription: wordAPI.transcription,
      russian: wordAPI.russian,
   });

   // const [english, setEnglish] = useState();
   // const [transcription, setTranscription] = useState();
   // const [russian, setRussian] = useState();

   const handleChange = (e) => {
      setUpdatedWordAPI({ 
         ...updatedWordAPI, 
         [e.target.name]: e.target.value 
      });
   };

   const handleSubmitUpdateWord = (e) => {
      e.preventDefault();
      // const updatedWordAPI = {
      //    english,
      //    transcription,
      //    russian,
      //    tags: "",
      //    tags_json: "",
      // };
      console.log(updatedWordAPI);
      onSubmitUpdateWord(updatedWordAPI);
   }

   return (
      <form
      onSubmit={handleSubmitUpdateWord}
      className={styles.formAddWordRow}>
         <input
            name="english"
            type="text"
            value={updatedWordAPI.english}
            onChange={handleChange}
            // onChange={(e) => setEnglish(e.target.value)}
            className={styles.formAddWordCell}
         />
         <input
            name="transcription"
            type="text"
            value={updatedWordAPI.transcription}
            onChange={handleChange}
            // onChange={(e) => setTranscription(e.target.value)}
            className={styles.formAddWordCell}
         />
         <input
            name="russian"
            type="text"
            value={updatedWordAPI.russian}
            onChange={handleChange}
            // onChange={(e) => setRussian(e.target.value)}
            className={styles.formAddWordCell}
         />
         <button
            type='submit'
            className={styles.formSaveBtn}>
            save
         </button>
      </form>
   );
};

export default FormEditWord;