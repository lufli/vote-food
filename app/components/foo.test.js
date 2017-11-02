import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Foo from './foo';

configure({ adapter: new Adapter() });

test('show Hello World! text', () => {
  const foo = shallow(<Foo />);
  expect(foo.text()).toEqual('Hello World!');
});
