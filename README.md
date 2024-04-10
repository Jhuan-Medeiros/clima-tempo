# Senai Weather App

Este é um projeto desenvolvido para as aulas do Senai, utilizando a API do OpenWeatherMap para obter informações meteorológicas. 

## Configuração

Para começar a usar o aplicativo, siga os passos abaixo:

1. Execute o comando `npm install` para instalar as dependências necessárias.

2. Crie um arquivo chamado `config.json`.

3. Dentro do arquivo `config.json`, adicione as seguintes informações:
   ```json
   {
     "apikey": "SUA API"
   }

## Funções

No arquivo App.js temos além da utilização do axios, para fazer requisições, do express, para criar o servidor e gerenciar suas rotas, e o cors, que permite que as solicitações de diferentes origens sejam feitas.

A constante traducaoClima define as traduções predefinidas para a resposta da API.

app.get faz requisições na API baseada na cidade em que o usuário selecione.

No body do index.html temos a tela de carregamento que é uma simulação feita com um gif, a div conteudo que contém os elementos da página, incluindo a div formClima que faz com que seja obtidas as respotas do usuário e sejam mostradas na tela as informações.

No script temos duas funções com addEventListener para que possam ser utilizados o botão de pesquisa e a tecla enter para que seja ativado a função que procura os dados na API.  Dentro do try temos a resposta da API que por metódo de if e else if define a mudança do símbolo do clima, outro if que define o fundo baseado na condição climática e um if que se consegue acessar os dados da API cria um innerHtml com as respostas da API, imagens e fundo.  Por fim temos a tratação dos erros com metódo catch.

### Gere sua api de graça no site : 

* https://openweathermap.org/api

![image](https://github.com/Viniciusulpicio/Api_openweathermap/assets/145928303/0fc92b1f-466a-46d1-938a-627d3ec81283)
