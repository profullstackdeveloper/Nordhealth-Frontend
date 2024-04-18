import './App.css';
import MasterLayout from './layout/MasterLayout';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/home';
import { Provider } from 'react-redux';
import { store } from './store';
import CustomerTasksDetailPage from './pages/customer/tasks';
import CustomerContactsDetailPage from './pages/customer/contacts';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <MasterLayout>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/customer/:customerId/tasks' element={<CustomerTasksDetailPage />} />
            <Route path='/customer/:customerId/contacts' element={<CustomerContactsDetailPage />} />
          </Routes>
        </MasterLayout>
      </Router>
    </Provider>
  );
}

export default App;
