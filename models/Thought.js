const { Schema, Types } = require('mongoose');

const thoughtSchema = new Schema(
  {
    thoughtId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    thoughtText: {
      type: String,
      required: true,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    username:{
      type: String,
      required: true,
    },
    reactions: [{type: Schema.Types.ObjectId, ref: 'reaction'}]
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);
thoughtSchema.virtual('reationCount').get(function () {
  return this.reactions.length;
});


module.exports = thoughtSchema;
