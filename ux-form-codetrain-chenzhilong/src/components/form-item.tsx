import React, { useState, useCallback } from 'react';
import { FormContext } from '../context';
import { STATUS } from '../util';

export interface IFormItemP {
  name: string;
  label?: string;
  value?: any;
  validate?(val: any): { value: boolean; msg: string };
  context?: any;
  [k: string]: any;
}

function FormItem(props) {
  const { children, name, label, context, value, validate, ...resProps } = props;
  const { operate: operateCtx, validateRule } = context;
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // 计算动态绑定的值
  const calcuDynamicValue = useCallback(
    (value) => {
      let args = value();
      let fn = args.shift();
      args = args.map((k) => operateCtx.getValue(k));
      return fn(...args);
    },
    [operateCtx],
  );

  // 获取组件的 props
  let comProps;
  if (children && React.isValidElement(children)) {
    const jsxComponent = React.Children.only(children);
    if (jsxComponent) {
      comProps = jsxComponent.props;
    }
  }

  let concatProps = Object.assign({}, resProps);

  /**
   * 事件响应
   */
  // 当表单元素的值变化时，获取到表单元素的值
  const handleChange = (value) => {
    let val = getVal(value);
    // 单字段校验
    if (typeof validate === 'function') {
      let valiResult = validateRule.notEmpty(val);
      if (!valiResult?.value) {
        concatProps?.status === STATUS.REQUIRED ? setErrorMsg('不能为空') : setErrorMsg('');
        setSuccessMsg('');
        operateCtx.setValue(name, val);
      } else if (validate(val)?.value) {
        operateCtx.setValue(name, val);
        setErrorMsg('');
        setSuccessMsg(validate(val)?.msg);
      } else {
        setErrorMsg(validate(val)?.msg);
        setSuccessMsg('');
      }
      return;
    }
    ![undefined, null].includes(val) && operateCtx.setValue(name, val);
  };

  const handleKeyUp = (e) => {
    if (e.keyCode === 13) {
      let val = getVal(e);
      ![undefined, null].includes(val) && !isNaN(val) && operateCtx.setValue(name, val);
    }
  };

  const handleBlur = (e) => {
    let val = getVal(e);
    ![undefined, null].includes(val) && !isNaN(val) && operateCtx.setValue(name, val);
  };

  // 处理除 value 字段外的其他字段的动态绑定
  let fieldNames = Object.keys(concatProps);
  fieldNames.forEach((n) => {
    let fieldVal = concatProps[n];
    if (typeof fieldVal === 'function') {
      let val = calcuDynamicValue(fieldVal);
      concatProps[n] = val;
    }
  });

  // 获取 context 中的值, 字段绑定
  const contextVal = operateCtx.getValue(name);
  if (typeof value === 'function') {
    let val = calcuDynamicValue(value);
    concatProps.value = val;
    contextVal !== val && operateCtx.setValue(name, val);
  } else if (![undefined, null].includes(contextVal)) {
    concatProps.value = contextVal;
  } else {
    concatProps.value = '';
  }

  concatProps = {
    ...concatProps,
    onChange: handleChange,
    onKeyUp: handleKeyUp,
    onBlur: handleBlur,
  };

  // render
  const childCmp = React.Children.only(children);
  return (
    <div className={`form-item ${concatProps.status ? concatProps.status : ''}`}>
      <div className="content">
        <span className="form-item-label">{!!label ? label : ''}</span>
        {React.cloneElement(childCmp, concatProps)}
        <span className="hint">
          {concatProps.status === STATUS.REQUIRED && !validateRule.notEmpty(contextVal)?.value
            ? '必填'
            : ''}
        </span>
      </div>
      <p className="error-msg">{errorMsg}</p>
      <p className="sucess-msg">{successMsg}</p>
    </div>
  );
}

export default function FormItemContext(props) {
  return (
    <FormContext.Consumer>
      {(context) => <FormItem context={context} {...props} />}
    </FormContext.Consumer>
  );
}

// -----------------------------------------------------------------------------
function getVal(src) {
  if (Array.isArray(src)) {
    return src.map((item) => _getVal(item)).join('，');
  }
  return _getVal(src);

  function _getVal(item) {
    if (['', undefined, null].includes(item)) {
      return '';
    }
    if (typeof item !== 'object') {
      return item;
    }
    if (typeof item?.value !== 'undefined' && item?.value !== 'object') {
      return item.value;
    }
    if (typeof item?.label !== 'undefined' && item?.label !== 'object') {
      return item.label;
    }
    // 日期 "2020-09-02T10:43:36.564Z"
    if (src?.constructor?.name === 'Moment') {
      return JSON.stringify(src)
        .replace(/[\'\"]/g, '')
        .replace(/[a-zA-Z]/g, ' ')
        .replace(/\-/g, '/')
        .split('.')[0]
        .trim();
    }
    return JSON.stringify(src);
  }
}
