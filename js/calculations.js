function calculateMonthlyTotals(transactions) {
  let income = 0;
  let expense = 0;
  let categories = {};

  transactions.forEach(t => {
    if (t.type === "renda") {
      income += t.amount;
    } else {
      expense += t.amount;

      if (!categories[t.category]) {
        categories[t.category] = 0;
      }

      categories[t.category] += t.amount;
    }
  });

  const balance = income - expense;

  return {
    income,
    expense,
    balance,
    categories
  };
}
