import React from 'react';
export { LayoutCol } from './layout-col';
export { LayoutRow } from './layout-row';

export function FormLayout(props) {
  return <div className="layout-container">{props?.children}</div>;
}
