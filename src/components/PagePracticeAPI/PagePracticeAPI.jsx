import { useState, useEffect, useRef } from 'react';
import wordsList from '../words.js';

import btnNext from '../../assets/arrow_right.svg';
import btnPrev from '../../assets/arrow_left.svg';
// import classNames from 'classnames';
import styles from '../PagePractice/pagePractice.module.css';

const PagePracticeAPI = () => {
   // for rendering words from array
   const [currentIndex, setCurrentIndex] = useState(0);

   // for counting number of learnt words
   const [countLearntWords, setCountLearntWords] = useState(1);

   // for button 'check'
   const [clicked, setClicked] = useState(false); // хук: состояние, метод = начальное значение(показываем кнопку check)
   const handleClicked = () => {
      setClicked(true); // показываем перевод при клике на check
      setCountLearntWords(countLearntWords + 1);
   }

   // for autofocus on btn check
   const ref = useRef();
   useEffect(() => ref.current.focus(), [currentIndex]); // useEffect срабатывает каждый раз, когда currentIndex изменяется, то есть при смене слова, т.о. фокус на кнопке check устанавливается не один раз (при самом первом рендере), а каждый раз при смене currentIndex(смене слова)

   // for btn prev
   const handlePrev = () => {
      setClicked(false);
      setCurrentIndex((index) => index - 1 < 0 // если индекс меньше нуля
         ? wordsList.length - 1 // показываем самое последнее слово
         : index - 1); // а если нет, показываем предыдущее
   }

   // for btn next
   const handleNext = () => {
      setClicked(false);
      setCurrentIndex((index) => index + 1 < wordsList.length // если индекс меньше длины массива
         ? index + 1 // показываем следующее
         : 0); // а если больше, показываем самое первое слово
   }

   return (
      <div className={styles.pagePracticeContainer}>
         <p className="textGrey">[the exercise]</p>
         <h1 className="title">η άσκηση</h1>
         <div className={styles.cardContainer}>
            <img src={btnPrev} className={styles.btnPrev} alt="btnPrev" onClick={handlePrev} />
            <div className={styles.cardPractice}>
               <p className="textDashed">{wordsList[currentIndex].wordgreek}</p>
               <p className="textGrey">{wordsList[currentIndex].wordclass}</p>
               {//условный рендеринг для отображения кнопки или перевода после клика по кнопке
                  !clicked 
                  ? (<button className={styles.btnCheck} onClick={handleClicked} ref={ref}>check</button>)
                  : (<p className={styles.wordTranslated}>{wordsList[currentIndex].wordenglish}</p>)
               }
            </div>
            <img src={btnNext} className={styles.btnNext} alt="btnNext" onClick={handleNext} />
         </div>
         <p className="textGrey">{countLearntWords} / {wordsList.length}</p>
      </div>
   )
};

export default PagePracticeAPI;