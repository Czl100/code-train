import React, { useState } from 'react';
import Form, {
  FormItem,
  fieldBind,
  STATUS,
  validateRule,
  FormLayout,
  LayoutCol,
  LayoutRow,
} from '../../src';
import FieldInput from '@beisen-phoenix/field-input';
import CheckBoxList from 'ux-checkbox-codetrain-chenzhilong';
import SelectorDrop from 'ux-selectordropdown-chenzhilong';
import AreaSelector from 'ux-area-selector-chenzhilong';

const apiArea = 'http://const.italent.cn/resource/Areas-chs-74-100000.js';
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

  console.debug('渲染最外层form');
  return (
    <FormLayout>
      <Form>
        <LayoutRow>
          <LayoutCol>
            <FormItem name="name" label="姓名" status={STATUS.REQUIRED}>
              <FieldInput />
            </FormItem>
          </LayoutCol>
          <LayoutCol>
            <FormItem name="age" label="年龄" validate={validateRule.isNumber}>
              <FieldInput />
            </FormItem>
          </LayoutCol>
        </LayoutRow>

        <LayoutRow>
          <LayoutCol>
            <FormItem name="areaWork" label="工作地点" status={STATUS.REQUIRED}>
              <CheckBoxList
                options={[
                  { label: '北京', value: '北京' },
                  { label: '成都', value: '成都' },
                  { label: '上海', value: '上海' },
                ]}
                direction={'V'}
                canSelectAll={true}
              />
            </FormItem>
          </LayoutCol>
          <LayoutCol>
            <FormItem name="education" label="学历">
              <SelectorDrop options={edcatOption} />
            </FormItem>
          </LayoutCol>
        </LayoutRow>

        <FormItem name="scholl" label="毕业学校" status={fieldBind(isShow, ['education'])}>
          <FieldInput />
        </FormItem>
        <FormItem name="phoneNumber" label="电话号码" validate={validateRule.isPhoneNumber}>
          <FieldInput />
        </FormItem>
        <FormItem name="baseSalary" label="基本工资">
          <FieldInput />
        </FormItem>
        <FormItem name="bonus" label="奖金">
          <FieldInput />
        </FormItem>
        <FormItem
          name="income"
          label="收入"
          readonly={true}
          status={STATUS.READONLU}
          // 字段绑定
          value={fieldBind(sum, ['baseSalary', 'bonus'])}>
          <FieldInput />
        </FormItem>
        <FormItem
          name="areaHome"
          label="居住地"
          status={STATUS.REQUIRED}
          validate={validateRule.notEmpty}>
          <AreaSelector api={apiArea} maxSelectNumber={5} />
        </FormItem>
      </Form>
    </FormLayout>
  );
}

// 求和
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
