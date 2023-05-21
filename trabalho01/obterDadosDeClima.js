import axios from "axios";

async function obterDadosDeClima(valorDeReferencia = "São Paulo") {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${valorDeReferencia}&appid=503715f88b0e17d36452ae1fd90b551f`;
    const response = await axios.get(url);
    const dadosDeClima = response.data;
    return dadosDeClima;
}

export default obterDadosDeClima;
