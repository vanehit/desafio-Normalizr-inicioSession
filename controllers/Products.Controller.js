const options = require('../database/options/mysql');
const knex = require('knex')(options);



const createProductsTable = () => {
  knex.schema.createTable('productos', table => {
    table.string('title'),
      table.integer('price'),
      table.string('thumbnail'),
      table.increments('id')
  })
    .then(() => console.log('Table created'))
    .catch(error => console.log(error))
}

const getAllProducts = async (req, res) => {
  req.session.touch();
  const products = await knex.from(options.connection.table).select('*');

  return res.render('productos', { products: products })
}

const getProductById = async (req, res) => {
  req.session.touch();
  const { id } = req.params;

  const product = await knex.from(options.connection.table).select('*').where('id', '=', id);

  if (product.length < 1) {
    return res.status(400).json({
      error: `Producto con ID: ${id} no encotrado.`
    })
  }

  return res.json({ product })
}

const newProduct = async (req, res) => {
  req.session.touch();
  await knex(options.connection.table).insert(req.body)
  return res.redirect('/products')
}

const updateProduct = async (req, res) => {
  req.session.touch();
  const { id } = req.params;

  const editedProd = await knex.from(options.connection.table)
    .where('id', '=', id)
    .update(req.body) /*Le pasamos un objeto con las props que vamos a actualizar*/

  if (!editedProd) {
    return res.status(400).json({
      error: `El producto con ID: ${id} no existe.`
    })
  }

  return res.json({
    msg: "Producto actualizado."
  });
}

const deleteProduct = async (req, res) => {
  req.session.touch();
  const { id } = req.params;

  const deletedProd = await knex.from(options.connection.table)
    .where('id', '=', id)  /* SI NO PONEMOS EL CONDICIONAL, BORRA TODA LA DATA DE LA TABLA */
    .del()

  if (!deletedProd) {
    return res.status(400).json({
      error: `El producto con ID: ${id} no existe.`
    })
  }

  return res.json({
    mesage: `Producto con ID: ${id} eliminado.`
  })
}


module.exports = {
  createProductsTable,
  getAllProducts,
  getProductById,
  newProduct,
  updateProduct,
  deleteProduct
};