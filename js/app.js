function calculateMonthlyTotals(transactions) {
  let income = 0;
  let expense = 0;
  let categories = {};

  transactions.forEach(t => {
    const amount = Number(t.amount);

    if (t.type === "renda") {
      income += amount;
    } else {
      expense += amount;

      if (!categories[t.category]) {
        categories[t.category] = 0;
      }

      categories[t.category] += amount;
    }
  });

  const balance = income - expense;
  const percent = income > 0 ? ((expense / income) * 100).toFixed(1) : 0;

  return {
    income,
    expense,
    balance,
    percent,
    categories
  };
}
