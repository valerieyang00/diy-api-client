import { Link } from 'react-router-dom'

export default function NavBar () {
    return (
        <nav>
                <Link to='/'>Home</Link>{' | '}
                <Link to='/expenses'>All Expenses</Link>{' | '}
                <Link to='/expenses/new'>Record a New Expense</Link>
        </nav>
    )
}