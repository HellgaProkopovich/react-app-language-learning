import { Routes, Route } from 'react-router';

import wordsStore from './store/wordsStore';
import { Provider } from "mobx-react";

import Sidebar from './components/Sidebar/Sidebar';
import PageHome from './components/PageHome/PageHome';
import PageWords from './components/PageWords/PageWordsEng';
import PagePractice from './components/PagePractice/PagePracticeEng';
import PageHelp from './components/PageHelp/PageHelp';
import PageNoFound from './components/PageNoFound/PageNoFound';

import './App.css';
import './variables.css';

function App() {
  return (
    <Provider wordsStore={wordsStore}> {/* Все компоненты, которые требуют доступ к словам, теперь могут получить его через контекст MobX */}
      <main className="maincontent">
        <Sidebar />
        <Routes>
          <Route index element={<PageHome />} />
          <Route path="words" element={<PageWords />} />
          <Route path="practice" element={<PagePractice />} />
          <Route path="help" element={<PageHelp />} />
          <Route path='*' element={<PageNoFound />} />
        </Routes>
      </main>
    </Provider>
  );
};

export default App;