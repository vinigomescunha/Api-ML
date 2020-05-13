# Api-ML
Buscando dados na API Pública do Mercado Livre

## Pre Requisitos

Nodejs

### Como Usar

via linha de comando:

```
npm install
```

```
npm start
```

### Testes Integrados com a API do Mercado Livre

```
npm test
```

pode conferir a cobertura dos testes na pasta /coverage

### jsDoc 

```
npm run doc
```

pode conferir documentação jsdoc na pasta /docs

### Erros Comuns
```
code: 'EADDRINUSE',
  errno: 'EADDRINUSE',
  syscall: 'listen',
  address: '::',
  port: 8090
```

A porta 8090 está ocupada

```
fuser -k 8090/tcp
```