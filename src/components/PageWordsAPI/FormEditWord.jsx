import { useState } from 'react';
import PropTypes from 'prop-types'; // импортируем PropTypes, чтобы ESLint смог проверить тип
import styles from '../PageWords/pageWords.module.css';

const FormEditWord = ({ wordAPI, onSubmitUpdateWord }) => {
   // const [updatedWordAPI, setUpdatedWordAPI] = useState({
   //    id: wordAPI.id,
   //    english: wordAPI.english,
   //    transcription: wordAPI.transcription,
   //    russian: wordAPI.russian,
   // });

   const [updatedWordAPI, setUpdatedWordAPI] = useState(
      wordAPI
         ? { id: wordAPI.id, english: wordAPI.english, transcription: wordAPI.transcription, russian: wordAPI.russian }
         : { id: "", english: "", transcription: "", russian: "" } // если `wordAPI` пустой, задаем безопасные значения
   );

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

FormEditWord.propTypes = {
   wordAPI: PropTypes.shape({ // Проверяем, что wordAPI - это объект с нужными ключами
      id: PropTypes.number.isRequired, // id - число, обязательный
      english: PropTypes.string.isRequired, // english - строка, обязательная
      transcription: PropTypes.string.isRequired, // transcription - строка, обязательная
      russian: PropTypes.string.isRequired, // russian - строка, обязательная
   }),
   onSubmitUpdateWord: PropTypes.func.isRequired, // Функция обязательна
};
// ESLint проверяет, передаются ли в компонент правильные пропсы.
// PropTypes.shape({...}) говорит, что wordAPI должен быть объектом с id, english, transcription и russian.
// .isRequired говорит, что все поля обязательны.

export default FormEditWord;