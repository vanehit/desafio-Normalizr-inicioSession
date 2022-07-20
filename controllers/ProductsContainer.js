const options = require ('../database/options/mysql');
const knex = require('knex')( options );

class Contenedor{
  constructor( options ){
    this.options = options;
  }

  createTable(){
    knex.schema.createTable( 'productos', table => {
      table.string('title'),
      table.integer('price'),
      table.string('thumbnail'),
      table.increments('id')
    })
      .then( ()=> console.log('Table created') )
      .catch( error => console.log( error ) )
     
  }

  getAll(){
    return knex.from( this.options.connection.table ).select( '*' )
      .then( rows => rows )
      .catch( error => console.log( error ) )
      
  }

  getById( id ){
    return knex.from( this.options.connection.table ).select( '*' ).where( 'id', '=', id )
      .then( rows => rows )
      .catch( error => console.log( error ) )
      
  }

  newProduct( newProd ){
    return knex( this.options.connection.table ).insert( newProd )
      .then( () => 'Producto agregado' )
      .catch( error => console.log( error ) )
    
  }

  updateProduct( editProd, id ){
    return knex.from( this.options.connection.table )
      .where( 'id', '=', id )
      .update( editProd )

      .then( () => console.log('Data updated') )
      .catch( error => console.log( error ) )
      
  }

  deleteProduct( id ){
    return knex.from( this.options.connection.table )
      .where( 'id', '=', id )  
      .del()

      .then( () => console.log('Data removed') )
      .catch( error => console.log( error ) )
      
  }

}

const dbSQL = new Contenedor( options );

module.exports = dbSQL;