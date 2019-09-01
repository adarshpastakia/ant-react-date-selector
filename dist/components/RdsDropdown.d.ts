import React from "react";
import { InputProps } from "antd/es/input";
import { DateValue } from "..";
interface RdsInputProps extends InputProps {
    value: DateValue;
    onDateChange: (v: DateValue) => void;
}
export declare const RdsDropdown: React.FC<RdsInputProps>;
export {};
