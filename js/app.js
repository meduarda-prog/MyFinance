let transacoes = JSON.parse(localStorage.getItem("transacoes")) || [];
let grafico;

function showTab(tabId) {
  document.querySelectorAll(".tab").forEach(tab => {
    tab.classList.remove("active");
  });
  document.getElementById(tabId).classList.add("active");
}

function salvar() {
  localStorage.setItem("transacoes", JSON.stringify(transacoes));
}

function adicionarTransacao() {
  const descricao = document.getElementById("descricao").value;
  const valor = parseFloat(document.getElementById("valor").value);
  const tipo = document.getElementById("tipo").value;
  const categoria = document.getElementById("categoria").value || "Outros";

  if (!descricao || !valor) return;

  transacoes.push({ descricao, valor, tipo, categoria });
  salvar();
  atualizarDashboard();
}

function atualizarDashboard() {
  let receitas = 0;
  let despesas = 0;
  let categorias = {};

  transacoes.forEach(t => {
    if (t.tipo === "receita") {
      receitas += t.valor;
    } else {
      despesas += t.valor;
      categorias[t.categoria] = (categorias[t.categoria] || 0) + t.valor;
    }
  });

  const saldo = receitas - despesas;

  document.getElementById("saldo").innerText = "R$ " + saldo.toFixed(2);
  document.getElementById("receitas").innerText = "R$ " + receitas.toFixed(2);
  document.getElementById("despesasTotal").innerText = "R$ " + despesas.toFixed(2);

  atualizarGrafico(categorias, receitas);
}

function atualizarGrafico(categorias, receitaTotal) {
  const ctx = document.getElementById("graficoCategorias").getContext("2d");
  const labels = Object.keys(categorias);
  const valores = Object.values(categorias);

  if (grafico) grafico.destroy();

  grafico = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: labels,
      datasets: [{
        data: valores,
        backgroundColor: [
          "#0047ab",
          "#28a745",
          "#e83e8c",
          "#ffc107",
          "#17a2b8",
          "#6f42c1"
        ]
      }]
    }
  });

  const lista = document.getElementById("listaCategorias");
  lista.innerHTML = "";

  labels.forEach((cat, i) => {
    const porcentagem = receitaTotal > 0
      ? ((valores[i] / receitaTotal) * 100).toFixed(1)
      : 0;

    lista.innerHTML +=
      "<div><strong>" + cat + "</strong> - R$ " +
      valores[i].toFixed(2) +
      " (" + porcentagem + "%)</div>";
  });
}

atualizarDashboard();
