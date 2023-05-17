# Dedilly test

## Servidor

Para rodar a primeira versão do servidor

```bash
$ cd \server\poc 
```

rodar o comando

```bash
$ npm start
```

Para testar acessar a Url fornecendo um endereço

```
http://localhost:3000?q={endereço}
```

exemplo

```
http://localhost:3000?q=Av%20Paulista
```

O resultado deverá ser um json parecido com este
```
{
	"latitude": -23.75,
	"longitude": -46.625,
	"temperature": 17.9,
	"windspeed": 12,
	"city": "São Paulo, Brasil"
}

```


## Cliente

Para rodar a versão cliente


```bash
$ cd \client\poc 
```

rodar o comando

```bash
$ npm start
```


## Telas

Exemplo de saída

Ao digitar por ex. "Av Paulista" e pressionar tecla Enter

[[/exemplo.png|Exemplo do cliente]]


