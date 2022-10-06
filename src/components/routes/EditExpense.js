import axios from 'axios'
import { useState, useEffect } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'


export default function EditExpense () {
    const [form, setForm] = useState({
        date: '',
        merchant: '',
        amount: 0,
        description: '',
    })
    const [errorMessage, setErrorMessage] = useState('')

    const { id } = useParams()

    const navigate = useNavigate()

    useEffect(() => {
        const getExpense = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/expenses/${id}`)
                // console.log(response.data)
                setForm(response.data)
            }catch(err) {
                console.warn(err)
                if (err.response) {
                    setErrorMessage(err.response.data.message)
                }
            }
        }
        getExpense()
    }, [])

    const handleEditSubmit = async (e) => {
        try {
            e.preventDefault()
            // axios.put and axios.post work same way ('url', req.body)
            const response = await axios.put(`${process.env.REACT_APP_SERVER_URL}/expenses/${id}`, form)
            // navigate back to the details page for this expense
            navigate(`/expenses/${id}`)

        }catch(err) {
            console.warn(err)
            if (err.response) {
                setErrorMessage(err.response.data.message)
            }
        }
    }

    return (
        <div>            
        <h1>Edit Expense:</h1>
        <p>{errorMessage}</p>

        <form onSubmit={handleEditSubmit}>
            <div>
                <label htmlFor='date'>Date:</label>
                <input 
                    type='text'
                    id='date'
                    value={form.date}
                    onChange={e => setForm({...form, date: e.target.value})}                
                />
            </div>
            <div>
                <label htmlFor='merchant'>Merchant:</label>
                <input 
                    type='text'
                    id='merchant'
                    value={form.merchant}
                    onChange={e => setForm({...form, merchant: e.target.value})}                
                />
            </div>
            <div>
                <label htmlFor='amount'>Amount:</label>
                <input 
                    type='number'
                    id='amount'
                    value={form.amount}
                    onChange={e => setForm({...form, amount: e.target.value})}                
                />
            </div>
            <div>
                <label htmlFor='description'>Description:</label>
                <input 
                    type='text'
                    id='description'
                    value={form.description}
                    onChange={e => setForm({...form, description: e.target.value})}                
                />
            </div>
     
            <button type='submit'>Submit</button>            
        </form> 
    </div>
    )
}