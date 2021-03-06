import React from 'react';
import { Grid } from 'react-bootstrap';
import styled from 'styled-components';
import { Meteor } from 'meteor/meteor';
import { year } from '../../../modules/dates';

const StyledFooter = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 60px;
  background-color: #fff;
  border-top: 1px solid var(--gray-lighter);
  padding: 20px 0;

  p {
    color: var(--gray-light);
    font-size: 14px;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  ul li {
    float: left;

    &:first-child {
      margin-right: 15px;
    }

    a {
      color: var(--gray-light);
    }

    a:hover,
    a:active,
    a:focus {
      text-decoration: none;
      color: var(--gray);
    }
  }

  @media screen and (min-width: 768px) {
    ul li:first-child {
      margin-right: 30px;
    }
  }
`;

const { copyrightStartYear } = Meteor.settings.public;
const copyrightYear = () => {
  const currentYear = year();
  return currentYear === copyrightStartYear ? copyrightStartYear : `${copyrightStartYear}-${currentYear}`;
};

const Footer = () => (
  <StyledFooter>
    <Grid>
      <p className="pull-left">&copy; {copyrightYear()} Aurem Challenge</p>
    </Grid>
  </StyledFooter>
);

Footer.propTypes = {};

export default Footer;
