let arrayOfCustomers = require("./data.js").arrayOfCustomers;
// list of all shopping baskets that belong to customer email address
function getCustomerBasket(email) {
  return arrayOfCustomers.filter((element) => element.email === email);
}
getCustomerBasket("tshepo@umuzi.org");

//list of all customers email address
function getAllCustomers() {
  const allCustomers = arrayOfCustomers.map((element) => element.email);
  let removeDuplicates = [...new Set(allCustomers)];
  return removeDuplicates;
}
getAllCustomers();

// list of all items that been paid for but not delivered yet
function requiredStock() {
  let formattedItems = [];
  let consolidatedItems = [];
  let paidItems = getPaidItems();

  consolidatedItems = getConsolidatedItems(paidItems);
  formattedItems = getFormattedItems(consolidatedItems);
  return formattedItems;
}

function getPaidItems() {
  return arrayOfCustomers
    .filter((cart) => cart.status.toLowerCase() === "paid")
    .map((cart) => cart.items);
}

function getFormattedItems(array) {
  return array.map(function (item) {
    return {
      name: item.name,
      quantity: item.quantity,
    };
  });
}
function getConsolidatedItems(allCustomerItems) {
  let consolidatedItems = [];

  for (let customerNitems of allCustomerItems) {
    for (let item of customerNitems) {
      let pos = consolidatedItems.findIndex(
        (cItem) => cItem.name === item.name
      );
      if (pos > -1) consolidatedItems[pos].quantity += item.quantity;
      else consolidatedItems.push(item);
    }
  }
  return consolidatedItems;
}
requiredStock();

// total spent by each customer
function totalSpent(email) {
  const DELIVERED = "DELIVERED";
  const PAID = "PAID";

  let customerItems = arrayOfCustomers.filter(
    (element) => element.email === email
  );
  const items = customerItems
    .filter((cart) => cart.status === PAID || cart.status === DELIVERED)
    .map((cart) => cart.items);
  const merged = [].concat.apply([], items).map((item) => item.price);
  let total =
    merged.length > 0
      ? merged.reduce((total, currentValue) => total + currentValue)
      : 0;
  return total;
}
totalSpent("mo@umuzi.org");
// list of customers according to how much they spent in desceding order
function topCustomer() {
  let customers = [];

  let customerEmails = arrayOfCustomers
    .map((customer) => customer.email)
    .filter((value, index, self) => self.indexOf(value) === index);
  for (let i = 0; i < customerEmails.length; i++) {
    customers.push({
      email: customerEmails[i],
      total: totalSpent(customerEmails[i]),
    });
  }
  return customers.sort((a, b) => b.total - a.total);
}
topCustomer();
