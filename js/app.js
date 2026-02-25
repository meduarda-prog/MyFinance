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
let grafico;

function atualizarGrafico(transacoes) {

  const despesas = transacoes.filter(t => t.tipo === "despesa");

  const categorias = {};
  let totalDespesas = 0;

  despesas.forEach(d => {
    totalDespesas += Number(d.valor);

    if (!categorias[d.categoria]) {
      categorias[d.categoria] = 0;
    }

    categorias[d.categoria] += Number(d.valor);
  });

  const labels = [];
  const valores = [];

  for (let cat in categorias) {
    labels.push(cat);
    valores.push(categorias[cat]);
  }

  const ctx = document.getElementById("graficoDespesas");

  if (grafico) {
    grafico.destroy();
  }

  grafico = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: labels,
      datasets: [{
        data: valores,
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
      plugins: {
        tooltip: {
          callbacks: {
            label: function(context) {
              const valor = context.raw;
              const porcentagem = ((valor / totalDespesas) * 100).toFixed(1);
              return `${context.label}: R$ ${valor} (${porcentagem}%)`;
            }
          }
        }
      }
    }
  });
}
