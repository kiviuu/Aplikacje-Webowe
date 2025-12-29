import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import Koszyk from './components/koszyk/Koszyk';
import NowyKoszyk from './components/koszyk/NowyKoszyk';
import Licznik from './components/liczniki/Licznik';
import NowyLicznik from './components/liczniki/NowyLicznik';
import Formularz from './components/formularze/Formularz';
import Haslo from './components/formularze/Haslo';
import Logowanie from './components/formularze/Logowanie';
import Ternary from './components/inne/Ternary';
import Aktualizacja from './components/inne/Aktualizacja';
import Studenci from './components/studenci/Studenci';
import StudentManager from './components/studenci/StudentManager';
import Licznik2 from './components/efekty/Licznik';
import Title from './components/efekty/Title';
import Odliczanie from './components/efekty/Odliczanie';
import Komentarz from './components/produkty/Komentarz';
import Komentarze from './components/produkty/Komentarze';

function App() {
  const autor = {
    id: 101,
    username: "jan_kowalski",
    fullName: "Jan Kowalski"
  };

  return (
    <>
      <NowyLicznik />
      <NowyKoszyk />
      <Formularz />
      <Haslo />
      <Logowanie />
      <Ternary />
      <br></br>
      <Aktualizacja />
      <Studenci />
      <StudentManager />
      <br/>
      <Licznik2 />
      <br /><br/>
      <Title />
      <br/><br/>
      <Odliczanie />
      <br /><br/>
      <Komentarze />
    </>
  )
}

export default App
