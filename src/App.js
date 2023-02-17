import './App.css'
import Cards from './components/Cards/Cards'
import Nav from './components/Nav/Nav'
import About from "./components/About"
import Detail from "./components/Detail"
import Form from './components/Form/Form'
import Favorites from './components/Favorites/Favorites'
import { useState, useEffect } from 'react'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'

function App () {

  const [characters, setCharacters] = useState([]);
  const [access, setAccess] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const username = "santiagorecabarren7@gmail.com"
  const password = "1*Ac5unit"

  const login  = (userData) => {
    if(userData.username === username && userData.password === password){
      setAccess(true);
      navigate("/home");
    }
  }

  useEffect(() => {
    !access && navigate("/")
  }, [access]);

  const onSearch = (character) => {
    fetch(`https://rickandmortyapi.com/api/character/${character}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.name) {
            setCharacters((oldChars) => [...oldChars, data]);
        } else {
            window.alert('No hay personajes con ese ID');
        }
      })
  }

  // const onClose = (id) => {
  //   return setCharacters(
  //     ...characters,
  //     characters.filter(character => character.id !== id)
  //   )
  // }

  const onClose = (id) =>{
    return setCharacters((data) =>{
      return data.filter((element) => element.id !== id)
    })
  }

  return (
    <div className='App' style={{ padding: '25px' }}>
      {location.pathname === "/" ? <Form login={login}/> : <Nav onSearch={onSearch}/>}
      <Routes>
        <Route path='home' element={<Cards onClose={onClose} characters={characters}/>}/>
        <Route path='about' element={<About/>}/>
        <Route path='detail/:detailId' element={<Detail />}/>
        <Route path='/favorites' element={<Favorites />}/>
      </Routes>
    </div>
  )
}

export default App
