import React, { useState, useEffect, useReducer } from 'react';
import './pokedex.css';

const rightScreenInitialState = {
  types: true,
  evolution: false,
  moves: false,
  abilities: false,
  items: false,
  shiny: false
};

function rightScreenReducer(state, action) {
  switch (action.type) {
    case 'types':
      let opposite = !state.types;
      return { types: opposite };
    default:
      throw new Error();
  }
};

function Pokedex() {

  const [pokemon, setPokemon] = useState(["bulbasaur"]);

  const [pokemonData, setPokemonData] = useState({});

  const [rightScreenState, rightScreenDispatch] = useReducer(rightScreenReducer, rightScreenInitialState);

  function updatePokemon(event) {
    event.persist();
    setPokemon(event.target.value.toLowerCase());
    getPokemonData();
  };

  function getPokemonData() {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
      .then(response => response.json())
      .then(data => {
        setPokemonData(data);
      })
      .catch(error => {
        console.log("invalid pokemon")
      });
  };

  useEffect(() => {
    getPokemonData();
  }, [pokemon]);


  return (
    <div className="pokedex-page">
      <div className="app-background">
        <div className="pokedex-container">
          <div className="pokedex-left">
            <div>
              <div className="circle1">
                <div className="light-circle1"></div>
              </div>
              <div className="circleRed">
                <div className="light-circle2Red"></div>
              </div>
              <div className="circleYellow">
                <div className="light-circle2Yellow"></div>
              </div>
              <div className="circleGreen">
                <div className="light-circle2Green"></div>
              </div>
            </div>

            <div className="screen-row">
              <div className="screen-border">
                <div className="top-screen-decoration">
                  <div className="circle3"></div>
                  <div className="circle3"></div>
                </div>
                <div className="screen">
                  <div className="screen-content">
                    <div className="screen-content-sprite">
                      {pokemonData.sprites ? <img src={pokemonData.sprites.front_default} alt="pokemon_image" /> : null}
                    </div>
                    <div className="screen-content-info">
                      <div className="screen-content-info-name">
                        {pokemonData.name}
                      </div>
                      <div className="screen-content-info-id">
                        ID No. {pokemonData.id}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bottom-screen-decoration">
                  <div className="circle4"></div>
                  <div className="menu-button">
                    <svg width="22" height="16" viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <line y1="0.5" x2="22" y2="0.5" stroke="black" />
                      <line y1="15.5" x2="22" y2="15.5" stroke="black" />
                      <line y1="10.5" x2="22" y2="10.5" stroke="black" />
                      <line y1="5.5" x2="22" y2="5.5" stroke="black" />
                    </svg>

                  </div>

                </div>
                <label>
                  Pokemon:
                  <input type="text" value={pokemon} onChange={updatePokemon} />
                </label>
              </div>
            </div>

          </div>

          <div className="pokedex-right">
            <div className="screen-row-right">
              <div className="screen-border">
                <div className="top-screen-decoration-right">
                </div>
                <div className="screen-right">
                  <div className="screen-content">
                    <div className="screen-content-types">
                      {pokemonData.types && rightScreenState.types ? pokemonData.types.map((type, i) => (
                        <div key={i}>
                          Type: {type.type.name}
                        </div>
                      )) : null}
                    </div>
                  </div>
                </div>
                <div className="buttons-grid-right">
                  <div className="button1" onClick={() => rightScreenDispatch({ type: 'types' })}>TYPES</div>
                  <div className="button2">EVOLUTION</div>
                  <div className="button3">MOVES</div>
                  <div className="button4">ABILITIES</div>
                  <div className="button5">ITEMS</div>
                  <div className="button6">SHINY</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Pokedex;
