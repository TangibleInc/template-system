import processValue from './process-value';
import {METHOD} from './constant';

const plugin = () => {
  return {
    postcssPlugin: 'postcss-map-get',

    Declaration(decl) {
      let {value} = decl;

      if (value.includes(METHOD)) {
        decl.value = processValue(decl.value);
      }
    },

    AtRule(atRule) {
      const {params: parameters} = atRule;

      if (parameters.includes(METHOD)) {
        atRule.params = processValue(parameters);
      }
    }
  };
};

plugin.postcss = true;

export default plugin;
