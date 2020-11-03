import React from 'react';
import Form, { FormItem, FORMSTATUS, getFormValue } from '../../src';
import FieldInput from '@beisen-phoenix/field-input';
import CheckBoxList from 'ux-checkbox-codetrain-chenzhilong';
import SelectorDrop from 'ux-selectordropdown-chenzhilong';
import AreaSelector from 'ux-area-selector-chenzhilong';

export default function () {
  return (
    <>
      <Form formStatus={FORMSTATUS.PREVIEW}>
        <FormItem name="name" label="姓名" value="张三">
          <FieldInput />
        </FormItem>
        <FormItem name="age" label="年龄" value="12">
          <FieldInput />
        </FormItem>

        <FormItem name="areaWork" label="工作地点" value="成都">
          <CheckBoxList options={[]} direction={'V'} canSelectAll={true} />
        </FormItem>

        <FormItem name="education" label="学历" value="小学">
          <SelectorDrop options={[]} />
        </FormItem>
        <FormItem name="scholl" label="毕业学校" value="帝国理工">
          <FieldInput />
        </FormItem>
        <FormItem name="phoneNumber" label="电话号码" value="1234567890">
          <FieldInput />
        </FormItem>
        <FormItem name="baseSalary" label="基本工资" value="100">
          <FieldInput />
        </FormItem>
        <FormItem name="bonus" label="奖金" value="0.01">
          <FieldInput />
        </FormItem>
        <FormItem name="income" label="收入" readonly={true}>
          <FieldInput />
        </FormItem>
        <FormItem name="areaHome" label="居住地" value="铁岭">
          <AreaSelector api={''} maxSelectNumber={5} />
        </FormItem>
      </Form>
      <button onClick={() => console.debug(getFormValue())}>导出表单的所有值</button>
    </>
  );
}
