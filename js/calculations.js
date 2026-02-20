function calculateMonthlyTotals(transactions) {
  let income = 0;
  let expense = 0;

  transactions.forEach(t => {
    if (t.type === "renda") {
      income += t.value;
    } else {
      expense += t.value;
    }
  });

  const balance = income - expense;
  const percentage = income > 0 ? ((expense / income) * 100).toFixed(2) : 0;

  return { income, expense, balance, percentage };
}
