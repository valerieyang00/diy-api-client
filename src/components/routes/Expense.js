import { useParams, Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function Expense () {
    const [expense, setExpense] = useState({})
    const [errorMessage, setErrorMessage] = useState('')

    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        const getExpense = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/expenses/${id}`)
                // console.log(response.data)
                setExpense(response.data)
            }catch(err) {
                console.warn(err)
                if (err.response) {
                    setErrorMessage(err.response.data.message)
                }
            }
        }
        getExpense()
    }, [])

    const handleDelete = async () => {
        try {
            await axios.delete(`${process.env.REACT_APP_SERVER_URL}/expenses/${id}`)
            navigate('/expenses')

        }catch (err) {
            console.warn(err)
            if (err.response) {
                setErrorMessage(err.response.data.message)
            }
        }
    }

    return (
        <div>
           <h1>Details</h1>
           <p>{errorMessage}</p>
            <div>
                <Link to={`/expenses/${id}/edit`}>
                    <button>Edit</button>
                    </Link>
                <button onClick={handleDelete}>Delete</button>
            </div>
           <p>Date: {expense.date}</p>
           <p>Merchant: {expense.merchant}</p>
           <p>Amount: ${expense.amount}</p>
           <p>Description: {expense.description}</p>
           {/* below code to display the related category object's key 'name' keeps breaking code but sometimes works */}
           {/* <p>Category: {expense.category.name}</p> */}
        </div>
    )
}