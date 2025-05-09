# Description

Esse projeto é uma POC de integração do client Dapr com Nest

# Project setup

## 1 - Instalar Dapr na maquina

https://docs.dapr.io/getting-started/install-dapr-cli/

## 2 - Testar execução do Dapr

https://docs.dapr.io/getting-started/install-dapr-selfhost/

### obs.: em alguns casos não vai ser possivel rodar o dapr utilizando o docker, nesses casos podemos utilizar o podman, siga os passos abaixo para fazer a instalação do podman e execução do dapr com podman

- Install podman: https://podman-desktop.io/downloads
- How-To run Dapr with podman: https://docs.dapr.io/operations/hosting/self-hosted/self-hosted-with-podman/

Temos no projeto dois comandos para executar o Darp já configurados, um com docker e outro com podman

```bash
cd client

yarn init
or
yarn init:podman
```

## 3 - Rodando client

Para que o pub-sub funcione corretamente precisaremos de um projeto que será responsável por fazer o publish dos eventos, e outro projeto para consumir os eventos da fila.

Para rodar o projeto de client basta executar os seguintes comandos 

```bash
cd client
yarn install
yarn start
```

## 4 - Rodando server

Para rodar o projeto de server basta executar os seguintes comandos 

```bash
cd server
yarn start:dapr
```


## 5 - Rodando consumer

Para rodar o projeto de consumer basta executar os seguintes comandos 

```bash
cd consumer
yarn start
```

## 6 - Enviando eventos

Para enviar um eventos precisamos fazer uma request para o projeto Client na seguinte url

```bash
curl -X POST http://localhost:3000/events -H "Content-Type: application/json" -d '{"eventType": "test","eventDescription": "This is an example event"}'
```





# Referencias

https://github.com/dapr/quickstarts/tree/master