import React from 'react';

interface Props {
  count: number;
  label: string;
  onClick: () => void;
}

const CountButton: React.FC<Props> = ({ onClick, label, count }: Props) => {
  return (
    <>
      <button onClick={onClick}>{label}</button>
      <span style={{ marginLeft: '1em' }}>{count}</span>
    </>
  );
};

export default CountButton;
