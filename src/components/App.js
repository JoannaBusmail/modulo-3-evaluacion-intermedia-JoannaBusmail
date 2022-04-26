import '../styles/index.scss';
import { useState } from 'react';
import friendsQuotesData from '../service/friends-quotes.json';

function App() {
  //variables de estado para:
  // 1. mis listas iniciales que cambiarán a medida que vaya incluyendo frases nuevas o si quiero filtrarlas
  // 2. Mis inputs para añadir la nueva info. este se compone de un objeto. Asi puedo manejar un objeto con mas de 1 input
  const [quotesData, setquotesData] = useState(friendsQuotesData);
  const [search, setSearch] = useState('');
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
  };

  const handleInputSearchData = (ev) => {
    ev.preventDefault();
  };
  const renderHtml = () => {
    //MAPEO: Me permite obtener por un lado la frase y por otro el personaje de cada uno de los objetos de mi array. De esta manera pinto un unico LI cambiando unicamente los datos variables: quote y character.
    //recordar que debe coincidi el nombre de la API
    return quotesData.map((dataToRender, index) => {
      return (
        <li key={index}>
          <p>{dataToRender.quote}</p>
          <p>{dataToRender.character}</p>
        </li>
      );
    });
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
          value={search.quote}
          onChange={handleInputSearchData}
        ></input>
        <label htmlFor='characterFilter'>Filtrar por personaje</label>
        <select
          type='character'
          id='character'
          name='character'
          value={search.character}
          onChange={handleInputSearchData}
        >
          <option>Todos</option>
          <option>Ross</option>
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
