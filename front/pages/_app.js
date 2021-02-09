import { Component } from "react";

import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import 'antd/dist/antd.css';
import withReduxSaga from 'next-redux-saga';

import wrapper from "../store/configureStore";

const Twitter = ({ Component }) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8"/>
        <title>twitter</title>
      </Head>
      <Component />
    </>
  );
}

Twitter.propTypes = {
  Component: PropTypes.elementType.isRequired
}

export default wrapper.withRedux((withReduxSaga(Twitter)));