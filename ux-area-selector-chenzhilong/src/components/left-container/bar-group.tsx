import React from 'react';

export interface IGroups {
  groups: Array<ISourceItem>;
  curGroup: string;
  onChangeGroup(id: string): void;
}

const BarGroup: React.FC<IGroups> = (props) => {
  const { groups, curGroup, onChangeGroup } = props;

  const handleClick = (e) => {
    const id = e.target.getAttribute('id');
    id && onChangeGroup(id);
  };

  return (
    <ul className="bar-group" onClick={handleClick}>
      {groups?.map((item) => (
        <li key={item.id} id={item.id} className={curGroup === item.id ? 'group-active' : ''}>
          {item.label}
        </li>
      ))}
      <li></li>
    </ul>
  );
};

export default BarGroup;
