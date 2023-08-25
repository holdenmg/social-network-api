const { Schema, Types, model } = require('mongoose');

// Schema to create User model
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trimmed: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (v) {
          return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
        },
        message: props => `${props.value} is not a valid email!!`
      }
    },
    thoughts: [{type: Schema.Types.ObjectId, ref: 'thought'}],

    friends: [{type: Schema.Types.ObjectId, ref: 'user' }],
  },
{
  toJSON: {
    virtuals: true,
    //getters: true,
    },
  id: false,
  }
);

// Create a virtual property `friend count` that gets and sets the user's friend count
userSchema
  .virtual('friendCount')
  // Getter
  .get(function () {
    return this.friends.length;
  });

 

// Initialize our User model
const User = model('user', userSchema);

module.exports = User;
