import React from 'react';
import Form, {
  FormItem,
  fieldBind,
  STATUS,
  validateRule,
  generateValidate,
  getFormValue,
} from '../../src';
import FieldInput from '@beisen-phoenix/field-input';
import { FieldDatePicker } from '@beisen-phoenix/field-date-time-picker';

export default function () {
  return (
    <Form>
      {/* 使用内置校验规则校验年龄 */}
      <FormItem name="age" label="年龄" validate={validateRule.isNumber} status={STATUS.REQUIRED}>
        <FieldInput />
      </FormItem>
      {/* 使用内置校验规则 */}
      <FormItem name="phoneNumber" label="电话号码" validate={validateRule.isPhoneNumber}>
        <FieldInput />
      </FormItem>
      {/* 使用自定义校验规则 */}
      <FormItem
        name="baseSalary"
        label="基本工资"
        status={STATUS.REQUIRED}
        validate={(val) => {
          if (Number(val) > 1000) {
            return generateValidate(true, 'OK');
          } else {
            return generateValidate(false, '这点钱我很难办事啊!');
          }
        }}>
        <FieldInput />
      </FormItem>
      <FormItem name="bonus" label="奖金" validate={validateRule.isNumber}>
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

      <FormItem name="startTime" label="开始时间">
        <FieldDatePicker />
      </FormItem>
      <FormItem
        name="endTime"
        label="结束时间"
        validate={(endTime) => {
          let endVal = Number(endTime.replace(/\D/g, ''));
          let startVal = Number(getFormValue().startTime.replace(/\D/g, ''));
          console.debug(`开始时间：${startVal}  结束时间：${endVal}`);

          if (!endVal || !startVal) {
            return generateValidate(true, '');
          } else if (endVal > startVal) {
            return generateValidate(true, '填写正确');
          } else {
            return generateValidate(false, '结束时间必须大于开始时间');
          }
        }}>
        <FieldDatePicker />
      </FormItem>
    </Form>
  );
}

// 求和
function sum(...args) {
  return args.reduce((acc, curVal) => Number(acc) + Number(curVal));
}
