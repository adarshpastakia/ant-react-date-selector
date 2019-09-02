import React, { useEffect, useState } from "react";
import { DateValue } from "./utils/DateUtil";
import { RdsDropdown } from "./components/RdsDropdown";
import { InputProps } from "antd/es/input";
import { RdsInput } from "./components/RdsInput";
import { Input, Popover } from "antd";

interface ReactDatePickerProps extends InputProps {
  value: DateValue;
  onDateChange?: (v: DateValue) => void;
  open?: boolean;
  onVisibleChange?: (visible: boolean) => void;
}

export const ReactDateSelector: React.FC<ReactDatePickerProps> = React.forwardRef<
  Input,
  ReactDatePickerProps
>(({ onDateChange, onVisibleChange, open, ...props }, ref) => {
  const [isOpen, setOpen] = useState(open);

  useEffect(() => {
    setOpen(open);
  }, [open]);
  const changeVisible = (v: boolean) => {
    setOpen(!props.readOnly && v);
    if (!props.readOnly && onVisibleChange) {
      onVisibleChange(v);
    }
  };

  const updateValue = (v?: DateValue) => {
    if (onDateChange) {
      onDateChange(v);
    }
    changeVisible(false);
  };

  return (
    <Popover
      trigger="click"
      placement="bottomLeft"
      visible={isOpen}
      onVisibleChange={changeVisible}
      overlayClassName="ards-dropdown"
      content={<RdsDropdown {...props} onDateChange={updateValue} />}
    >
      <RdsInput onClear={updateValue} forwardedRef={ref} {...props} />
    </Popover>
  );
});
