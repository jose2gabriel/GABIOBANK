import { mostrarToast } from "../utils/toast";

export class LoginView {

  render(): string {
    return `
      <div class="page page--login">
        <div class="login-card">
          <header class="brand">
            <div class="brand-mark" aria-hidden="true">GB</div>
            <h1>Gabio Bank</h1>
            <p class="brand-tagline">Internet Banking · Protocolo GBTP</p>
          </header>

          <form class="login-form" onsubmit="return false">
            <label class="field-label" for="account">Número da conta</label>
            <input
              id="account"
              type="text"
              inputmode="numeric"
              placeholder="Ex.: 1001, 1002, 1003"
              autocomplete="off"
            />
            <button type="button" id="loginBtn" class="btn btn--primary">
              Acessar conta
            </button>
          </form>

          <footer class="login-footer">
            <span class="login-hint">Contas de demonstração: 1001 · 1002 · 1003</span>
          </footer>
        </div>
      </div>
    `;
  }

  bind(onLogin: (id: string) => void) {
    const btn = document.getElementById("loginBtn") as HTMLButtonElement;
    const input = document.getElementById("account") as HTMLInputElement;

    if (!btn) return;

    btn.onclick = () => {
      const id = input?.value?.trim();

      if (!id) {
        mostrarToast("Digite o ID da conta", "error");
        return;
      }

      onLogin(id);
    };
  }

  setCarregando(ativo: boolean) {
    const btn = document.getElementById("loginBtn") as HTMLButtonElement;
    const input = document.getElementById("account") as HTMLInputElement;

    if (btn) {
      btn.disabled = ativo;
      btn.textContent = ativo ? "Conectando..." : "Acessar conta";
    }

    if (input) {
      input.disabled = ativo;
    }
  }
}
