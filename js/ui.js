function updateCards(totals) {
  document.getElementById("totalReceita").textContent =
    `R$ ${totals.income.toFixed(2)}`;

  document.getElementById("totalDespesa").textContent =
    `R$ ${totals.expense.toFixed(2)}`;

  document.getElementById("saldo").textContent =
    `R$ ${totals.balance.toFixed(2)}`;

  document.getElementById("percentual").textContent =
    `${totals.percentage}%`;
}
