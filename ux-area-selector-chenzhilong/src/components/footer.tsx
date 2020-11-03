import React, { FC } from 'react';

export interface IFooter {
  className?: string;
  onSure(): void;
  onCancel(): void;
}
const Footer: FC<IFooter> = (props) => {
  const { className: clsName, onSure, onCancel } = props;

  return (
    <div className={clsName}>
      <button className="btn-sure" onClick={onSure}>
        确定
      </button>
      <button className="btn-cancel" onClick={onCancel}>
        取消
      </button>
    </div>
  );
};

export default Footer;
