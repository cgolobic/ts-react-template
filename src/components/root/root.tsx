import * as React from 'react';
import './root.scss';
import { InjectProps } from '../../di/component-injector';
import { LoggerService } from '../../services/logger-service';

export interface RootProps {
  title: string;
  subtitle: string;
  LoggerService: LoggerService;
};

export interface RootState {
  count: number
};

@InjectProps([{inject: LoggerService}])
export class Root extends React.Component<RootProps, RootState> {
  constructor(props: RootProps) {
    super(props);
    this.state = {
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
      </div>
    );
  }

  componentDidMount() {}

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
}