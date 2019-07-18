import * as Helper from './index';

it('buildClassName', () => {
  const testModule = {
    helper: 'helper__test',
    helper_theme_default: 'helper_theme_default__test'
  };

  const data = {
    module: testModule,
    component: 'helper',
    outerClassName: 'app__helper',
    modifiers: {
      theme: 'default'
    }
  };

  const data2 = {
    module: testModule,
    component: 'helper',
    outerClassName: 'app__helper'
  };

  const data3 = {
    module: testModule,
    component: 'helper'
  };

  const data4 = {
    module: testModule,
    component: 'helper',
    modifiers: {
      theme: '',
      size: ''
    }
  };

  expect(Helper.buildClassName(data)).toBe('helper__test app__helper helper_theme_default__test');
  expect(Helper.buildClassName(data2)).toBe('helper__test app__helper');
  expect(Helper.buildClassName(data3)).toBe('helper__test');
  expect(Helper.buildClassName(data4)).toBe('helper__test');
});