import { GbtpProtocol } from "./GbtpProtocol";

type CallbacksConexao = {
  onConectado?: () => void;
  onDesconectado?: () => void;
  onErro?: () => void;
};

export class BankService {
  private socket!: WebSocket;
  private conectado = false;

  conectar(
    onMensagem: (dados: Record<string, string>) => void,
    callbacks?: CallbacksConexao
  ) {
    if (this.socket) {
      this.desconectar();
    }

    this.conectado = false;
    this.socket = new WebSocket("ws://localhost:3000");

    this.socket.onopen = () => {
      this.conectado = true;
      console.log("Conectado ao servidor GBTP");
      callbacks?.onConectado?.();
    };

    this.socket.onmessage = (evento) => {
      const dados = GbtpProtocol.decode(evento.data);
      onMensagem(dados);
    };

    this.socket.onclose = () => {
      this.conectado = false;
      console.log("Conexão encerrada");
      callbacks?.onDesconectado?.();
    };

    this.socket.onerror = () => {
      console.error("Erro na conexão WebSocket");
      callbacks?.onErro?.();
    };
  }

  enviar(
    operacao: string,
    conta: string,
    valor = 0,
    destino = ""
  ): boolean {
    if (!this.conectado || !this.socket) {
      console.warn("Sem conexão com o servidor");
      return false;
    }

    const mensagem = GbtpProtocol.encode({
      operation: operacao,
      account: conta,
      value: valor,
      to: destino,
    });

    this.socket.send(mensagem);
    return true;
  }

  estaConectado(): boolean {
    return this.conectado;
  }

  desconectar() {
    if (this.socket) {
      this.socket.close();
    }
  }
}