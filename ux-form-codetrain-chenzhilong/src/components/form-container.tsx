import React, { useMemo } from 'react';
import useFormContext, { getAllValues, validateRule, generateValidate } from '../use-form-context';
import { FormContext, FORMSTATUS } from '../context';
import PreviewItem from './preview-item';
import { STATUS } from '../util';

// 表单容器组件
export interface IForm {
  formStatus?: keyof FORMSTATUS;
  [key: string]: any;
}
export default function FormContainer(props: IForm) {
  const { children, ...initConfig } = props;
  const [formContext, operate, validateRule] = useFormContext(initConfig);
  const formStatus = formContext.formStatus;

  const context = React.useMemo(() => {
    return { data: formContext as any, operate, validateRule };
  }, [formContext, operate]);

  useMemo(() => {
    let names: Array<any> = [];
    let values: Array<any> = [];
    if (Array.isArray(children)) {
      children.forEach((child) => {
        let name = child?.props?.name;
        let val = child?.props?.value;
        if (name && typeof context.data[name] === 'undefined') {
          names.push(name);
          values.push(val ? val : '');
        }
      });
    } else {
      let name = children?.props?.name;
      let val = children?.props?.value;
      if (name && typeof context.data[name] === 'undefined') {
        names.push(name);
        values.push(val ? val : '');
      }
    }
    // 添加字段到 context
    names.length > 0 && context.operate.addState(names, values);
  }, []);

  const handleSubmit = React.useCallback(() => {
    if (formStatus === FORMSTATUS.PREVIEW) {
      return operate.setValue('formStatus', FORMSTATUS.EDITOR);
    }
    for (let i = 0, N = children.length; i < N; i++) {
      let formItemProps = children[i].props;
      let { name, label } = formItemProps;
      let value = operate.getValue(name);
      if (
        formItemProps.hasOwnProperty('validate') &&
        validateRule.notEmpty(value)?.value &&
        !formItemProps.validate(value)?.value
      ) {
        // 单字段校验失败
        return alert(`${label ? label : name}填写有误`);
      } else if (formItemProps.status === STATUS.REQUIRED && !validateRule.notEmpty(value)?.value) {
        return alert(`${label ? label : name}不能为空`);
      }
    }
    // 保存文件到本地
    operate.setValue('formStatus', FORMSTATUS.PREVIEW);
    var elementA = document.createElement('a');
    elementA.setAttribute(
      'href',
      'data:text/plain;charset=utf-8,' + JSON.stringify(formContext, null, '  '),
    );
    elementA.setAttribute('download', 'format-data.json');
    elementA.style.display = 'none';
    document.body.appendChild(elementA);
    elementA.click();
    document.body.removeChild(elementA);
  }, [formContext]);

  // render
  return (
    <FormContext.Provider value={context}>
      <div className={`form-container form-${formStatus}`}>
        {formStatus === FORMSTATUS.EDITOR
          ? children
          : children.map((formItem) => {
              const itemProps = formItem.props;
              return (
                <PreviewItem
                  key={itemProps.label}
                  label={itemProps.label}
                  value={operate.getValue(itemProps.name)}
                />
              );
            })}

        <div className="submit-btn">
          <input
            type="button"
            onClick={handleSubmit}
            value={formStatus === FORMSTATUS.EDITOR ? '提交并预览' : '编辑'}
          />
        </div>
      </div>
    </FormContext.Provider>
  );
}

export { getAllValues, validateRule, FORMSTATUS, generateValidate };
