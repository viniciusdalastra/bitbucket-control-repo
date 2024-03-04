# Bitbucket Branch Synchronizer

Este é um projeto de sincronizador de branches para o Bitbucket, oferecendo diversos endpoints para diferentes funcionalidades, incluindo autenticação e obtenção de informações sobre repositórios.

## Como Rodar o Serviço
### Yarn
- **Instalação**
```
yarn
```
- **Subir o Serviço Localmente**
```
yarn start:dev
```
- **Link de Acesso ao Swagger**
```
http://localhost:PORT/api
```

## Endpoints Disponíveis

### Auth

- **Descrição:** Autenticação simples.
- **Método HTTP:** POST
- **URL:** `/auth`
- **Corpo da Requisição:**
  ```json
  {
    "login": "seu_login",
    "password": "sua_senha"
  }
  ```
- **Resposta:**
  ```json
  {
    "token": "seu_token_jwt"
  }
  ```

### Repositorie

- **Descrição:** Informações de workspace, branches e repositórios.
- **Método HTTP:** GET
- **URL:** `/repositorie`
- **Cabeçalho da Requisição:**
  ```json
  {
    "Authorization": "Bearer seu_token_jwt"
  }
  ```
- **Resposta:** JSON composto de informações sobre os repositórios.

## Formato do Arquivo `repo.json`

O arquivo `repo.json` contém informações em formato de array sobre os repositórios. Cada objeto no array possui os seguintes campos:

- `type`: Tipo do repositório.
- `full_name`: Nome completo do repositório.
- `links`: Links relacionados ao repositório, incluindo links para si mesmo, HTML e avatar.
- `name`: Nome do repositório.
- `uuid`: UUID do repositório.
- `workspace`: UUID de Espaço de trabalho do repositório.

Exemplo:
```json
[
  {
    "type": "tipo",
    "full_name": "nome_completo",
    "links": {
      "self": {
        "href": "url"
      },
      "html": {
        "href": "url"
      },
      "avatar": {
        "href": "url"
      }
    },
    "name": "nome",
    "uuid": "uuid",
    "workspace": "workspace"
  }
]
```

## Configuração de Ambiente

Certifique-se de configurar as variáveis de ambiente antes de executar o projeto.

Exemplo de arquivo `.env`:
```
PORT=8000
LOGIN=seu_login
PASSWORD=sua_senha
JWT_AUTH_KEY=sua_chave_jwt
LOGIN_BITBUCKET=seu_login_bitbucket
PASSWORD_BITBUCKET=sua_senha_bitbucket
```

---
Este projeto é uma ferramenta útil para interagir com os recursos do Bitbucket de forma programática. Fique à vontade para contribuir ou fazer sugestões de melhorias.
