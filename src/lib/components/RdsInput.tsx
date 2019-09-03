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
  className,
  forwardedRef,
  ...props
}) => {
  const [isOver, setIsOver] = useState(false);
  const displayLabel = useMemo(() => DateUtil.label(value), [value]);

  const canClear = allowClear && !!value;

  const isDisabled = useMemo(() => disabled || readOnly, [disabled, readOnly]);

  return (
    <Input
      ref={forwardedRef}
      readOnly
      className={[className, "ards-input"].join(" ")}
      disabled={disabled}
      value={displayLabel || ""}
      {...props}
      onMouseOver={() => !isDisabled && setIsOver(true)}
      onMouseLeave={() => !isDisabled && setIsOver(false)}
      suffix={
        <div onMouseOver={() => !isDisabled && setIsOver(true)}>
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
    />
  );
};
