import React, { useEffect, useRef, useState } from "react";
import { DateValue } from "./utils/DateUtil";
import { RdsDropdown } from "./components/RdsDropdown";
import { InputProps } from "antd/es/input";
import { RdsInput } from "./components/RdsInput";
import { Input, Popover } from "antd";
import { useIsLtr } from "./utils/isRtl";

interface ReactDatePickerProps extends InputProps {
  value: DateValue;
  onDateChange?: (v: DateValue) => void;
  open?: boolean;
  single?: boolean;
  onVisibleChange?: (visible: boolean) => void;
}

export const ReactDateSelector: React.FC<ReactDatePickerProps> = React.forwardRef<
  Input,
  ReactDatePickerProps
>(({ onDateChange, onVisibleChange, single = false, open, className, ...props }, ref) => {
  const [isOpen, setOpen] = useState(open);
  const [isLtr, refRtl] = useIsLtr();
  const refDropdown = useRef<Popover>(null);

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
    <div ref={refRtl}>
      <Popover
        ref={refDropdown}
        trigger="click"
        placement={isLtr ? "bottomLeft" : "bottomRight"}
        visible={isOpen}
        onVisibleChange={changeVisible}
        overlayClassName="ards-dropdown"
        content={
          <RdsDropdown
            outerRef={refDropdown}
            {...props}
            single={single}
            dir={isLtr ? "ltr" : "rtl"}
            onDateChange={updateValue}
          />
        }
      >
        <RdsInput onClear={updateValue} forwardedRef={ref} className={className} {...props} />
      </Popover>
    </div>
  );
});
