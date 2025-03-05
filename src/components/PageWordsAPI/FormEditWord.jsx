import { useState } from 'react';
import styles from '../PageWords/pageWords.module.css';

const FormEditWord = ({ wordAPI, onSave }) => {
   const [updatedWordAPI, setUpdatedWordAPI] = useState(wordAPI);

   const handleChange = (e) => {
      setUpdatedWordAPI({ ...updatedWordAPI, [e.target.name]: e.target.value });
   };

   const handleSave = () => {
      onSave(updatedWordAPI);
   };

   return (
      <div className={styles.wordRow}>
         <input
            name="english"
            type="text"
            value={updatedWordAPI.english}
            onChange={handleChange}
            className={styles.wordCell}
         />
         <input
            name="transcription"
            type="text"
            value={updatedWordAPI.transcription}
            onChange={handleChange}
            className={styles.wordCell}
         />
         <input
            name="russian"
            type="text"
            value={updatedWordAPI.russian}
            onChange={handleChange}
            className={styles.wordCell}
         />
         <button className={styles.formSaveBtn} onClick={handleSave}>Save</button>
      </div>
   );
};

export default FormEditWord;