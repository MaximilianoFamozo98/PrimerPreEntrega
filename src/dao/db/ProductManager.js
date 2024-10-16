const ProductModel = require("./models/products.model");

class ProductManager {
  constructor(ruta) {
    this.path = ruta;
  }

  // Obtener todos los productos
  async getProducts() {
    try {
      const products = await ProductModel.find(); // Encuentra todos los productos
      return products;  // Devuelve los productos encontrados
    } catch (error) {
      console.log("Error obteniendo productos:", error);
      return error;
    }
  }

  // Agregar un producto
  async addProduct({ name, price, category, stock }) {
    try {
      console.log({ name, price, category, stock });
      await ProductModel.create({ name, price, category, stock });
      return "Producto Guardado";
    } catch (error) {
      console.log("Error guardando producto:", error);
      return error;
    }
  }

  // Obtener producto por ID
  async getProductById(id) {
    try {
      const product = await ProductModel.findById(id);  // Encuentra el producto por ID
      if (!product) {
        return "Producto no encontrado";
      }
      return product;  // Devuelve el producto encontrado
    } catch (error) {
      console.log("Error obteniendo producto:", error);
      return error;
    }
  }

  // Actualizar producto por ID
  async updateProduct(id, product) {
    try {
      const updatedProduct = await ProductModel.findByIdAndUpdate(id, product, {
        new: true,  // Devuelve el documento actualizado
      });
      if (!updatedProduct) {
        return "Producto no encontrado para actualizar";
      }
      return updatedProduct;
    } catch (error) {
      console.log("Error actualizando producto:", error);
      return error;
    }
  }

  // Eliminar producto por ID
  async deleteProductById(id) {
    try {
      const deletedProduct = await ProductModel.findByIdAndDelete(id); // Elimina el producto por ID
      if (!deletedProduct) {
        return "Producto no encontrado para eliminar";
      }
      return "Producto eliminado";
    } catch (error) {
      console.log("Error eliminando producto:", error);
      return error;
    }
  }
}

module.exports = ProductManager;
