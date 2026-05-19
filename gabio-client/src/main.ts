import { BankService } from "./core/BankService";
import { AccountController } from "./controllers/AccountController";
import { LoginView } from "./views/LoginView";
import { DashboardView } from "./views/DashboardView";
import { mostrarToast } from "./utils/toast";

const raiz = document.getElementById("app") as HTMLElement;

const servicoBanco = new BankService();
const conta = new AccountController();

const telaLogin = new LoginView();
const telaDashboard = new DashboardView();

let ignorarProximoToast = false;
let contaAtiva = "";
let servidorJaConectou = false;
let aguardandoLogin = false;

function montarLogin() {
  raiz.innerHTML = telaLogin.render();
  telaLogin.bind(iniciarLogin);
}

function iniciarLogin(id: string) {
  if (!id || aguardandoLogin) return;

  aguardandoLogin = true;
  contaAtiva = id;
  telaLogin.setCarregando(true);

  servicoBanco.conectar(
    (dados) => {
      if (aguardandoLogin) {
        aguardandoLogin = false;
        telaLogin.setCarregando(false);

        if (dados.STATUS === "ERROR") {
          mostrarToast(
            dados.MESSAGE?.trim() || "Não foi possível acessar a conta",
            "error"
          );
          servicoBanco.desconectar();
          contaAtiva = "";
          servidorJaConectou = false;
          return;
        }

        conta.definirConta(id);
        entrarNoDashboard(id, dados);
        return;
      }

      processarRespostaServidor(dados);
    },
    {
      onConectado: () => {
        servidorJaConectou = true;
        servicoBanco.enviar("BALANCE", contaAtiva);
      },
      onErro: () => {
        if (!aguardandoLogin) return;

        aguardandoLogin = false;
        telaLogin.setCarregando(false);
        contaAtiva = "";
        mostrarToast(
          "Não foi possível conectar ao servidor. Execute o gabio-server na porta 3000.",
          "error"
        );
      },
      onDesconectado: () => {
        if (servidorJaConectou && contaAtiva && !aguardandoLogin) {
          mostrarToast("Conexão com o servidor encerrada.", "error");
        }
        servidorJaConectou = false;
      },
    }
  );
}

function entrarNoDashboard(id: string, dadosIniciais: Record<string, string>) {
  raiz.innerHTML = telaDashboard.render(id);

  if (dadosIniciais.BALANCE !== undefined) {
    const saldo = Number(dadosIniciais.BALANCE);
    conta.atualizarSaldo(saldo);
    telaDashboard.atualizarSaldo(saldo);
  }

  telaDashboard.bind({
    depositar: () =>
      executarOperacao("DEPOSIT", id, () => telaDashboard.validarValor()),

    sacar: () =>
      executarOperacao("WITHDRAW", id, () => telaDashboard.validarValor()),

    transferir: () => {
      const valor = telaDashboard.validarValor();
      if (!valor.ok) {
        mostrarToast(valor.mensagem, "error");
        return;
      }

      const destino = telaDashboard.obterContaDestino();
      if (!destino) {
        mostrarToast("Informe a conta de destino", "error");
        return;
      }

      if (destino === id) {
        mostrarToast("A conta de destino deve ser diferente da sua", "error");
        return;
      }

      if (!enviarOuAvisar("TRANSFER", id, valor.valor, destino)) return;

      setTimeout(() => {
        ignorarProximoToast = true;
        servicoBanco.enviar("BALANCE", id);
      }, 200);
    },

    atualizar: () => {
      enviarOuAvisar("BALANCE", id);
    },
  });
}

function processarRespostaServidor(dados: Record<string, string>) {
  if (dados.BALANCE !== undefined) {
    const saldo = Number(dados.BALANCE);
    conta.atualizarSaldo(saldo);
    telaDashboard.atualizarSaldo(saldo);
  }

  if (ignorarProximoToast) {
    ignorarProximoToast = false;
    return;
  }

  const mensagem = dados.MESSAGE?.trim();
  if (!mensagem) return;

  const tipo = dados.STATUS === "ERROR" ? "error" : "success";
  mostrarToast(mensagem, tipo);
}

function enviarOuAvisar(
  operacao: string,
  id: string,
  valor = 0,
  destino = ""
): boolean {
  const enviado = servicoBanco.enviar(operacao, id, valor, destino);
  if (!enviado) {
    mostrarToast(
      "Sem conexão com o servidor. Inicie o gabio-server (porta 3000).",
      "error"
    );
  }
  return enviado;
}

function executarOperacao(
  operacao: string,
  id: string,
  obterDados: () =>
    | { ok: true; valor: number }
    | { ok: false; mensagem: string }
) {
  const dados = obterDados();
  if (!dados.ok) {
    mostrarToast(dados.mensagem, "error");
    return;
  }

  if (!enviarOuAvisar(operacao, id, dados.valor)) return;

  setTimeout(() => {
    ignorarProximoToast = true;
    servicoBanco.enviar("BALANCE", id);
  }, 200);
}

montarLogin();
