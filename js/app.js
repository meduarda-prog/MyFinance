document.addEventListener("DOMContentLoaded", () => {
  initApp();
});

function initApp() {
  const addButton = document.getElementById("btnAdicionar");
  addButton.addEventListener("click", handleAddTransaction);

  updateDashboard();
}

function handleAddTransaction() {
  const description = document.getElementById("descricao").value;
  const value = parseFloat(document.getElementById("valor").value);
  const type = document.getElementById("tipo").value;
  const category = document.getElementById("categoria").value;

  if (!description || !value) {
    alert("Preencha todos os campos");
    return;
  }

  const { year, month } = getCurrentYearMonth();
  const data = getData();

  // Criar estrutura se não existir
  if (!data[year]) data[year] = {};
  if (!data[year][month]) data[year][month] = [];

  data[year][month].push({
    description,
    value,
    type,
    category,
    date: new Date().toISOString()
  });

  saveData(data);

  clearForm();
  updateDashboard();
}

function clearForm() {
  document.getElementById("descricao").value = "";
  document.getElementById("valor").value = "";
}

function updateDashboard() {
  const { year, month } = getCurrentYearMonth();
  const data = getData();

  const transactions =
    data[year] && data[year][month]
      ? data[year][month]
      : [];

  const totals = calculateMonthlyTotals(transactions);

  updateCards(totals);

  document.getElementById("totalReceita").textContent =
    `R$ ${totals.income.toFixed(2)}`;

  document.getElementById("totalDespesa").textContent =
    `R$ ${totals.expense.toFixed(2)}`;

  document.getElementById("saldo").textContent =
    `R$ ${totals.balance.toFixed(2)}`;

  document.getElementById("percentual").textContent =
    `${totals.percentage}%`;
}
