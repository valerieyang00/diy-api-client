import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function NewExpense () {
    const [form, setForm] = useState({
        date: '',
        merchant: '',
        amount: 0,
        description: '',
    })
    const [errorMessage, setErrorMessage] = useState('')

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            //post form data to the backend API
            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/expenses`, form)
            //navigate back to /bounties to see the new bounty
            navigate('/expenses')

        } catch(err) {
            console.warn(err)
            if (err.response) {
                setErrorMessage(err.response.data.message)
            }
        }
    }
    return (
        <div>            
        <h1>New Expense:</h1>
        <p>{errorMessage}</p>

        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor='date'>Date:</label>
                <input 
                    type='text'
                    id='date'
                    value={form.date}
                    placeholder='enter date mm/dd/yy'
                    onChange={e => setForm({...form, date: e.target.value})}                
                />
            </div>
            <div>
                <label htmlFor='merchant'>Merchant:</label>
                <input 
                    type='text'
                    id='merchant'
                    value={form.merchant}
                    placeholder='enter merchant name...'
                    onChange={e => setForm({...form, merchant: e.target.value})}                
                />
            </div>
            <div>
                <label htmlFor='amount'>Amount:</label>
                <input 
                    type='number'
                    id='amount'
                    value={form.amount}
                    placeholder='enter amount...'
                    onChange={e => setForm({...form, amount: e.target.value})}                
                />
            </div>
            <div>
                <label htmlFor='description'>Description:</label>
                <input 
                    type='text'
                    id='description'
                    value={form.description}
                    placeholder='description of expense...'
                    onChange={e => setForm({...form, description: e.target.value})}                
                />
            </div>
     
            <button type='submit'>Submit</button>            
        </form> 
    </div>
    )
}