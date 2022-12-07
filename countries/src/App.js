import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Paises from "./components/Paises";
import PaisUnico from './components/PaisUnico';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Paises/>} />
        <Route path='/:name' element={<PaisUnico/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
