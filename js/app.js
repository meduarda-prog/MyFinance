document.addEventListener("DOMContentLoaded", () => {
  initApp();
});

function initApp() {
  const { year, month } = getCurrentYearMonth();
  console.log("App iniciado para:", year, month);
}
