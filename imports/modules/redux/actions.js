import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import getUserName from '../get-user-name';

export function getPosts(category) {
  return (dispatch) => {
    dispatch({
      type: 'GET_POST_REQUEST',
      loadPosts: true,
      errorPosts: false,
    });

    Meteor.call(
      'posts.getPosts', category,
      (error, response) => {
        const posts = [];
        if (response && response.length > 0) {
          response.forEach((item) => {
            const itemData = item.data;
            posts.push({
              title: itemData.title,
              author: itemData.author,
              thumbnail: itemData.thumbnail,
              num_comments: itemData.num_comments,
              ups: itemData.ups,
              downs: itemData.downs,
              url: itemData.url,
              isVideo: itemData.is_video,
              media: itemData.media && itemData.media.reddit_video && itemData.media.reddit_video.fallback_url,
            });
          });
          dispatch({
            type: 'GET_POST_SUCCESS',
            posts,
            loadPosts: false,
          });
        } else {
          dispatch({
            type: 'GET_POST_ERROR',
            loadPosts: false,
            errorPosts: true,
          });
        }
      },
    );
  };
}

export function onLogin() {
  return (dispatch) => {
    const loggingIn = Meteor.loggingIn();
    const user = Meteor.user();
    const userId = Meteor.userId();
    const loading = !Roles.subscription.ready();
    const name = user && user.profile && user.profile.name && getUserName(user.profile.name);
    const emailAddress = user && user.emails && user.emails[0].address;

    dispatch({
      type: 'ON_LOGIN',
      loading,
      loggingIn,
      authenticated: !loggingIn && !!userId,
      name: name || emailAddress,
      roles: !loading && Roles.getRolesForUser(userId),
      userId,
      emailAddress,
      emailVerified: user && user.emails ? user && user.emails && user.emails[0].verified : true,
    });
  };
}

export function onLogout() {
  return (dispatch) => {
    dispatch({
      type: 'ON_LOGOUT',
      loading: false,
      loggingIn: false,
      authenticated: false,
      name: '',
      roles: [],
      userId: null,
      emailAddress: '',
      emailVerified: false,
    });
  };
}
