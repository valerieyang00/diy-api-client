import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'

export default function Expenses () {
    const [expenses, setExpenses] = useState([])
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
        const getExpenses = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/expenses`)
                // console.log(response.data)
                setExpenses(response.data)
            }catch(err) {
                console.warn(err)
                if (err.response) {
                    setErrorMessage(err.response.data.message)
                }
            }
        }
        getExpenses()
    },[]) // only fire on page load with empty dependency array

    const expenseLinks = expenses.map(expense => {
        return (
            <ul key={expense._id}>
                {expense.date} : {expense.merchant} for
               <Link to={`/expenses/${expense._id}`}>${expense.amount}</Link>
            </ul>
        )
    })

    return (
        <div>
            <p>{errorMessage}</p>
            {expenseLinks}
        </div>
    )
}
