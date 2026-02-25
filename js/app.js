document.addEventListener("DOMContentLoaded", () => {
  initApp();
});

let chart;

function initApp() {
  document
    .getElementById("btnAdicionar")
    .addEventListener("click", addTransaction);

  updateDashboard();
}

function addTransaction() {
  const description = document.getElementById("descricao").value;
  const amount = parseFloat(document.getElementById("valor").value);
  const type = document.getElementById("tipo").value;
  const category = document.getElementById("categoria").value || "Outros";

  if (!description || isNaN(amount)) {
    alert("Preencha corretamente!");
    return;
  }

  const transaction = {
    description,
    amount,
    type,
    category
  };

  const { year, month } = getCurrentYearMonth();
  const data = getData();

  if (!data[year]) data[year] = {};
  if (!data[year][month]) data[year][month] = [];

  data[year][month].push(transaction);
  saveData(data);

  updateDashboard();
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
  updateChart(totals);
}

function updateCards(totals) {
  document.getElementById("totalReceita").textContent =
    `R$ ${totals.income.toFixed(2)}`;

  document.getElementById("totalDespesa").textContent =
    `R$ ${totals.expense.toFixed(2)}`;

  document.getElementById("saldo").textContent =
    `R$ ${totals.balance.toFixed(2)}`;

  const percentElement = document.getElementById("percentual");
  if (percentElement) {
    percentElement.textContent = `${totals.percent}%`;
  }
}

function updateChart(totals) {
  const ctx = document.getElementById("grafico");
  if (!ctx) return;

  const categories = totals.categories;
  const income = totals.income;

  const labels = [];
  const data = [];

  for (let category in categories) {
    const value = categories[category];
    const percent =
      income > 0 ? ((value / income) * 100).toFixed(1) : 0;

    labels.push(`${category} (${percent}%)`);
    data.push(value);
  }

  if (chart) chart.destroy();

  chart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: labels,
      datasets: [{
        data: data
      }]
    }
  });
}
