import { mh } from '../../src/helpers';

describe('template', () => {
  it('template literal', () => {
    const color = 'red-500';
    const style = mh`bg-gray-100 text-${color} rounded`;
    expect(style).toEqual('bg-gray-100 text-red-500 rounded');
  });
});
