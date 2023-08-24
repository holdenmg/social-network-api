const { Schema, Types, model } = require('mongoose');
const reactionSchema = require('./Reaction')

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema]
  },
  {
    toJSON: {
      getters: true,
      virtuals:true
    },
  
  }
);
thoughtSchema.virtual('reationCount').get(function () {
  return this.reactions.length;
});
const Thought = model('thought', thoughtSchema);


module.exports =  Thought
