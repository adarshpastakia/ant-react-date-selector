import React from "react";
// @ts-ignore
import RangeCalendar from "rc-calendar/lib/RangeCalendar";
// @ts-ignore
import TimePickerPanel from "rc-time-picker/lib/Panel";
import moment, { Moment } from "moment";
import { stylesheet } from "typestyle";
import { Button } from "antd";
import { DateUtil, DateValue } from "..";
import { isDateLike } from "../utils/Predicates";

const css = stylesheet({
  root: {
    $nest: {
      "& .ant-calendar-input": {
        textAlign: "center"
      },
      "& .ant-calendar-range.ant-calendar-time .ant-calendar-range-middle": {
        height: "100%",
        background: "rgba(0,0,0,.1)",
        width: 1,
        padding: 0
      },
      "& .ant-calendar-footer-btn": {
        display: "flex",
        alignItems: "center",
        flexDirection: "row-reverse"
      }
    }
  }
});

export class RdsAbsolute extends React.PureComponent<{
  value: DateValue;
  onDateChange: (value: DateValue) => void;
}> {
  state: any = { value: [moment(), moment()], valid: false };

  componentWillMount(): void {
    const { value } = this.props;
    this.updateFromProps(value);
  }

  componentWillReceiveProps(nextProps: { value: DateValue }): void {
    const { value } = nextProps;
    this.updateFromProps(value);
  }

  updateFromProps(value: DateValue) {
    const dtValue = DateUtil.parse(value);
    if (Array.isArray(dtValue) && dtValue.length === 2) {
      if (isDateLike(dtValue[0]) && isDateLike(dtValue[1])) {
        this.setState({ value: dtValue, valid: true });
      }
    } else {
      this.setState({ value: [], valid: false });
    }
  }

  render() {
    return (
      <div className={css.root}>
        <RangeCalendar
          prefixCls="ant-calendar"
          className="ant-calendar-time"
          showDateInput
          showOk={false}
          showToday={false}
          selectedValue={[moment(this.state.value[0]), moment(this.state.value[1])]}
          renderFooter={() => (
            <Button size="small" onClick={this.onApply} disabled={!this.state.valid} type="primary">
              Apply
            </Button>
          )}
          timePicker={
            <TimePickerPanel
              prefixCls="ant-calendar-time-picker"
              className="ant-calendar-time-picker-column-3"
            />
          }
          onChange={this.dateChanged}
          seperator=""
        />
      </div>
    );
  }

  private onApply = () => {
    this.props.onDateChange(this.state.value.join("|"));
  };

  private dateChanged = (value: [Moment, Moment]) => {
    this.setState({
      value: [value[0] && value[0].toISOString(), value[1] && value[1].toISOString()],
      valid: value.length === 2
    });
  };
}
