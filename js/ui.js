const transactionList = document.getElementById("transaction-list");
const balanceElement = document.getElementById("balance");

function renderTransactions(transactions) {
  transactionList.innerHTML = "";

  transactions.forEach((transaction, index) => {
    const li = document.createElement("li");

    li.innerHTML = `
      ${transaction.description} - R$ ${transaction.amount.toFixed(2)}
      <button onclick="removeTransaction(${index})">X</button>
    `;

    transactionList.appendChild(li);
  });
}

function updateBalance(balance) {
  balanceElement.textContent = balance.toFixed(2);
}
