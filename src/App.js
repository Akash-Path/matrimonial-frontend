import './App.css';
import ProfileCreation from './component/ProfileCreation';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProfilesList from './component/ProfileList';

function App() {
  return (
   <BrowserRouter>
   <Routes>
    <Route path="/" element={<ProfileCreation/>}/>
    <Route path="/get-profiles" element={<ProfilesList/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
