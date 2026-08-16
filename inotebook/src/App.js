import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Alert from './components/Alert';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NoteState from './context/notes/NoteState';

function App() {
  return (
    <NoteState>
      <BrowserRouter>
        <Navbar />
        <Alert />
        <main>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
          </Routes>
        </main>
      </BrowserRouter>
    </NoteState>
  );
}

export default App;
