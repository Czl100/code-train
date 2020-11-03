import React from 'react';
import CheckBoxList from '../../src';

const ExampleCheckBoxsAll = () => {
  return (
    <CheckBoxList
      direction="V"
      canSelectAll={true}
      options={[
        {
          label: '初中',
          value: '初中',
        },
        {
          label: '初中2',
          value: '初中2',
        },
        {
          label: '初中3',
          value: '初中3',
        },
      ]}
    />
  );
};

export default ExampleCheckBoxsAll;
