import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Input, Menu, Row, Col } from 'antd';
import styled from 'styled-components';

import UserProfile from '../components/UserProfile';
import LoginForm from '../components/LoginForm';
import { useDispatch, useSelector } from 'react-redux';

import { loadUserRequestAction } from '../reducers/user';
const SearchInput = styled(Input.Search)`
  vertical-align: middle;
`;

const AppLayout = ({ children }) => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user );
  useEffect(() => {
    if (!me) {
      dispatch(loadUserRequestAction());
    }
  }, []);

  return (
    <div>
      <Menu mode="horizontal">
        <Menu.Item >
          <Link href="/"><a>트위터</a></Link>
        </Menu.Item>
        <Menu.Item>
          <Link href="/profile"><a>프로필</a></Link>
        </Menu.Item>
        <Menu.Item>
          <SearchInput enterButton />
        </Menu.Item>
        <Menu.Item>
          <Link href="/signup"><a>회원가입</a></Link>
        </Menu.Item>
      </Menu>
      <Row gutter="8">
        <Col xs={24}  md={6} >
          {me ? <UserProfile /> : <LoginForm />}
        </Col>
        <Col xs={24}  md={12} >
          {children}
        </Col>
        <Col xs={24}  md={6} >
          <a href="https://github.com/beome" target="_blank" rel="noreferrer noopener">Made by BeomjinPark</a>
        </Col>
      </Row>
      
    </div>
  );
}

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default AppLayout;
