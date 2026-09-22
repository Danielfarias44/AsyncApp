Equipe de Desenvolvimento: 

Bruno Henrique Brasil da Silva - 04185495
Daniel Viana de Farias - 04178809

# Aplicativo de Busca de GIFs

Aplicativo desenvolvido em **React Native com Expo** que permite pesquisar GIFs por texto através de uma barra de pesquisa.

O usuário digita uma palavra ou frase, e o aplicativo envia essa pesquisa para a **API da GIPHY utilizando Axios**. A API retorna GIFs relacionados ao texto pesquisado, que são exibidos no aplicativo.

O aplicativo também possui um **histórico das últimas 5 pesquisas**, armazenado localmente no dispositivo.

##  Bibliotecas utilizadas:

### Axios

Utilizado para realizar as requisições HTTP para a API da GIPHY.

A pesquisa digitada pelo usuário é enviada para a API, que retorna os GIFs relacionados ao texto.

### AsyncStorage

Utilizado para armazenar o histórico de pesquisas localmente no dispositivo.

O aplicativo mantém apenas as **5 pesquisas mais recentes** e evita salvar pesquisas duplicadas.

##  Barra de pesquisa:

O aplicativo utiliza um componente de **barra de pesquisa** para receber o texto digitado pelo usuário.

A barra de pesquisa é responsável por receber a pesquisa e enviar o texto para o `App.js`, onde é feita a requisição para a API utilizando Axios.

Fluxo da pesquisa:

```text
Usuário
   ↓
Barra de pesquisa
   ↓
App.js
   ↓
Axios
   ↓
API da GIPHY
   ↓
GIFs relacionados
```

##  Histórico

As pesquisas realizadas são salvas utilizando o **AsyncStorage**.

O histórico possui limite de 5 pesquisas:

Texto:
1. gato
2. anime
3. cachorro
4. memes
5. futebol


Quando uma nova pesquisa é realizada, a mais antiga é removida para manter o limite de 5 itens.

##  Chave da API da GIPHY

Para utilizar a API, é necessário possuir uma **API Key da GIPHY**.

A chave pode ser obtida através do portal de desenvolvedores da GIPHY.

Depois de obter a chave:

1. Crie um arquivo chamado `.env` na raiz do projeto.
2. Coloque a chave da API dentro do arquivo.


Exemplo:

GIPHY_API_KEY=SUA_CHAVE

##  Instalação

Depois de clonar o projeto, entre na pasta:


cd AsyncApp

Instale todas as dependências:

npm install

##  Testando no navegador

Para testar o aplicativo diretamente no navegador, execute:

npm run web

O Expo iniciará a versão web do aplicativo e abrirá no navegador.

##  Executando com Expo Go

Para executar no celular usando o Expo Go:

npx expo start

Depois, escaneie o QR Code utilizando o aplicativo **Expo Go**.