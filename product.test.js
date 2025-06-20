const {
  resetProducts,
  addProduct,
  removeProduct,
  getProducts,
  getProduct,
  updateProduct
} = require('./product');

beforeEach(() => {
  resetProducts();
});

describe('addProduct', () => {
  test('debería agregar un producto', () => {
    const product = addProduct("Camisa", 20);
    expect(product).toEqual({ id: 0, name: "Camisa", price: 20 });
    expect(getProducts()).toHaveLength(1);
  });

  test('debería incrementar el id en 1', () => {
    addProduct("Camisa", 20);
    const second = addProduct("Pantalón", 30);
    expect(second.id).toBe(1);
  });

  test('debería lanzar error si falta el nombre', () => {
    expect(() => addProduct(undefined, 10)).toThrow("Nombre y precio requeridos");
  });

  test('debería lanzar error si falta el precio', () => {
    expect(() => addProduct("Zapato")).toThrow("Nombre y precio requeridos");
  });

  test('debería lanzar error si el producto ya existe', () => {
    addProduct("Camisa", 20);
    expect(() => addProduct("Camisa", 30)).toThrow("Producto ya existe");
  });
});

describe('removeProduct', () => {
  test('debería eliminar un producto', () => {
    const p = addProduct("Camisa", 20);
    removeProduct(p.id);
    expect(getProducts()).toHaveLength(0);
  });

  test('debería lanzar error si el producto no existe', () => {
    expect(() => removeProduct(99)).toThrow("Producto no encontrado");
  });
});

describe('getProduct', () => {
  test('debería devolver un producto por su id', () => {
    const p = addProduct("Camisa", 20);
    expect(getProduct(p.id)).toEqual(p);
  });

  test('debería lanzar error si el producto no existe', () => {
    expect(() => getProduct(999)).toThrow("Producto no encontrado");
  });
});

describe('updateProduct', () => {
  test('debería actualizar un producto', () => {
    const p = addProduct("Camisa", 20);
    updateProduct(p.id, "Camisa nueva", 25);
    const updated = getProduct(p.id);
    expect(updated.name).toBe("Camisa nueva");
    expect(updated.price).toBe(25);
  });

  test('debería lanzar error si el producto no existe', () => {
    expect(() => updateProduct(99, "Nombre", 10)).toThrow("Producto no encontrado");
  });

  test('debería actualizar solo el nombre', () => {
    const p = addProduct("Camisa", 20);
    updateProduct(p.id, "Nueva Camisa");
    const updated = getProduct(p.id);
    expect(updated.name).toBe("Nueva Camisa");
    expect(updated.price).toBe(20);
  });

  test('debería actualizar solo el precio', () => {
    const p = addProduct("Camisa", 20);
    updateProduct(p.id, undefined, 50);
    const updated = getProduct(p.id);
    expect(updated.name).toBe("Camisa");
    expect(updated.price).toBe(50);
  });
});
