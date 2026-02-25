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

  if (!description || isNaN(value)) {
    alert("Preencha todos os campos corretamente");
    return;
  }

  const { year, month } = getCurrentYearMonth();
  const data = getData();

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
}
let chart;

function updateChart(totals) {
  const ctx = document.getElementById("grafico");

  if (!ctx) return;

  const categories = totals.categories;
  const income = totals.income;

  const labels = [];
  const data = [];

  for (let category in categories) {
    const value = categories[category];
    const percent = income > 0 ? ((value / income) * 100).toFixed(1) : 0;

    labels.push(`${category} - R$${value} (${percent}%)`);
    data.push(value);
  }

  if (chart) {
    chart.destroy();
  }

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
function updateDashboard() {
  const { year, month } = getCurrentYearMonth();
  const data = getData();

  const transactions =
    data[year] && data[year][month]
      ? data[year][month]
      : [];

  const totals = calculateMonthlyTotals(transactions);

  updateCards(totals);
  updateChart(totals); // <- AQUI
}
