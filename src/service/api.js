const getApi = () => {
  return (
    fetch(
      'https://beta.adalab.es/curso-intensivo-fullstack-recursos/apis/quotes-friends-tv-v1/quotes.json'
    )
      .then((response) => response.json())
      //no tengo que formatear la info de la api, no hace falta map. recojo todos los datos que me manda
      .then((data) => {
        return data;
      })
  );
};

export default getApi;
