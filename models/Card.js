const { Schema, model } = require('mongoose');
const validator = require('validator');

const schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 30,
    },
    link: {
      type: String,
      required: true,
      validate: {
        validator: (v) => {
          return /https?:\/\/(www\.)?[0-9a-zA-Z-]{1,100}\.[0-9a-zA-Z]{1,6}(\/[0-9a-zA-Z/\S]*)*/.test(
            v,
          );
        },
        message: 'Некорректная ссылка',
      },
      owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
      likes: [{ type: Schema.Types.ObjectId, default: [] }],
      createdAt: { type: Date, default: Date.now },
    },
  },
  {
    versionKey: false,
  },
);

module.exports = model('Card', schema);
