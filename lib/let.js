const xto6 = require('xto6');
const Transformer = xto6.Transformer;

//const letpg = `
//var i = 1;
//var j = 2;
//// comment1
//if (true) { j = 3; }
//`;
//
////transformer.read(letpg);
//transformer.readFile('./let_file.js', { sync: true });
//transformer.applyTransformations();
//console.log(transformer.out());

module.exports = (js) => {
  const options = {
    transformers: {
      classes: false,
      stringTemplates: false,
      arrowFunctions: false,
      let: true,
      defaultArguments: false,
      objectMethods: false
    },
    formatter: false
  };

  const transformer = new Transformer(options);

  transformer.read(js);
  transformer.applyTransformations();
  return transformer.out();
};
