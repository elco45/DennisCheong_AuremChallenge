/* eslint-disable consistent-return */

import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';
import { check } from 'meteor/check';

Meteor.methods({
  'posts.getPosts': function getPosts(category) {
    check(category, String);
    try {
      if (category && category.length > 0) {
        const response = HTTP.get(`http://reddit.com/r/${category}/.json`);
        return response.data.data.children;
      }
      return null;
    } catch (e) {
      // Got a network error, timeout, or HTTP error in the 400 or 500 range.
      return e;
    }
  },
});
