// import { useState } from 'react';
import useInputs from '../../hooks/use_inputs';

import styles from '../PageHelp/pageHelp.module.css';

const PageHelp = () => {
   // for input email
   const {
      value: inputEmail,
      hasError: isInputEmailInvalid,
      isValid: isInputEmailValid,
      inputStyles: inputEmailStyles,
      handleWasInputTouched: handleWasInputEmailTouched,
      handleInputChanged: handleInputEmailChanged,
      resetInput: resetInputEmail,
   } = useInputs((value) => {
      return value.includes("@"); // тут прописывается валидация (как проверять?) validateInputValue из хука
   });

   // for input subject
   const {
      value: inputSubject,
      hasError: isInputSubjectInvalid,
      isValid: isInputSubjectValid,
      inputStyles: inputSubjectStyles,
      handleWasInputTouched: handleWasInputSubjectTouched,
      handleInputChanged: handleInputSubjectChanged,
      resetInput: resetInputSubject,
   } = useInputs((value) => {
      return value.trim() !== ""; // тут прописывается валидация (как проверять?) validateInputValue из хука
   });

   // for input description
   const {
      value: inputDescription,
      hasError: isInputDescriptionInvalid,
      isValid: isInputDescriptionValid,
      inputStyles: inputDescriptionStyles,
      handleWasInputTouched: handleWasInputDescriptionTouched,
      handleInputChanged: handleInputDescriptionChanged,
      resetInput: resetInputDescription,
   } = useInputs((value) => {
      return value.trim() !== ""; // тут прописывается валидация (как проверять?) validateInputValue из хука
   });

   // for input issue
   const {
      value: inputIssue,
      hasError: isInputIssueInvalid,
      isValid: isInputIssueValid,
      inputStyles: inputIssueStyles,
      handleWasInputTouched: handleWasInputIssueTouched,
      handleInputChanged: handleInputIssueChanged,
      resetInput: resetInputIssue,
   } = useInputs((value) => {
      return value.trim() !== ""; // тут прописывается валидация (как проверять?) validateInputValue из хука
   });

   let isFormFilled = false; // висит на кнопке, чтобы заблокировать её, если не заполнены поля
   if (isInputEmailValid 
      && isInputSubjectValid 
      && isInputDescriptionValid 
      && isInputIssueValid) {
      isFormFilled = true
   };

   const handleClicked = (e) => {
      e.preventDefault(); // отменяем авто перезагрузку

      handleWasInputEmailTouched(true); // сообщаем, что было касание по интпуту
      handleWasInputSubjectTouched(true);
      handleWasInputDescriptionTouched(true);
      handleWasInputIssueTouched(true);

      if (!isInputEmailValid
         && !isInputSubjectValid
         && !isInputDescriptionValid
         && !isInputIssueValid
      ) {return false}; // why? то есть форма не отправляется?

      // тут мб отправка на сервер
      console.log(inputEmail, inputSubject, inputDescription, inputIssue);

      resetInputEmail(); // очищаем все поля
      resetInputSubject();
      resetInputDescription();
      resetInputIssue();
   };

   return (
      <div className={styles.pageHelpContainer}>
         <p className="textGrey">[the help]</p>
         <h1 className="title">η βοήθεια</h1>
         <h2 className="textDashed">What can we help you with?</h2>
         <div className={styles.formHelpContainer}>
            <div className={styles.formHelpText}>
               <h3>Describe your issue</h3>
               <p>Please describe the issue you are experiencing in as much detail as possible. This will help us understand what’s going on.</p>
            </div>

            {/* <form action="" className={styles.formHelp}> */}
            <form action="" className={inputEmailStyles}>
               <label htmlFor="email">
                  Your Email Address *<br />
                  <input 
                     className={inputEmailStyles}
                     type="email"
                     name="inputEmail"
                     value={inputEmail}
                     id="email"
                     onBlur={handleWasInputEmailTouched}
                     onChange={handleInputEmailChanged} />
                  {isInputEmailInvalid && (
                     <span className="inputErrorText">Enter email</span>
                  )}
               </label>


               <label htmlFor="subject">
                  Subject *<br />
                  <input
                     className={inputSubjectStyles}
                     type="text"
                     name="inputSubject"
                     value={inputSubject}
                     id="subject"
                     onBlur={handleWasInputSubjectTouched}
                     onChange={handleInputSubjectChanged} />
                  {isInputSubjectInvalid && (
                     <span className="inputErrorText">Enter subject</span>
                  )}
               </label>

               <label htmlFor="description">
                  Description *<br />
                  <textarea
                     className={inputDescriptionStyles}
                     type="text"
                     name="inputDescription"
                     value={inputDescription}
                     id="description"
                     onBlur={handleWasInputDescriptionTouched}
                     onChange={handleInputDescriptionChanged} />
                  {isInputDescriptionInvalid && (
                     <span className="inputErrorText">Enter description</span>
                  )}
               </label>
               
               <label htmlFor="issue">
                  Type of issue *<br />
                  <select
                     className={inputIssueStyles}
                     name="inputIssue"
                     value={inputIssue}
                     id="issue"
                     onBlur={handleWasInputIssueTouched}
                     onChange={handleInputIssueChanged}>
                        <option value="select">-- Select</option>
                        <option value="bugreport">Bug report</option>
                        <option value="accountissue">Account issue</option>
                        <option value="other">Other issue</option>
                  </select>
                  {isInputIssueInvalid && (
                     <span className="inputErrorText">Select issue</span>
                  )}
               </label>

               <button
                  type="submit"
                  disabled={!isFormFilled}
                  onClick={handleClicked}>
                     submit
               </button>
            </form>
         </div>
      </div>
   )
};

export default PageHelp;

// тут код без кастом.хука
// const PageHelp = () => {
//    const [inputData, setInputData] = useState({
//       inputEmail: "",
//       inputSubject: "",
//       inputDescription: "",
//       inputIssue: "",
//    });


// ///
//    const [wasInputTouched, setWasInputTouched] = useState(false);
// ///


//    const handleInputChanged = (e) => {
//       const value = e.target.value;
//       setInputData({
//          ...inputData, // создаёт копию текущего объекта data, чтобы не потерять уже введённые данные.
//          [e.target.name]: value
//       });
//    };


// ///
//    const isInputValid = inputData.trim() !== ""; // input валиден, когда введённое НЕ равно пустоте
//    const isInputInvalid = !isInputValid && wasInputTouched; // input не валиден, когда НЕ валиден и когда было косание

//    const handleWasInputTouched = () => {
//       setWasInputTouched(true);
//    };

//    const inputClasses = isInputInvalid
//       ? "formHelp formHelpInvalid"
//       : "formHelp"

//    let isFormFilled = false;
//    if (isInputValid) {isFormFilled = true};
// ///


//    const handleClicked = (e) => {
//       e.preventDefault();

//       setWasInputTouched(true);
//       if (!isInputValid) {
//          alert("error");
//          return false; // то есть форма не отправляется
//       }

//       // тут мб отправка на сервер
//       console.log(inputData);

//       setInputData({ // очищаем все поля
//          inputEmail: "",
//          inputSubject: "",
//          inputDescription: "",
//          inputIssue: "",
//       });

//       setWasInputTouched(false);
//    };

//    return (
//       <div className={styles.pageHelpContainer}>
//          <p className="textGrey">[the help]</p>
//          <h1 className="title">η βοήθεια</h1>
//          <h2 className="textDashed">What can we help you with?</h2>
//          <div className={styles.formHelpContainer}>
//             <div className={styles.formHelpText}>
//                <h3>Describe your issue</h3>
//                <p>Please describe the issue you are experiencing in as much detail as possible. This will help us understand what’s going on.</p>
//             </div>

//             {/* <form action="" className={styles.formHelp}> */}
//             <form action="" className={inputClasses}>
//                <label htmlFor="email">
//                   Your Email Address *<br />
//                   <input 
//                      type="email"
//                      required
//                      name="inputEmail"
//                      value={inputData.inputEmail}
//                      id="email"
//                      onChange={handleInputChanged}
//                      onBlur={handleWasInputTouched} />
//                </label>

//                <label htmlFor="subject">
//                   Subject *<br />
//                   <input
//                      type="text"
//                      required
//                      name="inputSubject"
//                      value={inputData.inputSubject}
//                      id="subject"
//                      onChange={handleInputChanged}
//                      onBlur={handleWasInputTouched} />
//                </label>

//                <label htmlFor="description">
//                   Description *<br />
//                   <textarea
//                      type="text"
//                      required
//                      name="inputDescription"
//                      value={inputData.inputDescription}
//                      id="description"
//                      onChange={handleInputChanged}
//                      onBlur={handleWasInputTouched} />
//                </label>
               
//                <label htmlFor="issue">
//                   Type of issue *<br />
//                   <select
//                      required
//                      name="inputIssue"
//                      value={inputData.inputIssue}
//                      id="issue"
//                      onChange={handleInputChanged}
//                      onBlur={handleWasInputTouched}>
//                         <option value="select">-- Select</option>
//                         <option value="bugreport">Bug report</option>
//                         <option value="accountissue">Account issue</option>
//                         <option value="other">Other issue</option>
//                   </select>
//                </label>
               
//                <button
//                   type="submit"
//                   disabled={!isFormFilled} ///////
//                   onClick={handleClicked}>
//                      submit
//                </button>
//             </form>
//          </div>
//       </div>
//    )
// };

// export default PageHelp;