import * as React from 'react';
import './root.scss';
import { InjectProps } from '../../di/component-injector';
import { LoggerService } from '../../services/logger-service';
import { ApiClient } from '../../services/api-client-service';

export interface RootProps {
  title: string;
  subtitle: string;
  LoggerService: LoggerService;
  api: ApiClient;
};

export interface RootState {
  count: number,
  message: string
};

@InjectProps([
  { inject: LoggerService },
  { inject: ApiClient, propName: 'api' }
])
export class Root extends React.Component<RootProps, RootState> {
  constructor(props: RootProps) {
    super(props);
    this.state = {
      message: '',
      count: 0
    };
  }

  render() {
    return(
      <div className="root-component">
        <h1>{this.props.title}</h1>
        <h2>{this.props.subtitle}</h2>
        <button
          className="inc-dec-button"
          onClick={() => this.decrementCounter()}>
          <span className="inc-dec-text">-</span>
        </button>
        <div className="counter">
          <span className="counter-text">{this.state.count}</span>
        </div>
        <button 
          className="inc-dec-button"
          onClick={() => this.incrementCounter()}>
          <span className="inc-dec-text">+</span>
        </button>
        <button
          className="message-button"
          onClick={() => this.getMessage()}>
          <span className="message-button-text">Get Message</span>
        </button>
        <h3>{this.state.message}</h3>
      </div>
    );
  }

  componentDidMount() {
    this.props.api.message.subscribe((message: string) => {
      this.setState({
        message: message
      });
    });
  }

  incrementCounter() {
    this.setState({
      count: this.state.count + 1
    });
    this.props.LoggerService.logMessage(`The count is ${this.state.count}`);
  }

  decrementCounter() {
    this.setState({
      count: this.state.count - 1
    });
    this.props.LoggerService.logMessage(`The count is ${this.state.count}`);
  }

  getMessage() {
    this.props.api.getMessage();
  }
}