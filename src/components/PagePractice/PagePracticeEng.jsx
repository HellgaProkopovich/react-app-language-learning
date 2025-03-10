import { useState, useEffect, useRef } from 'react';

// import wordsList from '../wordsEng.js';
import wordsStore from '../../store/wordsStore';
import { observer } from 'mobx-react-lite';

import btnNext from '../../assets/arrow_right.svg';
import btnPrev from '../../assets/arrow_left.svg';
// import classNames from 'classnames';
import styles from '../PagePractice/pagePractice.module.css';

const PagePractice = observer(() => {
   // for rendering words from array
   const [currentIndex, setCurrentIndex] = useState(0);
   const { words, fetchWords } = wordsStore; // извлекаем (деструктуризируем) то, что нам надо из хранилища
   // GET WORDS
   useEffect(() => {
      fetchWords();
   }, []);

   // for counting number of learnt words
   const [countLearntWords, setCountLearntWords] = useState(0);
   const [learntWords, setLearntWords] = useState([]); // храним индексы уже изученных слов, чтобы шёл счёт только при первом клике на check

   // for button 'check'
   const [clicked, setClicked] = useState(false); // хук: состояние, метод = начальное значение(показываем кнопку check)

   const handleClicked = () => {
      setClicked(true); // показываем перевод при клике на check
      // проверяем, есть ли уже это слово в списке изученных (по которым кликнули на btn check)
      if (!learntWords.includes(currentIndex)) { // если нет
         setLearntWords([...learntWords, currentIndex]); // то добавляем новый индекс(слово)
         setCountLearntWords(countLearntWords + 1); // и увеличиваем счётчик
      }
   };
   // const handleClicked = () => { // тут идёт счёт при каждом нажатии на check
   //    setClicked(true); // показываем перевод при клике на check
   //    setCountLearntWords(countLearntWords + 1);
   // }

   // for autofocus on btn check
   const ref = useRef();
   useEffect(() => ref.current.focus(), [currentIndex]); // useEffect срабатывает каждый раз, когда currentIndex изменяется, то есть при смене слова, т.о. фокус на кнопке check устанавливается не один раз (при самом первом рендере), а каждый раз при смене currentIndex(смене слова)

   // for btn prev
   const handlePrev = () => {
      setClicked(false);
      setCurrentIndex((index) => index - 1 < 0 // если индекс меньше нуля
         ? words.length - 1 // показываем самое последнее слово
         : index - 1); // а если нет, показываем предыдущее
   }

   // for btn next
   const handleNext = () => {
      setClicked(false);
      setCurrentIndex((index) => index + 1 < words.length // если индекс меньше длины массива
         ? index + 1 // показываем следующее
         : 0); // а если больше, показываем самое первое слово
   }

   return (
      <div className={styles.pagePracticeContainer}>
         <p className="textGrey">[the exercise]</p>
         <h1 className="title">the exercise</h1>
         <h2 className="textDashed">usage mobX</h2>
         <div className={styles.cardContainer}>
            <img src={btnPrev} className={styles.btnPrev} alt="btnPrev" onClick={handlePrev} />
            <div className={styles.cardPractice}>
               {//условный рендеринг для проверки доступности слов
                  words.length > 0
                  ? (<>
                        <p className="textDashed">{words[currentIndex].english}</p>
                        <p className="textGrey">{words[currentIndex].transcription}</p>
                        {//условный рендеринг для отображения кнопки или перевода после клика по кнопке
                           !clicked 
                           ? (<button className={styles.btnCheck} onClick={handleClicked} ref={ref}>check</button>)
                           : (<p className={styles.wordTranslated}>{words[currentIndex].russian}</p>)
                        }
                     </>)
                  : (<p className="textGrey">Words are unavailable</p>)
               }
            </div>
            <img src={btnNext} className={styles.btnNext} alt="btnNext" onClick={handleNext} />
         </div>
         <p className="textGrey">{countLearntWords} / {words.length}</p>
      </div>
   )
});

export default PagePractice;