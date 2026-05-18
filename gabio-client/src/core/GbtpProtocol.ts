export class GbtpProtocol {

  static encode(dados: {
    operation: string;
    account: string;
    to?: string;
    value?: number;
  }): string {
    return [
      `OPERATION:${dados.operation}`,
      `ACCOUNT_ID:${dados.account}`,
      `TO_ACCOUNT_ID:${dados.to ?? ""}`,
      `VALUE:${GbtpProtocol.formatarValor(dados.value ?? 0)}`,
    ].join("\n");
  }

  static decode(mensagem: string): Record<string, string> {
    const resultado: Record<string, string> = {};

    if (!mensagem) return resultado;

    const linhas = mensagem.split("\n");

    for (const linha of linhas) {
      if (!linha.includes(":")) continue;

      const [chave, ...resto] = linha.split(":");
      const valor = resto.join(":");

      resultado[chave.trim()] = valor.trim();
    }

    return resultado;
  }

  static formatarValor(valor: number): string {
    return valor.toFixed(2);
  }
}