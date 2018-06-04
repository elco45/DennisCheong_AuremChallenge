import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'styled-components';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getPosts } from '../../../modules/redux/actions';

const Input = Styled.input`
  border-radius: 50px;
  color: #00B6FF;
  font-weight: bold;
  padding-left: 4px;
`;

export class Navigation extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      category: 'funny',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.props.handleGetPost('funny');
  }

  handleChange(event) {
    const category = event.target.value;

    this.setState({ category });
    this.props.handleGetPost(category);
  }

  render() {
    return (
      <Navbar style={{ background: '#00B6FF' }} collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/" style={{ color: '#fff' }} >Reddit</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Nav pullRight>
          <NavItem eventKey="1">
            <Input
              type="text"
              value={this.state.category}
              placeholder="Enter text"
              onChange={(e) => this.handleChange(e)}
            />
          </NavItem>
        </Nav>
      </Navbar>
    );
  }
};

Navigation.propTypes = {
  handleGetPost: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  handleGetPost: data => dispatch(getPosts(data)),
});

export default compose(connect(mapStateToProps, mapDispatchToProps))(Navigation);

