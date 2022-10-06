import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/routes/Home'
import NavBar from './components/partials/NavBar'
import Expenses from './components/routes/Expenses'
import Expense from './components/routes/Expense'
import Categories from './components/routes/Categories'
import Category from './components/routes/Category'
import NewExpense from './components/routes/NewExpense'
import EditExpense from './components/routes/EditExpense'


function App() {
  return (
    <div className='App'>
    <Router>
        <NavBar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/expenses' element={<Expenses />} />
          <Route path='/expenses/new' element={<NewExpense />} />
          <Route path='/expenses/:id' element={<Expense />} />
          <Route path='/expenses/:id/edit' element={<EditExpense />} />
          <Route path='/categories' element={<Categories />} />
          <Route path='/categories/:id' element={<Category />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
