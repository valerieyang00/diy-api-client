import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default function Home () {
    const [categories, setCategories] = useState([])
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
        const getCategories = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/categories`)
                setCategories(response.data)
            }catch(err) {
                console.warn(err)
                if (err.response) {
                    setErrorMessage(err.response.data.message)
                }
            }
        }
        getCategories()
    },[]) 


    const categoryList = categories.map(category => {
        const expenses = category.expenses.map(expense => {
            return (
                <li key={expense._id}>
                    <Link to={`/expenses/${expense._id}`}>{expense.date} : ${expense.amount} </Link> 
                </li>
            )
        })
        return (
            <div key={category._id}>
               <h3>{category.name} (Budget: ${category.budget})</h3>
                <p>{expenses}</p>
            </div>
        )
    })

    return (
        <div>
            <h1>Track Expenses</h1>
            <h2>Summary of Expenses by Category:</h2>
            <p>{errorMessage}</p>
            {categoryList}
        </div>
    )
}