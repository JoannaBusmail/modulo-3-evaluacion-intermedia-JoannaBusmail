import '../styles/index.scss';
import { useState } from 'react';
import friendsQuotesData from '../service/friends-quotes.json';

function App() {
  //variables de estado para:
  // 1. mis listas iniciales que cambiarán a medida que vaya incluyendo frases nuevas o si quiero filtrarlas
  // 2. Mis inputs para añadir la nueva info. este se compone de un objeto. Asi puedo manejar un objeto con mas de 1 input
  // 3. Mi input para filtrar por frase
  // 4. Mis select para filtrar por personaje
  const [quotesData, setquotesData] = useState(friendsQuotesData);
  const [searchQuote, setSearchQuote] = useState('');
  const [searchCharacter, setSearchCharacter] = useState('');
  const [addData, setAddData] = useState({
    quote: '',
    character: '',
  });

  const handleInputAddData = (ev) => {
    //Guardo la nueva data en variable de estado.
    //como es un objeto, con dos propipedades le digo que guardo mi objeto + busco en que input estoy escribiendo con el id + guardo el valor de cada input
    setAddData({ ...addData, [ev.target.id]: ev.target.value });
  };

  const handleClickAddBtn = (ev) => {
    //Cuando hago click guardo en mi variable de estado de mis frases iniciales: 1- las frases de la api + el nuevo objeto que contiene frase + personaje.
    //como es un array si puedo decirle que guardo mi array 1 + mi array modificado con info añadida.
    ev.preventDefault();
    setquotesData([...quotesData, addData]);
    //Para que los inputs se queden vacíos una vez añado la frase y el personaje
    setAddData({
      quote: '',
      character: '',
    });
  };

  const handleInputSearchData = (ev) => {
    //Guardo en mi variable de estado de buscar por frase el valor del input.Como este cambia REACT se encarga de pintarlo cuando mapea. Tenmos pintado el array original y pinta el cambio.
    ev.preventDefault();
    setSearchQuote(ev.target.value);
  };
  //Trabajando en este Hnadle.....
  const handleSelectOptions = (ev) => {
    const selectValue = ev.target.value;
    const selectChanged = ev.target.name;
    setSearchCharacter({ ...searchCharacter, [selectChanged]: selectValue });
  };
  const renderHtml = () => {
    return (
      quotesData
        //filtro por frases buscadas
        .filter((quoteFilter) => {
          return quoteFilter.quote
            .toLocaleLowerCase()
            .includes(searchQuote.toLocaleLowerCase());
        })
        // trabajando en filtrar por select....
        .filter((characterFilter) => {
          return characterFilter.character.includes(searchCharacter);
        })
        //MAPEO: Me permite obtener por un lado la frase y por otro el personaje de cada uno de los objetos de mi array. De esta manera pinto un unico LI cambiando unicamente los datos variables: quote y character.
        //recordar que debe coincidi el nombre de la API
        .map((dataToRender, index) => {
          return (
            <li key={index}>
              <p>{dataToRender.quote}</p>
              <p>{dataToRender.character}</p>
            </li>
          );
        })
    );
  };
  return (
    <div>
      <h1>Frases de Friends</h1>
      <form>
        <label htmlFor='quoteFilter'>Filtrar por frase</label>
        <input
          type='text'
          id='quote'
          name='quote'
          value={searchQuote}
          onChange={handleInputSearchData}
        ></input>
        {/*SELECTS*/}
        <label htmlFor='characterFilter'>Filtrar por personaje</label>
        <select type='character' id='character' name='character'>
          <option
            name='character'
            id='character-all'
            value='all'
            checked={searchCharacter.character === 'all'}
            onChange={handleSelectOptions}
          >
            Todos
          </option>
          <option
            name='character'
            id='character-Ross'
            value='Ross'
            checked={searchCharacter.character === 'Ross'}
            onChange={handleSelectOptions}
          >
            Ross
          </option>
          <option>Monica</option>
          <option>Chandler</option>
          <option>Phoebe</option>
          <option>Joey</option>
          <option>Rachel</option>
        </select>
      </form>
      {/*Llamo ala función que pinta mis LI*/}
      <ul>{renderHtml()}</ul>
      <form>
        <h2>Añadir una nueva frase</h2>
        <label htmlFor='quote'>Frase</label>
        <input
          type='text'
          id='quote'
          name='quote'
          placeholder='Frase'
          value={addData.quote}
          onChange={handleInputAddData}
        ></input>
        <label htmlFor='character'>Personaje</label>
        <input
          type='character'
          id='character'
          name='character'
          placeholder='Personaje'
          value={addData.character}
          onChange={handleInputAddData}
        ></input>
        <button onClick={handleClickAddBtn}>Añadir nueva frase</button>
      </form>
    </div>
  );
}
export default App;
