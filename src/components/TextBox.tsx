import React, { useCallback, useMemo } from 'react';

interface Props {
  /** String literal if label */
  label: string;

  /** Type of text box */
  type: 'text' | 'password';

  /** Value of text box */
  value: string;

  /** Callback function that make parent be able to get its property */
  onChangeText: (value: string) => void;
}

const TextBox: React.FC<Props> = (props) => {
  const label = useMemo(() => {
    return props.label ? <label>{props.label}</label> : null;
  }, [props.label]);

  const onValueChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.currentTarget.value;
      props.onChangeText(value);
    },
    [props.onChangeText],
  );

  return (
    <span>
      {label}
      <input name="username" type={props.type} value={props.value} onChange={onValueChange} />
    </span>
  );
};

export default TextBox;
