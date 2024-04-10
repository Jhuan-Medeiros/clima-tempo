// Importando as bibliotecas necessárias
const express = require ('express'); // Express é um framework para Node.js que facilita a criação de APIs
const axios = require ('axios'); // Axios é uma biblioteca para fazer requisições HTTP
const path = require ('path'); // Path é um módulo do Node.js para lidar com caminhos de arquivo
const cors = require ('cors'); // CORS é um middleware do Express para permitir requisições de diferentes origens
const config = require('./config.json'); // Importando as configurações de um arquivo JSON
const apikey = config.apikey; // Obtendo a chave da API do arquivo de configuração

// Inicializando o aplicativo Express
const app = express();
app.listen(3000); // Ouvindo na porta 3000

// Usando middlewares
app.use(cors()); // Permitindo CORS para todas as rotas
app.use(express.json()); // Parseando o corpo das requisições como JSON
app.use(express.static(path.join(__dirname, 'public'))); // Servindo arquivos estáticos da pasta 'public'

// Mapeando traduções para os diferentes tipos de clima
const traducaoClima = {
    "few clouds": "Poucas Nuvens",
    "scattered clouds": "Nuvens Dispersas",
    "overcast clouds": "Nublado",
    "broken clouds": "Nuvens Dispersas",
    "shower clouds": "Nuvens Cheias",
    "clear sky": "Céu Limpo",
    "light rain": "Chuva Leve",
    "light intensity drizzle": "Chuvisco Intenso",
    "moderate rain": "Chuva Moderada",
    "shower rain": "Chuva Rápida",
    "mist": "Névoa",
    "thunderstorm": "Tempestade",
    "snow": "Neve",
    "light intensity shower rain": "Chuva Leve de Intensidade",
    // Adicionando uma tradução temporária para um tipo de clima que não está mapeado
}

// Rota para obter dados meteorológicos de uma determinada cidade
app.get('/climatempo/:cidade', async (req, res)=>{
    const city = req.params.cidade; // Obtendo o nome da cidade dos parâmetros da requisição

    try{
        // Fazendo uma requisição à API de clima utilizando axios
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`);
           
        if(response.status === 200){ // Verificando se a requisição foi bem-sucedida
                // Traduzindo o tipo de clima para o idioma desejado ou mantendo-o como está
                const clima = traducaoClima[response.data.weather[0].description] || response.data.weather[0].description;

                // Montando um objeto com os dados meteorológicos relevantes
                const weatherData = {
                    Temperatura: response.data.main.temp,
                    Umidade: response.data.main.humidity,
                    VelocidadeDoVento: response.data.wind.speed,
                    Clima: clima
                };

                // Enviando os dados meteorológicos como resposta
                res.send(weatherData);
            } else {
                // Caso a requisição à API de clima não seja bem-sucedida, retornar um erro
                res.status(response.status).send({erro: 'Erro ao obter dados meteorológicos'});
            }
    } catch (error){
        // Tratando erros durante a requisição à API de clima
        res.status(500).send({erro:'Erro ao obter dados meteorológicos', error });
    }
});

