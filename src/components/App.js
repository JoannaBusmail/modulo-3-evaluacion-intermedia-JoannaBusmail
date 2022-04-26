import '../styles/index.scss';
import { useState } from 'react';
import friendsQuotesData from '../service/friends-quotes.json';

function App() {
  const [quotesData, setquotesData] = useState(friendsQuotesData);
  const [addData, setAddData] = useState({
    quote: '',
    character: '',
  });

  const handleInputAddData = (ev) => {
    setAddData({ ...addData, [ev.target.id]: ev.target.value });
  };

  const renderHtml = () => {
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
        <button>Añadir nueva frase</button>
      </form>
    </div>
  );
}
export default App;
