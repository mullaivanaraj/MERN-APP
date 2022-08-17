const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

const userSchema = mongoose.Schema({
  name: { type: String, trim: true, required: true },
  email: { type: String, trim: true, required: true, unique: true },
  password: { type: String, trim: true, required: true },
  picture: { type: String, trim: true, default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg", },
},
{
  timestamps: true,
});

userSchema.methods.matchPassword = async function(inputPassword) {
  return await bcryptjs.compare(inputPassword, this.password);
}

userSchema.pre('save',async function(next) {
    if(!this.isModified){
        next();
    }

    const salt = await bcryptjs.genSalt(10);
    this.password = await bcryptjs.hash(this.password, salt);
})

const User = mongoose.model('User', userSchema);

module.exports = User;