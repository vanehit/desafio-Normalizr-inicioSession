const toCamel = ( elem ) => {
    const array = elem.split("");
    array.splice( 0, 1, array[0].toUpperCase() );
  
    return array.join("");
  };
  
  module.exports = toCamel;