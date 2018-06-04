import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Grid, Row, Col, Modal, Image  } from 'react-bootstrap';

const ImageContainer = Styled.img`
  width: 90px;
  height: 90px;
  border-radius: 50%;
  border-color: LightGray ;
`;

const UserName = Styled.p`
  color: #00B6FF;
  font-size: 19px;
`;

const PostTitle = Styled.p`
  color: black;
  font-size: 18px;
`;

const InfoContainer = Styled.div`
  margin-right: 12px;
`;

const Icon = Styled.img`
  margin-right: 8px;
`;

const InfoText = Styled.span`
  color: black;
  font-size: 12px;
`;

const ItemContainer = Styled.div`
  cursor: pointer;
  z-index: 100;
  padding-top: 24px;
  border-bottom: 1px solid LightGray;

  &:hover {
    background: LightGray;
  }
`;

class PostItem extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: false,
    };
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  renderPostItem() {

  }

  renderImage(url) {
    if (url) {
      if (!url.match(/^.*\.(gif|gifv|jpg|jpeg|tiff|svg|bmp|png)$/)) {
        return (
          <Row>
            <Col>
              <a href={url}>{url}</a>
            </Col>
          </Row>
        )
      }
      return (
        !url.includes('gifv') ? (
          <Image responsive src={url} alt="No Content =(" style={{ display: 'block', margin: 'auto' }}/>
        ) : (
          <video width="100%" height="auto" autoPlay loop>
            <source src={url.replace('gifv', 'mp4')} type="video/mp4"/>
            Your browser does not support the video tag.
          </video>
        )
      );
    }
    return null;
  }

  renderModal(post) {
    return (
      <Modal
        show={this.state.show}
        onHide={this.handleClose}
        bsSize={post.url && !post.url.match(/^.*\.(gif|gifv|jpg|jpeg|tiff|svg|bmp|png)$/) ? 'large' : null}
      >
        <Modal.Header closeButton>
          <Modal.Title>{post.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ textAlign: 'center' }}>
          {
            !post.isVideo ? (
              this.renderImage(post.url)
            ) : (
              <video width="100%" height="auto" src={post.media} autoPlay controls>
                Your browser does not support the video tag.
              </video>
            )
          }
        </Modal.Body>
      </Modal>
    )
  }

  renderBottomSection(post) {
    const { num_comments, ups, downs } = post;
    if (num_comments || ups || downs) {
      return (
        <Row>
          <Col xs={4} sm={3} md={2}>
            <InfoContainer>
              <Row>
                <Col sm={4}>
                  <Icon src="/auremImages/message-icon.png" />
                </Col>
                <InfoText>
                  {`${num_comments} comments`}
                </InfoText>
              </Row>
            </InfoContainer>
          </Col>
          <Col xs={4} sm={3} md={2}>
            <InfoContainer>
              <Row>
                <Col sm={4}>
                  <Icon src="/auremImages/heart-icon.png" />
                </Col>
                <InfoText>{`${ups} ups`}</InfoText>
              </Row>
            </InfoContainer>
          </Col>
          <Col xs={4} sm={3} md={2}>
            <InfoContainer>
              <Row>
                <Col sm={4}>
                  <Icon src="/auremImages/download-icon.png" />
                </Col>
                <InfoText>{`${downs} downs`}</InfoText>
              </Row>
            </InfoContainer>
          </Col>
        </Row>
      )
    }
    return null;
  }

  render() {
    const { post } = this.props;
    return (
      <div>
        <ItemContainer onClick={this.handleShow}>
          <Grid>
            <Row>
              <Col sm={2}>
                <ImageContainer src={`${post.thumbnail || '/auremImages/reddit-logo.png'}`} alt="thumnail" />
              </Col>
              <Col sm={9} style={{ marginBottom: 24 }}>
                <UserName>{post.author}</UserName>
                <PostTitle>{post.title}</PostTitle>
                {this.renderBottomSection(post)}
              </Col>
            </Row>
          </Grid>
        </ItemContainer>
        {this.renderModal(post)}
      </div>
    )
  }
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
};

export default PostItem;
