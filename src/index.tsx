import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Root } from './components/root/root';
import './index.scss';
import { registerService } from './di/container';
import { LoggerService } from './services/logger-service';
import { ApiClient } from './services/api-client-service';

registerService(LoggerService);
registerService(ApiClient);

ReactDom.render(
  <Root title="Root component title" subtitle="Root component subtitle" {...({} as any)} />,
  document.getElementById('root')
);