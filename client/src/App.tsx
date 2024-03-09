import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss';
import { SearchPage } from './components/organisms/SearchPage/SearchPage';
import { SignUp } from './components/organisms/SignUpPage/SignUpPage';
import { Provider } from 'react-redux';
import { store } from './app/store/store';
import { LanguageSelector } from './components/atoms/LanguageSelector/LanguageSelector';

function App() {
  return (
    <div className='app'>
      <Provider store={store}>
        <LanguageSelector />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SearchPage />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
