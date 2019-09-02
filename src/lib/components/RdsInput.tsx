import React, { useMemo, useState } from "react";
import { DateUtil, DateValue } from "..";
import { Icon, Input } from "antd";
import { InputProps } from "antd/es/input";

interface RdsInputProps extends InputProps {
  value: DateValue;
  onClear: () => void;
  forwardedRef?: React.Ref<Input>;
}

export const RdsInput: React.FC<RdsInputProps> = ({
  value,
  disabled,
  readOnly,
  allowClear,
  onClear,
  forwardedRef,
  ...props
}) => {
  const [isOver, setIsOver] = useState(false);
  const displayLabel = useMemo(() => DateUtil.label(value), [value]);

  const canClear = allowClear && !!value;

  return (
    <Input
      ref={forwardedRef}
      readOnly
      disabled={disabled}
      value={displayLabel || ""}
      {...props}
      onMouseOver={() => setIsOver(true)}
      onMouseLeave={() => setIsOver(false)}
      suffix={
        <div onMouseOver={() => setIsOver(true)}>
          <Icon
            style={{
              color: "rgba(0,0,0,.4)",
              pointerEvents: isOver && canClear ? "all" : "none"
            }}
            onClick={() => onClear()}
            type={isOver && canClear ? "close-circle" : "calendar"}
            theme={isOver && canClear ? "filled" : "outlined"}
          />
        </div>
      }
      onChange={v => console.log(v)}
    />
  );
};
