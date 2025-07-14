// src/App.jsx
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import ViewFile from './components/ViewFile';
import MainLayout from './layouts/MainLayout';
import EmployeeTable from './pages/EmployeeTable';
import ProductTable from './pages/ProductTable';
import OrderTable from './pages/OrderTable';

function App() {
  return (
    <Router basename="/admin"> 
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/view/:id" element={<ViewFile />} />
          <Route path="/employee" element={<EmployeeTable />} />
          <Route path="/product" element={<ProductTable />} />
          <Route path="/order" element={<OrderTable />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
