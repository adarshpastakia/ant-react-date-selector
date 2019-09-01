import React from "react";
import { DateValue } from "..";
export declare class RdsAbsolute extends React.PureComponent<{
    value: DateValue;
    onDateChange: (value: DateValue) => void;
}> {
    state: any;
    componentWillMount(): void;
    componentWillReceiveProps(nextProps: {
        value: DateValue;
    }): void;
    updateFromProps(value: DateValue): void;
    render(): JSX.Element;
    private onApply;
    private dateChanged;
}
