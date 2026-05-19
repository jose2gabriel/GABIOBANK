export class DashboardView {

  render(accountId = ""): string {
    return `
      <div class="page page--dashboard">
        <header class="app-header">
          <div class="brand brand--compact">
            <div class="brand-mark brand-mark--sm" aria-hidden="true">GB</div>
            <div>
              <h1>Gabio Bank</h1>
              <p class="brand-tagline">Internet Banking</p>
            </div>
          </div>
          <div class="account-badge">
            <span class="account-badge__label">Conta</span>
            <strong id="account-display">${accountId}</strong>
          </div>
        </header>

        <main class="dashboard-main">
          <section class="balance-card" aria-live="polite">
            <p class="balance-card__label">Saldo disponível</p>
            <p class="balance-card__amount">
              <span class="balance-card__currency">R$</span>
              <span id="balance">0,00</span>
            </p>
          </section>

          <section class="operations-card">
            <h2 class="section-title">Nova operação</h2>

            <div class="form-group">
              <label class="field-label" for="value">Valor (R$)</label>
              <input
                id="value"
                type="number"
                min="0.01"
                step="0.01"
                placeholder="0,00"
              />
            </div>

            <div class="form-group">
              <label class="field-label" for="to">Conta destino</label>
              <input
                id="to"
                type="text"
                inputmode="numeric"
                placeholder="Somente para transferência"
              />
            </div>

            <div class="btn-grid">
              <button type="button" id="deposit" class="btn btn--deposit">
                Depositar
              </button>
              <button type="button" id="withdraw" class="btn btn--withdraw">
                Sacar
              </button>
              <button type="button" id="transfer" class="btn btn--transfer">
                Transferir
              </button>
              <button type="button" id="refresh" class="btn btn--ghost">
                Atualizar saldo
              </button>
            </div>
          </section>
        </main>
      </div>
    `;
  }

  bind(actions: {
    depositar: () => void;
    sacar: () => void;
    transferir: () => void;
    atualizar: () => void;
  }) {
    const depositarBtn = document.getElementById("deposit") as HTMLButtonElement;
    const sacarBtn = document.getElementById("withdraw") as HTMLButtonElement;
    const transferirBtn = document.getElementById("transfer") as HTMLButtonElement;
    const atualizarBtn = document.getElementById("refresh") as HTMLButtonElement;

    if (depositarBtn) depositarBtn.onclick = actions.depositar;
    if (sacarBtn) sacarBtn.onclick = actions.sacar;
    if (transferirBtn) transferirBtn.onclick = actions.transferir;
    if (atualizarBtn) atualizarBtn.onclick = actions.atualizar;
  }

  atualizarSaldo(valor: number) {
    const elemento = document.getElementById("balance");

    if (!elemento) return;

    const saldo = isNaN(valor) ? 0 : valor;
    elemento.innerText = saldo.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  validarValor():
    | { ok: true; valor: number }
    | { ok: false; mensagem: string } {
    const input = document.getElementById("value") as HTMLInputElement;

    if (!input || input.value.trim() === "") {
      return { ok: false, mensagem: "Informe um valor maior que zero" };
    }

    const valor = Number(input.value);

    if (Number.isNaN(valor)) {
      return { ok: false, mensagem: "Valor inválido" };
    }

    if (valor < 0) {
      return { ok: false, mensagem: "O valor não pode ser negativo" };
    }

    if (valor === 0) {
      return { ok: false, mensagem: "Informe um valor maior que zero" };
    }

    return { ok: true, valor };
  }

  obterContaDestino(): string {
    const input = document.getElementById("to") as HTMLInputElement;

    return input?.value?.trim() || "";
  }
}
