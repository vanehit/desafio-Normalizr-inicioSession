const router = require('express').Router();
const dbSQL = require('../controllers/ProductsContainer');

//middlewares
const auth = (req, res, next) => {
  if (req.session.username) {
    return next()
  }

  return res.status(401).redirect('/login')
}

//loggins
router.get('/login', (req, res) => {

  let { username } = req.query;

  if (!username) return res.status(401).render('login');

  req.session.username = username;
  req.session.admin = true;

  res.redirect('/');
});

router.get('/logout', (req, res) => {
  const username = req.session.username;
  req.session.destroy(err => {
    if (!err) res.render('logout', { username: username })
    else res.send({ status: 'Logout ERROR ', body: err })
  })

})

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