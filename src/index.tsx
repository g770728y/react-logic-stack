import React, { Component, ReactNode } from 'react';

interface IState<T = any> {
  current?: T;
  stack: T[];
}

export interface ChildProps<T = any> {
  current: T;
  onPush: (item: T) => void;
  onPop: () => T | null;
}

type IProps<T = any> = {
  initial: T;
  children: (p: ChildProps) => ReactNode;
};

// 用例: 在多个分离的panel实现后退(panel未知)
// 与steps的差别: steps的items 是已知的，并只能实现线性进退
// 而 stack 适用于其它非线性情形
class Stack<T = any> extends Component<IProps<T>, IState<T>> {
  state: IState = {
    stack: []
  };

  constructor(props: IProps) {
    super(props);
    console.log('constructor:', props);
    props.initial &&
      (this.state = { current: props.initial, stack: [props.initial] });
  }

  onPush = (item: T) => {
    this.setState({
      current: item,
      stack: [...this.state.stack, item]
    });
  };

  onPop = () => {
    const { stack } = this.state;
    if (stack.length >= 2) {
      const newStack = stack.slice(0, stack.length - 1);
      const newCurrent = newStack[newStack.length - 1];
      this.setState({
        current: newCurrent,
        stack: newStack
      });
      return newCurrent;
    }
    return null;
  };

  render() {
    const { current } = this.state;
    console.log('stack', this.state.stack);
    return this.props.children({
      current,
      onPush: this.onPush,
      onPop: this.onPop
    });
  }
}

export default Stack;
