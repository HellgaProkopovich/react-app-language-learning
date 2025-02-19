import { useState } from "react";

//хук для работы с инпутами
const useInputs = (validateInputValue) => {
   const [inputValue, setInputValue] = useState(""); // назначаем состояние и метод для value инпутов, изначально: пусто

   const [wasInputTouched, setWasInputTouched] = useState(false); // следим, было ли касание по инпуту, изначально: нет

   const handleInputChanged = (e) => { // следим за value инпутов
      setInputValue(e.target.value);
   };

   const isInputValid = validateInputValue(inputValue); // инпут валиден, когда проходит валидация введёного value, сама валидация (как проверять) прописана индивидуально для каждого инпута в компоненте формы
   const isInputInvalid = !isInputValid && wasInputTouched; // input не валиден, когда НЕ валиден и когда было касание

   // общая функция для слежения, было ли касание по полю
   const handleWasInputTouched = () => {
      setWasInputTouched(true);
   };

   // общая функция для очистки полей
   const resetInput = () => {
      setInputValue("");
      setWasInputTouched(false);
   };

   // прописываем стили в зависимости от валидно/не валидно. эти стили расположены в App.css
   const inputStyles = isInputInvalid
      ? "formHelp formHelpInvalid"
      : "formHelp"

   // прописываем ключи:значения в виде объекта для инпутов
   return {
      value: inputValue,
      hasError: isInputInvalid,
      isValid: isInputValid,
      inputStyles,
      handleWasInputTouched,
      // was:
      // handleInputChanged: handleInputChanged,
      // Когда имя ключа и имя переменной, которую мы хотим передать, совпадают - мы можем создать объект короткой записью
      // become:
      handleInputChanged,
      resetInput,
   };
};

export default useInputs;