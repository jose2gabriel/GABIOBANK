let timerOcultar: ReturnType<typeof setTimeout> | null = null;

export function mostrarToast(
  mensagem: string,
  tipo: "success" | "error" = "success",
  duracaoMs = 2800
) {
  const toast = document.getElementById("toast");
  if (!toast) return;

  if (timerOcultar) {
    clearTimeout(timerOcultar);
    timerOcultar = null;
  }

  toast.classList.remove("show");
  toast.innerText = mensagem;
  toast.className = `toast toast--${tipo}`;

  requestAnimationFrame(() => {
    toast.classList.add("show");
  });

  timerOcultar = setTimeout(() => {
    toast.classList.remove("show");
    timerOcultar = null;
  }, duracaoMs);
}