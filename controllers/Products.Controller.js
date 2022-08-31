const options = require('../database/options/mysql');
const knex = require('knex')(options);
const log4js = require('log4js')



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
  try {
    const logger = log4js.getLogger('info');
    logger.info(`${req.method}: ${req.url}`);
    req.session.touch();
    const products = await knex.from(options.connection.table).select('*');

  return res.render('productos', { products: products })
} catch (error) {
  const logger = log4js.getLogger('error');
  logger.error(`${req.method}: ${req.url} + ${error}`);
}
}

const getProductById = async (req, res) => {
  try {
    const logger = log4js.getLogger('info');
    logger.info(`${req.method}: ${req.url}`);
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
catch (error) {
  const logger = log4js.getLogger('error');
  logger.error(`${req.method}: ${req.url} + ${error}`);
}
}

const newProduct = async (req, res) => {
  try {
    const logger = log4js.getLogger('info');
    logger.info(`${req.method}: ${req.url}`);
    req.session.touch();
    await knex(options.connection.table).insert(req.body)
    return res.redirect('/products')
  } catch (error) {
    const logger = log4js.getLogger('error');
    logger.error(`${req.method}: ${req.url} + ${error}`);
  }
}


const updateProduct = async (req, res) => {
  try{
    const logger = log4js.getLogger('info');
    logger.info(`${req, method}: ${req, url}`);
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
  } catch (error) {
    const logger = log4js.getLogger('error');
    logger.error(`${req.method}: ${req.url} + ${error}`);
  }
}

const deleteProduct = async (req, res) => {
  try {
    const logger = log4js.getLogger('info');
    logger.info(`${req.method}: ${req.url}`);
    req.session.touch();
    const { id } = req.params;

    const deletedProd = await knex.from(options.connection.table)
      .where('id', '=', id)
      .del()

    if (!deletedProd) {
      return res.status(400).json({
        error: `El producto con ID: ${id} no existe.`
      })
    }

    return res.json({
      mesage: `Producto con ID: ${id} eliminado.`
    })
  } catch (error) {
    const logger = log4js.getLogger('error');
    logger.error(`${req.method}: ${req.url} + ${error}`);
  }
}


module.exports = {
  createProductsTable,
  getAllProducts,
  getProductById,
  newProduct,
  updateProduct,
  deleteProduct
};