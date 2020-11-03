import React, { useState } from 'react';
import { initState } from './context';

export const generateValidate = (value, msg) => ({ value, msg });
// 校验规则
export const validateRule = {
  notEmpty: (val) => {
    if ([undefined, null, ''].includes(val)) {
      return generateValidate(false, '不能为空');
    }
    if (Array.isArray(val) && val.length === 0) {
      return generateValidate(false, '不能为空');
    }
    if (String(val).trim().length === 0) {
      return generateValidate(false, '不能为空');
    }
    return generateValidate(true, '填写正确');
  },
  isNumber: (val) => {
    if (/\D/.test(val)) {
      return generateValidate(false, '只能填数字');
    } else {
      return generateValidate(true, '填写正确');
    }
  },
  isPhoneNumber: (val) => {
    val = String(val);
    if (val.length !== 11 || /\D/.test(val)) {
      return generateValidate(false, '填写错误');
    }
    return generateValidate(true, '填写正确');
  },
  // 大于
  greater: (ownVal, otherVal) => {
    if (typeof ownVal === 'number') {
      return ownVal > otherVal;
    }
    try {
      let ownStr = JSON.stringify(ownVal);
      let otherStr = JSON.stringify(otherVal);
    } catch (error) {
      console.debug(error);
    }
  },
};

export default function useFormContext(config = {}) {
  const [formContext, setFormContext] = useState(Object.assign({}, initState, config));
  // 增删改查
  const operate = {
    setValue: (key, value) => {
      let newState = {
        ...formContext,
        [key]: value,
      };
      setFormContext(newState);
    },
    getValue: (key) => {
      return formContext[key];
    },
    addState: (key, value = '') => {
      let newState;
      if (Array.isArray(key)) {
        let obj = {};
        key.forEach((k, idx) => (obj[k] = value[idx]));
        newState = { ...formContext, ...obj };
      } else {
        newState = { ...formContext, [key]: value[idx] };
      }
      setFormContext(newState);
    },
  };
  // 导出所有的值
  _setAllValues(formContext);
  return [formContext, operate, validateRule];
}

const _setAllValues = (function () {
  let data = {};
  return (value = null) => {
    value !== null && (data = value);
    return () => data;
  };
})();

export const getAllValues = () => {
  return _setAllValues()();
};
