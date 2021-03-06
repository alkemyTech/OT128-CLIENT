import React, { useState } from 'react'
import { debounce } from 'lodash'
import './SlidesSearch.css'

const SlidesSearch = function () {
  const [searchedTitle, setSearchedTitle] = useState('')
  const [message, setMessage] = useState('')

  const handleInput = debounce((val) => {
    console.log(val)
    if (val.length >= 3) {
      fetch(`http://ongapi.alkemy.org/api/slides?search=${val}`)
        .then((res) => res.json())
        .then((json) => {
          setSearchedTitle(json.data)
          setMessage('No hay resultados para tu búsqueda')
        })
    } else {
      setMessage('Ingresa al menos 3 caracteres para la búsqueda')
    }
  }, 1000)

  return (
    <div className="search">
      <input
        type="text"
        placeholder="Buscar titulo"
        className="search-input"
        onChange={(e) => handleInput(e.target.value)}
      />
      {searchedTitle.length > 0 ? (
        <div>
          {searchedTitle.map((i) => (
            <>
              <p key={i}>{i.name}</p>
              <img src={i.image} alt="asd" />
            </>
          ))}
        </div>
      ) : (
        <p>{message}</p>
      )}
    </div>
  )
}

export default SlidesSearch
