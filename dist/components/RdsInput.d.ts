import React from "react";
import { DateValue } from "..";
import { Input } from "antd";
import { InputProps } from "antd/es/input";
interface RdsInputProps extends InputProps {
    value: DateValue;
    onClear: () => void;
    forwardedRef?: React.Ref<Input>;
}
export declare const RdsInput: React.FC<RdsInputProps>;
export {};
