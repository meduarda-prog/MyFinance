let chartResumo;
let chartDetalhado;

document.addEventListener("DOMContentLoaded", () => {
  initApp();
});

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

  const transaction = { description, amount, type, category };

  const { year, month } = getCurrentYearMonth();
  const data = getData();

  if (!data[year]) data[year] = {};
  if (!data[year][month]) data[year][month] = [];

  data[year][month].push(transaction);
  saveData(data);

  document.getElementById("descricao").value = "";
  document.getElementById("valor").value = "";

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
  updateResumoChart(totals);
  updateDetalhadoChart(totals);
}

function updateCards(totals) {
  document.getElementById("totalReceita").textContent =
    `R$ ${totals.income.toFixed(2)}`;

  document.getElementById("totalDespesa").textContent =
    `R$ ${totals.expense.toFixed(2)}`;

  document.getElementById("saldoValor").textContent =
    `R$ ${totals.balance.toFixed(2)}`;

  document.getElementById("percentual").textContent =
    `${totals.percent}%`;
}

function updateResumoChart(totals) {
  const ctx = document.getElementById("graficoResumo");
  if (!ctx) return;

  if (chartResumo) chartResumo.destroy();

  chartResumo = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Receitas", "Despesas"],
      datasets: [{
        data: [totals.income, totals.expense],
        backgroundColor: ["#16a34a", "#dc2626"]
      }]
    }
  });
}

function updateDetalhadoChart(totals) {
  const ctx = document.getElementById("graficoDetalhado");
  const lista = document.getElementById("listaCategorias");

  if (!ctx || !lista) return;

  if (chartDetalhado) chartDetalhado.destroy();

  const categories = totals.categories;
  const income = totals.income;

  const labels = [];
  const data = [];

  lista.innerHTML = "";

  for (let category in categories) {
    const value = categories[category];
    const percent =
      income > 0 ? ((value / income) * 100).toFixed(1) : 0;

    labels.push(category);
    data.push(value);

    lista.innerHTML += `
      <div class="category-item">
        <span>${category}</span>
        <span>
          R$ ${value.toFixed(2)}
          <span class="percent">(${percent}%)</span>
        </span>
      </div>
    `;
  }

  chartDetalhado = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: labels,
      datasets: [{
        data: data,
        backgroundColor: [
          "#2563eb",
          "#1d4ed8",
          "#3b82f6",
          "#60a5fa",
          "#93c5fd"
        ]
      }]
    },
    options: {
      plugins: { legend: { display: false } }
    }
  });
}

function showSection(id) {

  document.querySelectorAll(".section").forEach(sec =>
    sec.classList.remove("active")
  );

  document.querySelectorAll(".menu-item").forEach(item =>
    item.classList.remove("active")
  );

  document.getElementById(id).classList.add("active");
  event.target.classList.add("active");
}
