import AreaSelector from '../../src';

const api = 'http://const.italent.cn/resource/Areas-chs-74-100000.js';
export default () => {
  return <AreaSelector api={api} maxSelectNumber={5} />;
};
