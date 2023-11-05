const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const Schema = mongoose.Schema
const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
})

UserSchema.methods.comparePassword = function(pw) {
  return bcrypt.compareSync(pw, this.password)
}

module.exports = mongoose.model('User', UserSchema)