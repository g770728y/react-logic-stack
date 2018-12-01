import React, { Component } from 'react';

import Stack from 'react-logic-stack';

const C2 = props => {
  const { onPush, onPop } = props;
  return (
    <div>
      <div>
        <div>我是C2</div>
        <button onClick={() => onPush('C4')}>push C4</button>
        <button onClick={() => onPop()}>返回上级</button>
      </div>
    </div>
  );
};

const C3 = props => {
  const { onPush, onPop } = props;
  return (
    <div>
      <div>
        <div>我是C3</div>
        <button onClick={() => onPush('C4')}>push C4</button>
        <button onClick={() => onPop()}>返回上级</button>
      </div>
    </div>
  );
};

const C4 = props => {
  const { onPush, onPop } = props;
  return (
    <div>
      <div>
        <div>我是C4</div>
        <button onClick={() => onPop()}>返回上级</button>
      </div>
    </div>
  );
};

const C1 = props => {
  const { onPush, onPop } = props;
  return (
    <div>
      <div>我是C1</div>
      <button onClick={() => onPush('C2')}>push C2</button>
      <button onClick={() => onPush('C3')}>push C3</button>
    </div>
  );
};

const getPanel = props => {
  const { current, ...restProps } = props;
  switch (current) {
    case 'C1':
      return <C1 {...restProps} />;
    case 'C2':
      return <C2 {...restProps} />;
    case 'C3':
      return <C3 {...restProps} />;
    case 'C4':
      return <C4 {...restProps} />;
    default:
      return null;
  }
};

export default class App extends Component {
  render() {
    return (
      <Stack initial={'C1'}>
        {stackProps => {
          console.log('current:', stackProps.current);
          return <div>{getPanel(stackProps)}</div>;
        }}
      </Stack>
    );
  }
}
