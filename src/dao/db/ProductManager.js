const ProductModel = require("./models/products.model");

class ProductManager {
  #products = [];
  id = 1;
  //constructor de la clase!
  constructor(ruta) {
    this.path = ruta;
  }

  //funciones

  // async loaded() {
//     try {
//       const response = await fs.promises.readFile(this.path, "utf-8");
//       const lineas = response
//         .split("\n")
//         .filter((objeto) => objeto.trim() !== "");
//       lineas.forEach((product) => {
//         const producto = JSON.parse(product);
//         if (
//           !this.#products.some(
//             (existingProduct) => existingProduct.id === producto.id
//           )
//         ) {
//           this.#products.push(producto);
//         }
//       });
//     } catch (err) {
//       console.log(err);
//     }
//   }

  async getProducts() {
  
  }

  async addProduct({name, price, category, stock}) {
    try {
      console.log({name, price, category, stock})
      await ProductModel.create({name, price, category, stock})
      return ("Producto Guardado")
    } catch (error) {
      console.log(error)
      return (error)
    }
  }

  async getProductById(id) {
   
  }

  async updateProduct(id, product) {
 
  }
  async deleteProductById(id) {
    
  }
}

//exportacion de la clase!
//const productManager = new ProductManager("../products.txt");

module.exports =  ProductManager ;
