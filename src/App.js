import './App.css';
import ProfileCreation3 from './component/ProfileCreation';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProfilesList2 from './component/profileList2';
// import ProfilesList1 from './component/ProfileList1';



function App() {
  return (
   <BrowserRouter>
   <Routes>
   <Route path="/" element={<ProfileCreation3/>}/>
    <Route path="/get-profiles" element={<ProfilesList2/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
