import { Routes, Route } from 'react-router-dom';
import { LandingPage, FormPage } from '../routes/routes'

function App() {
  return (
    <Routes>
      <Route path='/' element={<LandingPage/>}></Route>
      <Route path='/build' element={<FormPage/>}></Route>
    </Routes>
  );
}

export default App;
