const router = require('express').Router();
const log4js = require('log4js')


const {
  createProductsTable,
  getAllProducts,
  getProductById,
  newProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/Products.Controller')

const validateUser = require('../middlewares/validate.user');


const toCamel = require('../helpers/camelCase')


router.get('/', validateUser, (req, res) => {
  const logger = log4js.getLogger('info');
  logger.info(`${req.method}: ${req.url}`);
  let { username } = req.session.passport.user;
  username = toCamel(username);
  res.render('index', { mesage: '', username });
});


router.get('/products', validateUser, getAllProducts);

router.get('/products/:id', validateUser, getProductById);

router.post('/products', validateUser, newProduct);

router.put('/products/:id', validateUser, updateProduct);

router.delete('/products/:id', validateUser, deleteProduct);


module.exports = router;