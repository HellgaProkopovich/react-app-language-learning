import { makeAutoObservable } from "mobx";

class WordsStore { // создаёт класс, который управляет списком слов (wordsList)
   words = []; // хранит массив слов, который можно изменять в реактивном стиле
   constructor() {
      makeAutoObservable(this); // делает wordsList реактивным, т.е. при изменении списка компонент автоматически обновляется
   }

   fetchWords = async () => {
      const response = await fetch("/api/words");
      const data = await response.json();
      this.words = data;
   };

   addWord = async (newWord) => {
   const response = await fetch("/api/words/add", {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify(newWord),
   });
   const data = await response.json();
   this.words.push(data);
   };

   updateWord = async (updatedWord) => {
   const response = await fetch(`/api/words/${updatedWord.id}/update`, {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedWord),
   });
   const data = await response.json();
   this.words = this.words.map((word) =>
      word.id === updatedWord.id ? data : word
   );
   };

   deleteWord = async (id) => {
   await fetch(`/api/words/${id}/delete`, {
      method: "POST",
   });
   this.words = this.words.filter((word) => word.id !== id);
   };
}

const wordsStore = new WordsStore(); // создаёт экземпляр хранилища, т.к. нам нужно единое глобальное хранилище данных, а не разные хранилища для разных частей приложения (если надо, то можно сделать экспорт Класса)

export default wordsStore;