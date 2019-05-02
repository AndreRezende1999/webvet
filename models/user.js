const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

  // username: String,
  persontype: Boolean, // 0 = pessoa fisica, 1 = pessoa juridica
  fullname: String,
  uid: {
    type: String
  },
  register: {
    type: String // CPF ou CNPJ
    // unique: true
  },
  type: {
    type: String,
    enum: ['Admin', 'Analista', 'Produtor', 'Gerencia', 'Convenio'],
    default: 'Produtor'

  },
  address: {
    cep: Number,
    street: String,
    number: String,
    complement: String,
    city: String,
    state: String
  },
  email: {
    type: String,

    lowercase: true
    // unique: true

  },
  phone: String,
  cellphone: String,
  status: {
    type: String,
    enum: ['Inativo', 'Bloqueado', 'Aguardando aprovação', 'Ativo'],
    default: 'Aguardando aprovação',
    required: true
  },

  deleted: {
    type: Boolean, // 1 for deleted, 0 for not deleted
    default: 0
  }

}, { timestamps: true, static: false });

const UserModel = mongoose.model('User', userSchema);

class User {
  /**
   * Get all Users from database
   * @returns {Array} Array of Users
   */
  static getAll() {
    return new Promise((resolve, reject) => {
      UserModel.find({}).exec().then((results) => {
        resolve(results);
      }).catch((err) => {
        reject(err);
      });
    });
  }

  /**
   * Get a User by it's id
   * @param {string} id - User Id
   * @returns {Object} - User Document Data
   */
  static getById(id) {
    return new Promise((resolve, reject) => {
      UserModel.findById(id).exec().then((result) => {
        resolve(result);
      }).catch((err) => {
        reject(err);
      });
    });
  }

  /**
   * Create a new User
   * @param {Object} user - User Document Data
   * @returns {string} - New User Id
   */
  static create(user) {
    return new Promise((resolve, reject) => {
      UserModel.create(user).then((result) => {
        resolve(result._id);
      }).catch((err) => {
        reject(err);
      });
    });
  }

  /**
   * Update a User
   * @param {string} id - User Id
   * @param {Object} User - User Document Data
   * @returns {null}
   */
  static update(id, user) {
    return new Promise((resolve, reject) => {
      UserModel.findByIdAndUpdate(id, user).then(() => {
        resolve();
      }).catch((err) => {
        reject(err);
      });
    });
  }

  /**
  * Delete a User
  * @param {string} id - User Id
  * @returns {null}
  */

  static delete(id) {
    return new Promise((resolve, reject) => {
      UserModel.findByIdAndUpdate(id, { deleted: 1 }).then(() => {
        resolve();
     }).catch((err) => {
       reject(err);
     });
   });
 }

  /**
   * Get a User by it's uid
   * @param {string} id - User Uid
   * @returns {Object} - User Document Data
   */
  static getByUid(id) {
    return new Promise((resolve, reject) => {
      UserModel.findOne({ uid: id }).exec().then((result) => {
        resolve(result);
      }).catch((err) => {
        reject(err);
      });
    });
  }
  /**
  * Add Producer to associatedProducers
  * @param {string} id - User Id
  * @param {string} user - User Id
  * @returns {null}
  */
 static addProducer(id, user) {
   return new Promise((resolve, reject) => {
     UserModel.findByIdAndUpdate(id, { $push: { associatedProducers: user } }).catch((err) => {
       reject(err);
     });
   });
 }

  /**
   * Remove Producer from associatedProducers
   * @param {string} id - User Id
   * @param {string} user - User Id
   * @returns {null}
   */
  static removeProducer(id, user) {
    return new Promise((resolve, reject) => {
      UserModel.findByIdAndUpdate(id, { $pull: { associatedProducers: user } }).catch((err) => {
        reject(err);
      });
    });
  }

  /**
  * Add Manager to associatedManagement
  * @param {string} id - User Id
  * @param {string} user - User Id
  * @returns {null}
  */
 static addProducer(id, user) {
   return new Promise((resolve, reject) => {
     UserModel.findByIdAndUpdate(id, { $push: { associatedManagement: user } }).catch((err) => {
       reject(err);
     });
   });
 }

  /**
   * Remove Manager from associatedProducers
   * @param {string} id - User Id
   * @param {string} user - User Id
   * @returns {null}
   */
  static removeProducer(id, user) {
    return new Promise((resolve, reject) => {
      UserModel.findByIdAndUpdate(id, { $pull: { associatedManagement: user } }).catch((err) => {
        reject(err);
      });
    });
  }

  /**
  * Add covenant to associatedCovenants
  * @param {string} id - User Id
  * @param {string} user - User Id
  * @returns {null}
  */
 static addProducer(id, user) {
   return new Promise((resolve, reject) => {
     UserModel.findByIdAndUpdate(id, { $push: { associatedCovenants: user } }).catch((err) => {
       reject(err);
     });
   });
 }

  /**
   * Remove covenant from associatedCovenants
   * @param {string} id - User Id
   * @param {string} user - User Id
   * @returns {null}
   */
  static removeProducer(id, user) {
    return new Promise((resolve, reject) => {
      UserModel.findByIdAndUpdate(id, { $pull: { associatedCovenants: user } }).catch((err) => {
        reject(err);
      });
    });
  }

}

module.exports = User;
