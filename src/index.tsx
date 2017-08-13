import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Root } from './components/root/root';
import './index.scss';

ReactDom.render(
  <Root title="Root component title" subtitle="Root component subtitle" />,
  document.getElementById('root')
);