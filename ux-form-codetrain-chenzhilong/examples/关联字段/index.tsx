import React, { useState } from 'react';
import Form, { FormItem, fieldBind, getFormValue, STATUS, validateRule } from '../../src';
import FieldInput from '@bs-phoenix/field-input';
import SelectorDrop from 'ux-selectordropdown-chenzhilong';

const apiEdu = 'http://10.129.7.191:7300/mock/5f4c999a40a755002021ebc4/example/GetDataSource';

export default function () {
  const [edcatOption, setEdu] = useState<Array<any>>([]);

  React.useEffect(() => {
    fetch(apiEdu)
      .then((rsp) => rsp.json())
      .then((data) => {
        if (data?.length > 0) {
          const newData = data[0].dataSourceResults.map((data) => {
            return { ...data, id: Math.random(), isCheck: false, value: data?.text };
          });
          setEdu(newData);
        }
      })
      .catch((error) => {
        console.debug(error);
      });
  }, []);

  return (
    <Form>
      <FormItem name="education" label="学历">
        <SelectorDrop options={edcatOption} />
      </FormItem>
      <FormItem name="scholl" label="毕业学校" status={fieldBind(isShow, ['education'])}>
        <FieldInput />
      </FormItem>

      <FormItem name="baseSalary" label="基本工资">
        <FieldInput />
      </FormItem>
      <FormItem name="bonus" label="奖金">
        <FieldInput />
      </FormItem>
      {/* 只读字段，动态绑定 */}
      <FormItem
        name="income"
        label="收入"
        status={STATUS.READONLU}
        value={fieldBind(sum, ['baseSalary', 'bonus'])}>
        <FieldInput />
      </FormItem>
    </Form>
  );
}

// 动态绑定收入字段的值
function sum(...args) {
  return args.reduce((acc, curVal) => Number(acc) + Number(curVal));
}

// 当学历字段中包含本科、硕士研究生、博士研究生中的任何一个时显示毕业学校这个字段
function isShow(val) {
  const dst = ['本科', '硕士研究生', '博士研究生'];
  if (Array.isArray(val)) {
    for (let i = 0, N = val.length; i < N; i++) {
      if (dst.includes(val[i])) {
        return STATUS.NORMAL;
      }
    }
    return STATUS.HIDDEN;
  }
  return dst.some((edu) => new RegExp(edu).test(val)) ? STATUS.NORMAL : STATUS.HIDDEN;
}
