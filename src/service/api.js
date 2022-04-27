// Fichero src/services/api.js
const callToApi = () => {
  // Llamamos a la API
  return (
    fetch(
      'https://beta.adalab.es/curso-intensivo-fullstack-recursos/apis/quotes-friends-tv-v1/quotes.json'
    ) //recibimos promesa en formato json
      .then((response) => response.json())
      // guardo esa respuesta para poder usarla luego
      .then((data) => {
        return data;
      })
  );
};

export default callToApi;
