import { makeAutoObservable, runInAction } from "mobx";

class WordsStore { // создаёт класс, который управляет списком слов (wordsList)
   words = []; // хранит массив слов, который можно изменять в реактивном стиле
   constructor() {
      makeAutoObservable(this); // делает wordsList реактивным, т.е. при изменении списка компонент автоматически обновляется
   }

   fetchWords = async () => {
      const response = await fetch("/api/words");
      const data = await response.json();
      runInAction(() => {
         this.words = data;
      });
   };

   addWord = async (newWord) => {
      const response = await fetch("/api/words/add", {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify(newWord),
      });
      const data = await response.json(); 
      this.words.push(data); // здесь runInAction не нужен, потому что MobX умеет отслеживать push() автоматически и здесь мы не меняем массив полностью (а просто добавляем одно слово)
   };

   editWord = async (editedWord) => {
      const response = await fetch(`/api/words/${editedWord.id}/update`, {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify(editedWord),
      });
      const data = await response.json();
      runInAction(() => { // здесь нужен runInAction, так как заменяется(обновляется) весь массив, MobX не видит такие изменения
         this.words = this.words.map((word) =>
            word.id === editedWord.id ? data : word
         );
      });
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