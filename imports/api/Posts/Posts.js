/* eslint-disable consistent-return */

import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const Posts = new Mongo.Collection('Posts');

Posts.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Posts.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

Posts.schema = new SimpleSchema({
  title: { type: String },
  author: { type: String },
  thumbnail: { type: String },
  num_comments: { type: Number },
  ups: { type: Number },
  downs: { type: Number },
});

Posts.attachSchema(Posts.schema);

export default Posts;
