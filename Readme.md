# TODO List - Aplicação de Agenda

Este é um projeto de lista de tarefas (TODO List), onde o usuário pode adicionar, editar, excluir, pesquisar e arquivar tarefas.

------

## Rodando LOCALMENTE

Lembrando que o banco de dados tem de ser iniciado seguindo as seguintes especificações caso você rode localmente
A conexão é feita em:

```
const url = 'mongodb://localhost:27017';
const dbName = 'TODO_List_DB';
const collectionName = 'TODO_List_Collection';
``` 

As seguintes alterações devem ser feitas:
Em ./backend/database.js:
```
const url = 'mongodb://localhost:27017'; // uncomment this line if you are running on your pc
//const url = 'mongodb://mongodb:27017'; // comment this if you are not running on a docker container
```

Lembre-se que o backend deve rodar na porta 3000

### Dependencias necessárias:
``` 
npm install 
``` 
---

### Para rodar o Backend
```
cd backend
nmp run dev 
```
----
### Para rodar o Fontend

```
cd frontend
nmp start
```
----
## Rodando no Docker
https://hub.docker.com/r/gihnubia/todo/tags

```
docker pull gihnubia/todo:todo-backend
docker pull gihnubia/todo:todo-frontend
docker pull gihnubia/todo:todo-mongo-db
```
Caso prefira buildar a imagem do docker pelo código fonte:

```
git clone https://github.com/gihNubia/Agenda.git
cd TOTO_LIST

docker-compose up --build
```
----
## Agenda 
![Tela-imagens-ativas](/images/Tela-tarefas-ativas.png)

![Tela-imagens-ativas](/images/Tela-tarefas-arquivadas.png)

----
## Algumas fontes

https://expressjs.com/pt-br/

https://www.npmjs.com/package/joi

https://www.npmjs.com/package/mongodb

https://joi.dev/api/?v=17.13.3
