import { Account } from "../models/Account";

export class AccountController {
  private conta: Account | null = null;

  definirConta(id: string) {
    const idLimpo = id?.trim();

    if (!idLimpo) {
      throw new Error("ID da conta inválido");
    }

    this.conta = {
      id: idLimpo,
      balance: 0,
    };
  }

  atualizarSaldo(saldo: number) {
    if (!this.conta) return;

    this.conta.balance = saldo < 0 ? 0 : saldo;
  }

  obterConta(): Account | null {
    return this.conta;
  }

  obterId(): string {
    return this.conta?.id ?? "";
  }

  obterSaldo(): number {
    return this.conta?.balance ?? 0;
  }

  temConta(): boolean {
    return this.conta !== null;
  }

  limparConta() {
    this.conta = null;
  }
}