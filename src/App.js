import './App.css';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import MainLayout from './layout/MainLayout';
import RegistrationPage from './pages/RegistrationPage';
import CarSelectPage from './pages/CarSelectPage';
import PreviousInsurancePage from './pages/PreviousInsurancePage';
import DiscountPage from './pages/DiscountPage';
import 'simplebar/dist/simplebar.min.css';

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/" element={<RegistrationPage />}/>
          <Route path="/car_select" element={<CarSelectPage />}/>
          <Route path="/previous_insurance" element={<PreviousInsurancePage />}/>
          <Route path="/discount" element={<DiscountPage />}/>
        </Route>
      </Routes>
      </div>
    </BrowserRouter>
  );
}


export default App
