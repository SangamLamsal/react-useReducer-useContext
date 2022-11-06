import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useFetch } from '../../hooks/useFetch'
import { useTheme } from '../../hooks/useTheme'
import './Recipe.css'

export default function Recipe() {
  const { id } = useParams()
  const url = 'http://localhost:3000/recipes/' + id
  const { data: recipe, isPending, error } = useFetch(url)
  const { mode } = useTheme()
  const history = useNavigate()

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        history('/')
      }, 2000)
    }
  }, [error, history])
  return (
    <div className={`recipe ${mode}`}>
      {isPending && <div className='loading'>Loading...</div>}
      {error && <div className='error'>{error}</div>}
      {recipe && (
        <>
          <h2 className='page-title'>{recipe.title}</h2>
          <p>Take {recipe.cookingTime} to cook.</p>
          <ul>
            {recipe.ingredients.map((ing) => (
              <li key={ing}>{ing}</li>
            ))}
          </ul>
          <p className='method'>{recipe.method}</p>
        </>
      )}
    </div>
  )
}
