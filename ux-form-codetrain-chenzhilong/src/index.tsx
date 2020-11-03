export { default as FormItem } from './components/form-item';
export { LayoutCol, LayoutRow, FormLayout } from './components/form-layout';
export { STATUS } from './util';
export {
  getAllValues as getFormValue,
  validateRule,
  FORMSTATUS,
  generateValidate,
} from './components/form-container';
import './index.scss';

export function fieldBind(fn, args) {
  return () => [fn, ...args];
}

import Form from './components/form-container';
export default Form;
