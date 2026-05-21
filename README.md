#  Gabio Bank — Cliente Web GBTP

Projeto desenvolvido para a disciplina de Redes de Computadores com foco na implementação de um cliente web utilizando o protocolo de aplicação GBTP (Gabio Bank Transaction Protocol).

O sistema simula operações bancárias em uma arquitetura cliente-servidor utilizando comunicação via WebSocket.

---

#  Objetivo do Projeto

O objetivo do trabalho é aplicar conceitos da camada de aplicação através da criação de um frontend capaz de:

- se conectar a um servidor WebSocket;
- enviar mensagens seguindo o protocolo GBTP;
- processar respostas do servidor;
- realizar operações bancárias;
- atualizar a interface em tempo real.

---

#  Tecnologias Utilizadas

- HTML5
- CSS3
- TypeScript
- Parcel
- WebSocket API

---

#  Arquitetura do Projeto

O frontend foi organizado utilizando separação de responsabilidades.

```txt
gabio-client/
│
├── src/
│   │
│   ├── controllers/
│   │   └── AccountController.ts
│   │
│   ├── core/
│   │   ├── BankService.ts
│   │   └── GbtpProtocol.ts
│   │
│   ├── models/
│   │   └── Account.ts
│   │
│   ├── views/
│   │   ├── LoginView.ts
│   │   └── DashboardView.ts
│   │
│   └── main.ts
│
├── index.html
├── style.css
├── package.json
├── tsconfig.json
└── README.md
```

---

#  Interface

O sistema possui duas telas principais:

##  Tela de Login

Responsável pela entrada do usuário através do ID da conta bancária.

### Funcionalidades:
- validação do ID;
- acesso ao dashboard;
- feedback visual ao usuário.

---

##  Dashboard Bancário

Após o login o usuário pode:

- consultar saldo;
- realizar depósitos;
- realizar saques;
- realizar transferências;
- atualizar saldo em tempo real.

---

#  Comunicação com o Servidor

A comunicação é realizada utilizando WebSocket.

```txt
ws://localhost:7001
```

O frontend envia mensagens no padrão GBTP e recebe respostas do servidor.

---

#  Protocolo GBTP

O GBTP é um protocolo textual baseado em pares:

```txt
CHAVE:VALOR
```

Cada campo é separado por quebra de linha (`\n`).

---

#  Estrutura das Requisições

| Campo | Descrição |
|---|---|
| OPERATION | Operação bancária |
| ACCOUNT_ID | Conta principal |
| TO_ACCOUNT_ID | Conta destino |
| VALUE | Valor da operação |

---

#  Operações Implementadas

---

##  Consulta de Saldo

### Requisição

```txt
OPERATION:BALANCE
ACCOUNT_ID:1001
TO_ACCOUNT_ID:
VALUE:0
```

### Resposta

```txt
STATUS:OK
MESSAGE:Saldo consultado com sucesso
BALANCE:250.00
```

---

##  Depósito

### Requisição

```txt
OPERATION:DEPOSIT
ACCOUNT_ID:1001
TO_ACCOUNT_ID:
VALUE:100
```

### Resposta

```txt
STATUS:OK
MESSAGE:Depósito realizado com sucesso
BALANCE:350.00
```

---

##  Saque

### Requisição

```txt
OPERATION:WITHDRAW
ACCOUNT_ID:1001
TO_ACCOUNT_ID:
VALUE:50
```

### Resposta

```txt
STATUS:OK
MESSAGE:Saque efetuado
BALANCE:300.00
```

### Resposta de erro

```txt
STATUS:ERROR
MESSAGE:Saldo insuficiente
BALANCE:30.00
```

---

##  Transferência

### Requisição

```txt
OPERATION:TRANSFER
ACCOUNT_ID:1001
TO_ACCOUNT_ID:1002
VALUE:75
```

### Resposta

```txt
STATUS:OK
MESSAGE:Transferência concluída
BALANCE:225.00
```

### Resposta de erro

```txt
STATUS:ERROR
MESSAGE:Conta destino inexistente
BALANCE:225.00
```

---

#  Como Executar o Projeto

## 1️ Instalar dependências

```bash
npm install
```

---

## 2️ Executar o frontend

```bash
npm start
```

---

## 3️ Abrir no navegador

O Parcel abrirá automaticamente:

```txt
http://localhost:1234
```

---

#  Importante

O backend deve estar rodando em:

```txt
ws://localhost:7001
```

Sem o servidor ativo:
- a interface abrirá normalmente;
- porém as operações bancárias não funcionarão.

---

#  Estrutura do Código

| Camada | Responsabilidade |
|---|---|
| Views | Interface gráfica |
| Controllers | Controle da conta |
| Services | Comunicação WebSocket |
| Protocol | Implementação do GBTP |
| Models | Estrutura dos dados |

---

#  Funcionalidades Extras

O frontend também possui:

- atualização automática do saldo;
- mensagens visuais estilo banco;
- layout responsivo;
- tratamento de erros;
- separação de responsabilidades;
- parser do protocolo GBTP;
- interface moderna inspirada em aplicativos bancários.

---

#  Grupo

| Nome |
|---|---|
| Geovany|
| Jose gabriel |
| Afonso| 

---

#  Disciplina

Redes de Computadores  

---

#  Autor

Projeto acadêmico desenvolvido para fins educacionais utilizando TypeScript, WebSocket e protocolos da camada de aplicação.# GABIOBANK
