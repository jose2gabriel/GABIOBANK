# gabio-client

Interface web do Gabio Bank. Envia e recebe mensagens no formato **GBTP** por **WebSocket**.

## Pré-requisito

O servidor do grupo tem que estar ativo em:

```
ws://localhost:3000
```

Sem isso o login fica em "Conectando..." ou mostra erro de conexão.

## Rodar o projeto

```bash
npm install
npm start
```

Outros comandos:

- `npm run dev` — igual ao start, abre o navegador
- `npm run build` — gera a pasta `dist/` (não precisa para a apresentação)

## O que o cliente faz

1. Login com o ID da conta
2. Consulta de saldo (`BALANCE`)
3. Depósito, saque e transferência
4. Mostra o saldo na tela e mensagens que vêm do servidor (`MESSAGE`)

O cliente **não** guarda lista de contas nem valida se o ID existe — isso é resposta do servidor (`STATUS: OK` ou `ERROR`).

## Protocolo GBTP

Mensagens em texto, uma chave por linha: `CHAVE:valor`, separadas por `\n`.

### Requisição (sempre os 4 campos)

| Campo | Uso |
|-------|-----|
| `OPERATION` | `BALANCE`, `DEPOSIT`, `WITHDRAW` ou `TRANSFER` |
| `ACCOUNT_ID` | conta que está operando |
| `TO_ACCOUNT_ID` | só na transferência; senão deixa vazio |
| `VALUE` | valor com duas casas (`100.00`); em saldo use `0.00` |

Exemplo — consultar saldo:

```
OPERATION:BALANCE
ACCOUNT_ID:1001
TO_ACCOUNT_ID:
VALUE:0.00
```

Exemplo — transferir R$ 75,00 da 1001 para a 1002:

```
OPERATION:TRANSFER
ACCOUNT_ID:1001
TO_ACCOUNT_ID:1002
VALUE:75.00
```

### Resposta (sempre os 3 campos)

| Campo | Uso |
|-------|-----|
| `STATUS` | `OK` ou `ERROR` |
| `MESSAGE` | texto explicando o que aconteceu |
| `BALANCE` | saldo da conta principal depois da operação |

Exemplo — sucesso no depósito:

```
STATUS:OK
MESSAGE:Depósito realizado com sucesso
BALANCE:350.00
```

Exemplo — saque sem saldo:

```
STATUS:ERROR
MESSAGE:Saldo insuficiente
BALANCE:30.00
```

## Estrutura do código

```
gabio-client/
├── index.html
├── style.css
├── package.json
├── tsconfig.json
└── src/
    ├── main.ts              # fluxo login e dashboard
    ├── core/
    │   ├── BankService.ts   # WebSocket
    │   └── GbtpProtocol.ts  # monta e lê mensagens GBTP
    ├── views/
    │   ├── LoginView.ts
    │   └── DashboardView.ts
    ├── controllers/
    │   └── AccountController.ts
    ├── models/
    │   └── Account.ts
    └── utils/
        └── toast.ts         # avisos na tela
```

## Observações

- A URL do servidor está em `src/core/BankService.ts` (porta 3000).
- Valores negativos ou zero são barrados na interface antes de enviar; o resto das regras (conta existe, saldo, etc.) vem do backend.
