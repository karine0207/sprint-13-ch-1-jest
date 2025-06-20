let products = [];
let id = 0;

function resetProducts() {
  products = [];
  id = 0;
}

function addProduct(name, price) {
  if (!name || price === undefined) throw new Error("Nombre y precio requeridos");

  if (products.some(p => p.name === name)) {
    throw new Error("Producto ya existe");
  }

  const product = { id, name, price };
  products.push(product);
  id++;
  return product;
}

function removeProduct(productId) {
  const index = products.findIndex(p => p.id === productId);
  if (index === -1) throw new Error("Producto no encontrado");
  products.splice(index, 1);
}

function getProducts() {
  return products;
}

function getProduct(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) throw new Error("Producto no encontrado");
  return product;
}

function updateProduct(productId, name, price) {
  const product = products.find(p => p.id === productId);
  if (!product) throw new Error("Producto no encontrado");

  if (name !== undefined) product.name = name;
  if (price !== undefined) product.price = price;
}

module.exports = {
  resetProducts,
  addProduct,
  removeProduct,
  getProducts,
  getProduct,
  updateProduct
};
