let arrayOfCustomers = [
  {
    email: "tshepo@umuzi.org",
    status: "OPEN",
    items: [
      {
        name: "hamster",
        quantity: 2,
        price: 20,
      },
      {
        name: "saw dust",
        quantity: 1,
        price: 20,
      },
      {
        name: "hamster-cage",
        quantity: 1,
        price: 150,
      },
      {
        name: "book: how to care for your hamster",
        quantity: 1,
        price: 150,
      },
    ],
  },
  {
    email: "tshepo@umuzi.org",
    status: "PAID",
    items: [
      {
        name: "balloons",
        quantity: 1,
        price: 25,
      },
      {
        name: "big friggin cake",
        quantity: 1,
        price: 150,
      },
      {
        name: "candles",
        quantity: 1,
        price: 30,
      },
    ],
  },
  {
    email: "tshepo@umuzi.org",
    status: "DELIVERED",
    items: [
      {
        name: "tooth brush",
        quantity: 1,
        price: 50,
      },
      {
        name: "soap",
        quantity: 3,
        price: 15,
      },
    ],
  },
  {
    email: "tshepo@umuzi.org",
    status: "DELIVERED",
    items: [
      {
        name: "tent",
        quantity: 1,
        price: 1999,
      },
    ],
  },

  {
    email: "sally@umuzi.org",
    status: "DELIVERED",
    items: [
      {
        name: "tent",
        quantity: 1,
        price: 1999,
      },
      {
        name: "headlamp",
        quantity: 1,
        price: 250,
      },
      {
        name: "hiking boots",
        quantity: 1,
        price: 1000,
      },
    ],
  },

  {
    email: "sally@umuzi.org",
    status: "PAID",
    items: [
      {
        name: "hamster",
        quantity: 1,
        price: 20,
      },
      {
        name: "saw dust",
        quantity: 1,
        price: 20,
      },
      {
        name: "hamster-cage",
        quantity: 1,
        price: 150,
      },
    ],
  },

  {
    email: "sally@umuzi.org",
    status: "DELIVERED",
    items: [
      {
        name: "book: how to care for your hamster",
        quantity: 1,
        price: 150,
      },
    ],
  },

  {
    email: "mpho@umuzi.org",
    status: "OPEN",
    items: [
      {
        name: "hammer",
        quantity: 1,
        price: 200,
      },
      {
        name: "bag of nails",
        quantity: 1,
        price: 50,
      },
      {
        name: "128 GB SSD Hard drive",
        quantity: 2,
        price: 600,
      },
    ],
  },

  {
    email: "ryan@umuzi.org",
    status: "PAID",
    items: [
      {
        name: "128 GB SSD Hard drive",
        quantity: 2,
        price: 600,
      },
      {
        name: "balloons",
        quantity: 2,
        price: 600,
      },
      {
        name: "book: how to suceed at being a hard arse",
        quantity: 1,
        price: 160,
      },
    ],
  },
  {
    email: "mo@umuzi.org",
    status: "DELIVERED",
    items: [
      {
        name: "balloons",
        quantity: 1,
        price: 25,
      },
      {
        name: "big friggin cake",
        quantity: 2,
        price: 150,
      },
    ],
  },
  {
    email: "mo@umuzi.org",
    status: "DELIVERED",
    items: [],
  },
  {
    email: "mo@umuzi.org",
    status: "DELIVERED",
    items: [
      {
        name: "balloons",
        quantity: 1,
        price: 25,
      },
      {
        name: "big friggin cake",
        quantity: 1,
        price: 150,
      },
    ],
  },
];

function getCustomerBasket(email) {
  return arrayOfCustomers.filter((element) => element.email === email);
}
getCustomerBasket("tshepo@umuzi.org");

function getAllCustomers() {
  const AllCustomers = arrayOfCustomers.map((element) => element.email);
  let removeDuplicates = [...new Set(AllCustomers)];
  return removeDuplicates;
}
getAllCustomers();

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

function totalSpent(email) {
  let customerItems = arrayOfCustomers.filter((element) => element.email === email);
  const items = customerItems
    .filter((cart) => cart.status === "PAID" || cart.status === "DELIVERED")
    .map((cart) => cart.items);
  const merged = [].concat.apply([], items).map((item) => item.price);
  let total =
    merged.length > 0
      ? merged.reduce((total, currentValue) => total + currentValue)
      : 0;
  return total;
}
totalSpent("mo@umuzi.org");

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
console.log(topCustomer());
