import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFetch } from '../../hooks/useFetch'
import './Create.css'

export default function Create() {
  const [title, setTitle] = useState('')
  const [method, setMethod] = useState('')
  const [cookingTime, setCookingTime] = useState('')
  const [newIngredients, setNewIngredients] = useState('')
  const [ingredients, setIngredients] = useState([])
  const ingredientInput = useRef(null)
  const { postData, data } = useFetch('http://localhost:3000/recipes', 'POST')
  const history = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    postData({
      title,
      ingredients,
      method,
      cookingTime: cookingTime + ' minutes',
    })
  }

  const handleAdd = (e) => {
    e.preventDefault()
    const ing = newIngredients.trim()
    if (ing && !ingredients.includes(ing)) {
      setIngredients((prevIngredients) => [...prevIngredients, ing])
    }
    setNewIngredients('')
    ingredientInput.current.focus()
  }

  useEffect(() => {
    if (data) {
      history('/')
    }
  }, [data, history])

  return (
    <div className='create'>
      <h2 className='page-title'>Add a New Recipe</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Recipe Title:</span>
          <input
            type='text'
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            required
          />
        </label>
        <label>
          <span>Recipe Ingredients:</span>
          <div className='ingredients'>
            <input
              type='text'
              onChange={(e) => setNewIngredients(e.target.value)}
              value={newIngredients}
              ref={ingredientInput}
            />
            <button onClick={handleAdd} className='btn'>
              add
            </button>
          </div>
        </label>
        <p>
          Current Ingredients:{' '}
          {ingredients.map((i) => (
            <em key={i}>{i}, </em>
          ))}
        </p>
        <label>
          <span>Recipe Method:</span>
          <textarea
            onChange={(e) => setMethod(e.target.value)}
            value={method}
            required
          />
        </label>

        <label>
          <span>Cooking Time (minutes):</span>
          <input
            type='number'
            onChange={(e) => setCookingTime(e.target.value)}
            value={cookingTime}
            required
          />
        </label>
        <button className='btn'>Submit</button>
      </form>
    </div>
  )
}
