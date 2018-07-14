const mongoose = require('mongoose')

const REQUIRED_VALIDATION_MESSAGE = '{PATH} is required'

let pizzaSchema = new mongoose.Schema({
  name: {type: mongoose.Schema.Types.String, required: REQUIRED_VALIDATION_MESSAGE, unique: [true, 'Pizza already exists.']},
  ingredients: [{type: mongoose.Schema.Types.String}],
  weight: {type: mongoose.Schema.Types.Number, required: REQUIRED_VALIDATION_MESSAGE},
  description: {type: mongoose.Schema.Types.String},
  price: {type: mongoose.Schema.Types.Number, required: REQUIRED_VALIDATION_MESSAGE},
  image: {type: mongoose.Schema.Types.String, required: REQUIRED_VALIDATION_MESSAGE},
  likes: [{type: mongoose.Schema.Types.String}],
  reviews: []
})

let Pizza = mongoose.model('Pizza', pizzaSchema)

module.exports = Pizza
module.exports.seedPizzas = () => {
  Pizza.find({}).then(pizzas => {
    if (pizzas.length > 0) return

    const pizzasSeed = [
      {
        name: 'Pepperoni',
        ingredients: ['Olive oil', 'oregano', 'pepperoni salami', 'yellow cheese', 'tomato sauce'],
        description: 'Pepperoni is an American variety of salami, made from cured pork and beef mixed together and seasoned with paprika or other chili pepper.',
        price: 9.90,
        weight: 450,
        image: 'https://vignette.wikia.nocookie.net/oddsquad/images/f/f4/Pizza.png/revision/latest?cb=20170203223737',
        likes: [],
        reviews: []
      },
      {
        name: 'Margarita',
        ingredients: ['Olive oil', 'yellow cheese', 'domato sause'],
        description: 'Pizza Margherita is a typical Neapolitan pizza, made with San Marzano tomatoes, mozzarella fior di latte, fresh basil, salt and extra-virgin olive oil.',
        price: 5.90,
        weight: 350,
        image: 'https://d2gg9evh47fn9z.cloudfront.net/800px_COLOURBOX3469401.jpg',
        likes: [],
        reviews: []
      },
      {
        name: 'Diablo',
        ingredients: ['Olive oil', 'ham', 'mushrooms', 'hot pepper', 'yellow cheese', 'tomato sauce'],
        description: 'Pizza diavola means the devils pizza and is quite a spicy little devil and one of my favourite pizzas. If you like spicy hot and chilli flavours you will enjoy this pizza.',
        price: 8.90,
        weight: 500,
        image: 'https://images.pizza33.ua/products/product/yQfkJqZweoLn9omo68oz5BnaGzaIE0UJ.jpg',
        likes: [],
        reviews: []
      },
      {
        name: 'Calzone',
        ingredients: ['ham', 'mushroom', 'traditional bulgarian flat sausage called lukanka', 'smoked cheese', 'yellow cheese', 'tomato sauce'],
        description: 'A calzone is an Italian oven-baked folded pizza that originated in Naples. A typical calzone is made from salted bread dough, stuffed with salami, ham, vegetables, mozzarella, Parmesan and an egg.',
        price: 11.90,
        weight: 500,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGOxB3Fe3lAvkYQBdWrzp8885FC2uAH5nlZo-ZO21TkmxO5wa_',
        likes: [],
        reviews: []
      },
      {
        name: 'Polo',
        ingredients: ['Chicken roll', 'corn', 'red peppers', 'smoked cheese', 'yellow cheese', 'tomato sauce'],
        description: 'Pollo might be your choice when you are in the mood for something healthy. Tender grilled chicken, creamy feta, roasted red peppers and corn are generously piled on top of our famous tomato sauce.',
        price: 10.90,
        weight: 550,
        image: 'http://www.ilforno.bg/45-large_default/polo.jpg',
        likes: [],
        reviews: []
      },
      {
        name: 'Four Cheeses',
        ingredients: ['white bulgarian cheese', 'blue cheese', 'smoked cheese', 'yellow cheese and domato sause'],
        description: 'Pizza cheese encompasses several varieties and types of cheeses and dairy products. These include processed and modified cheese such as mozzarella-like processed cheeses and mozzarella variants.',
        price: 9.80,
        weight: 500,
        image: 'https://thumbs.dreamstime.com/b/four-cheese-pizza-mozzarella-cheese-dorblu-cheddar-cheese-parmesan-cheese-isolated-white-background-91847479.jpg',
        likes: [],
        reviews: []
      },
      {
        name: 'Ratatouille',
        ingredients: ['Red onion', 'red peppers', 'olives', 'cheese', 'domato', 'yellow cheese', 'domato sause'],
        description: 'The ratatouille pizza is packed full of summer vegetables. We piled them high on a whole wheat pizza crust and sprinkled it all with cheese.',
        price: 9.90,
        weight: 420,
        image: 'https://previews.123rf.com/images/eivaisla/eivaisla1611/eivaisla161100003/66411516-delicious-vegetarian-pizza-isolated-on-white-background-high-angle-shot-.jpg',
        likes: [],
        reviews: []
      },
      {
        name: 'Tuna',
        ingredients: ['Nero integralle dough', 'philadelphia', 'tuna fish', 'white pepper', 'yellow cheese', 'cherry tomatoes', 'basil chips', 'olives'],
        description: 'If you like tuna you should try this tuna and red onion pizza. Thin crust with tuna, red onion flavor, black olives and fresh basil leaves makes it one delightful meal.',
        price: 16.70,
        weight: 420,
        image: 'https://www.pizzaexpress.com.my/wp-content/uploads/2017/06/tuna.png',
        likes: [],
        reviews: []
      },
      {
        name: 'Double eggs',
        ingredients: ['Mushrooms', 'ham', '2 eggs', 'yellow cheese', 'mozzarella', 'tomato sauce', 'parsley'],
        description: 'Switch it up! Have pizza at breakfast. Ripe tomatoes, fresh parsley, ham, and double eggs make for a filling start to your day.',
        price: 9.90,
        weight: 500,
        image: 'https://us.123rf.com/450wm/deyanarobova/deyanarobova1609/deyanarobova160900037/69702341-pizza-on-a-white-background-with-eggs-ham-cheese-and-peppers-.jpg?ver=6',
        likes: [],
        reviews: []
      },
      {
        name: 'California',
        ingredients: ['chicken', 'avocado', 'olives', 'yellow cheese', 'pineapple', 'tomato sauce'],
        description: 'California pizza is a style of single-serving pizza that combines New York and Italian thin crust with toppings from the California cuisine cooking style.',
        price: 13.90,
        weight: 400,
        image: 'https://www.ca-pizza.com/wp-content/uploads/2016/09/Super-Supreme-1.jpg',
        likes: [],
        reviews: []
      },
      {
        name: 'Quattro Stagioni',
        ingredients: ['classical dough', 'tomato ', 'chorizo', 'proschuitto', 'chicken roll', 'corn', 'egg', 'cheese', 'bacon', 'red onion', 'yellow cheese'],
        description: 'Pizza quattro stagioni is a variety of pizza in Italian cuisine that is prepared in four sections with diverse ingredients, with each section representing one season of the year.',
        price: 13.10,
        weight: 500,
        image: 'http://www.svila.it/php/components/com_virtuemart/shop_image/product/Pizza_Quattro_st_4d1c68920ee08.jpg',
        likes: [],
        reviews: []
      }
    ]

    Pizza
      .create(pizzasSeed)
      .then(() => console.log('Seeded pizzas successfully.'))
      .catch((error) => console.log(error))
  })
}
