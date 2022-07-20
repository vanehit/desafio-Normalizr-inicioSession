const router = require('express').Router();
const { faker } = require( '@faker-js/faker' );

router.get( '/', ( req, res ) => {
  const fakeProds = []

  for( let i = 0; i < 5; i++ ){
    fakeProds.push({
      name: faker.commerce.product(),
      price: faker.commerce.price(),
      img: faker.image.cats()
    })
  }

  res.json( fakeProds )
} )


module.exports = router;