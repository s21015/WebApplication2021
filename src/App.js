import React, { useState, useEffect } from 'react'
import Header from './Header'
import Search from './Search'
import './App.css'

const url = 'https://pokeapi.co/api/v2/pokemon/1'

const App = () => {
  const [loading, setLoading] = useState(true)
  const [pokemons, setPokemons] = useState([])
  const [pokeNum, setPokeNum] = useState()

  useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(jsonResponse => {
        setPokemons(jsonResponse.name)
        setPokeNum(jsonResponse.id)
        setLoading(false)
      })
  }, [])

  const search = searchValue => {
    setLoading(true)

    fetch(`https://pokeapi.co/api/v2/pokemon/${searchValue}/`)
      .then(response => response.json())
      .then(jsonResponse => {
        setPokemons(jsonResponse.name)
        setPokeNum(jsonResponse.id)
        setLoading(false)
      })
  }
  return (
    <div className='App'>
      <Header />
      <Search search={search} />
      <div className="pokemons">
        {loading ? (
          <span>loading...</span>
        ) : (
          <div>
            <h2>No.{pokeNum} : {pokemons}</h2>
            <img
              width="200"
              alt="pokemon"
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeNum}.png`}
            />
            <img
              width="200"
              alt="pokemon_shiny"
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${pokeNum}.png`}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default App

