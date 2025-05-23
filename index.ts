type Pizza = {
  id: number
  name: string,
  price: number
}

type Order = {
  id: number
  pizza: Pizza
  status: "ordered" | "completed"
}

let nextPizzaId = 1;
let cashInRegister: number = 100
let nextOrderId = 1;
const orderQueue: Order[] = []

const menu = [
  { name: "Margherita", price: 8 },
  { name: "Pepperoni", price: 10 },
  { name: "Hawaiian", price: 10 },
  { name: "Veggie", price: 9 },
]



function addNewPizza(pizzaObj: Omit<Pizza, "id">): Pizza {
  const newPizza: Pizza = {id: nextPizzaId++, ...pizzaObj}
  menu.push(newPizza)
  return newPizza
}

addNewPizza({ name: "Chicken Bacon Ranch", price: 12 })
addNewPizza({ name: "BBQ Chicken", price: 12 })
addNewPizza({ name: "Spicy Sausage", price: 11 })

function placeOrder(pizzaName: string): Order | undefined {
  const selectedPizza = menu.find(pizzaObj => pizzaObj.name === pizzaName)
  if (!selectedPizza) {
    console.error(`${pizzaName} is not in the menu.`)
    return
  }
  cashInRegister += selectedPizza.price
  const newOrder: Order = { id: nextOrderId++, pizza: selectedPizza, status: "ordered" }
  orderQueue.push(newOrder)
  return newOrder
}

function completeOrder(orderId: number): Order | undefined {
  const order = orderQueue.find(order => order.id === orderId)
  if (!order) {
    console.error(`${orderId} was not found in the orderQueue`)
    return
  }
  order.status = "completed"
  return order
}

export function getPizzaDetail(identifier: string | number): Pizza | undefined {
  if (typeof identifier === "string") {
    return menu.find(pizza => pizza.name.toLowerCase() === identifier.toLowerCase())
  } else if (typeof identifier === "number"){
    return menu.find(pizza => pizza.id === identifier)
  } else {
    throw new TypeError("Parameter 'identifier' must be either a string or a number")
  }
}


placeOrder("Chicken Bacon Ranch")
completeOrder(1)

console.log("Menu:", menu)
console.log("Cash in register:", cashInRegister)
console.log("Order queue:", orderQueue)