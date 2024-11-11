import './App.css'
import {React, useState, useRef} from "react"
import Pokeinfo from './components/Pokeinfo';

function App() {

  const [pokemonInput, setPokemonInput] = useState("");
  const [pokemonArray, setPokemonArray] = useState([]);
  const inputRef = useRef(null);

  async function handleSubmitClick()
  {
    if (pokemonInput != "")
    {
      setPokemonInput("");
      const url = `https://pokeapi.co/api/v2/pokemon/${pokemonInput.toLowerCase()}`;
      console.log("Input data: " + pokemonInput.toLowerCase());
      console.log("Fetching data from " + url);
      try{
        const response = await fetch(url);
        if (!response.ok)
        {
          document.getElementById("error-message").style.display="block";
          throw new Error("Could not fetch resourse!")
        }
        else
        {
          if (document.getElementById("error-message").style.display === "block")
            {
              document.getElementById("error-message").style.display="none";
            }
        }
        const data = await response.json();
        console.log(data);
        setPokemonArray([...pokemonArray, data])
        console.log(pokemonArray)
      }
      catch(error)
      {
        console.error(error);
      }
    }
    else
    {
      if (document.getElementById("error-message").style.display === "block")
        {
          document.getElementById("error-message").style.display="none";
        }
    }
  }

  function handleClearClick()
  {
    setPokemonArray([]);
    if (document.getElementById("error-message").style.display === "block")
      {
        document.getElementById("error-message").style.display="none";
      }
  }

  return (
    <div className='fetcher-container'>
      <h1>Pokemon fetcher</h1>
      <div className='input-container' ref={inputRef}>
        <input value={pokemonInput} 
            onFocus={()=>{inputRef.current.classList.add("input-container-active")}} 
            onBlur={()=>{inputRef.current.classList.remove("input-container-active")}} 
            onChange={e=>{setPokemonInput(e.target.value)}} id="api-input"/>
        <button onClick={handleSubmitClick}>&#128269;</button>
        <button id='clear-button' onClick={handleClearClick}>🧹️</button>
      </div>
      <p id="error-message">Error: There is no such pokemon!</p>
      <div className='fetched-info-container'>
        {pokemonArray.map((pokemonData)=>{return(
          <Pokeinfo pokeData={pokemonData} />
        )})}
      </div>
    </div>
  )
}

export default App
