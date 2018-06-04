import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PostItem from '../../components/PostItem/PostItem';

export class Home extends React.PureComponent {
  renderLoadingAndError(loading, error) {
    return (
      <div style={{ height: '100vh' }} className="d-flex justify-content-center align-items-center">
        {
          loading && !error ? (
            <img src="/auremImages/loader.gif" alt="Loading..." />
          ) : (
            <img src="/auremImages/unknown.png" alt="Unknown" />
          )
        }
      </div>
    );
  }

  render() {
    const { posts, loadPosts, errorPosts } = this.props;

    return (
      <div>
        {
          !loadPosts ? (
            <div>
              {
                posts && posts.map((post, index) => (
                  <PostItem post={post} key={index} />
                ))
              }
            </div>
          ) : (
            this.renderLoadingAndError(loadPosts, errorPosts)
          )
        }
      </div>
    );
  }
}

Home.defaultProps = {
  posts: [],
  loadPosts: false,
  errorPosts: false,
};

Home.propTypes = {
  posts: PropTypes.array,
  loadPosts: PropTypes.bool,
  errorPosts: PropTypes.bool,
};

const mapStateToProps = state => ({
  posts: state.posts,
  loadPosts: state.loadPosts,
  errorPosts: state.errorPosts,
});
const mapDispatchToProps = dispatch => ({});

export default compose(connect(mapStateToProps, mapDispatchToProps))(Home);
