const mongodb = require('mongodb');
const { get } = require('../routes/admin');
const getDb = require('../util/database').getDb;

const ObjectId = mongodb.ObjectId;

class User {
  constructor(username, email, cart, id) {
    this.name = username;
    this.email = email;
    this.cart = cart;
    this._id = id
  }

  save() {
    const db = getDb();
    return db.collection('users').insertOne(this);
  }

  addToCart(product) {
    // const cartProduct = this.cart.items.findIndex(cp => {
    //   return cp._id === product._id;
    // });
    const updatedCart = { items: [{ productId: new ObjectId(product._id), quantity: 1 }] };
    const db = getDb();
    return db
      .collection('users')
      .updateOne(
      { _id: new ObjectId(this._id) }, 
      { $set: {cart: updatedCart} }
    );
  }

  static findByPk(userId) {
    const db = getDb();
    return db
      .collection('users')
      .findOne({_id: new ObjectId(userId)})
  }
}

module.exports = User;
