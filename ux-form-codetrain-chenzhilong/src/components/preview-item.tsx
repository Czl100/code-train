import React from 'react';

interface IProps {
  label: string;
  value: any;
}
function PreviewItem(props: IProps) {
  const { label, value } = props;
  return (
    <div className="preview-item">
      <span className="preview-label">{label}: </span>
      <span className="preview-value">{value ? value : ''}</span>
    </div>
  );
}
export default PreviewItem;
