function updateChart(totals) {
  const ctx = document.getElementById("grafico");
  const lista = document.getElementById("listaCategorias");

  if (!ctx || !lista) return;

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

  if (chart) chart.destroy();

  chart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: labels,
      datasets: [{
        data: data
      }]
    },
    options: {
      plugins: {
        legend: {
          display: false
        }
      }
    }
  });
}
