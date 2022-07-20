const router = require('express').Router();
const dbSQL = require('../controllers/ProductsContainer');

router.get('/', (req, res) => {
  res.render('index', { messages: '' });
});


router.get('/products', (req, res) => {
  dbSQL.getAll()
    .then(products => res.render('productos', { products: products }))
});

router.get('/products/:id', (req, res) => {
  const id = Number(req.params.id);
  dbSQL.getById(id)
    .then(result => {
      (result.length < 1)
        ? res.json({ error: 'Producto no encontrado.' })
        : res.json(result)
    })
});


router.post('/products', (req, res) => {
  const newProd = req.body;
  dbSQL.newProduct(newProd)
    .then(() => res.render('index', { messages: 'Producto agregado' }));
});


router.put('/products/:id', (req, res) => {
  const id = req.params.id;
  const product = req.body;

  dbSQL.updateProduct(product, id)
    .then(() => res.json({ messages: 'Producto editado' }))
});


router.delete('/products/:id', (req, res) => {
  const id = req.params.id;

  dbSQL.deleteProduct(id)
    .then(() => res.json({ messages: 'Producto eliminado' }))
});


module.exports = router;