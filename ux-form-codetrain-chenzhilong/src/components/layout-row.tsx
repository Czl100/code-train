// 行布局组件
import React from 'react';

export function LayoutRow(props) {
  const { children } = props;
  return <div className="layout-row">{children}</div>;
}
