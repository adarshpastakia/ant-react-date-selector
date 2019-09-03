import React from "react";
// @ts-ignore
import RangeCalendar from "rc-calendar/lib/RangeCalendar";
// @ts-ignore
import TimePickerPanel from "rc-time-picker/lib/Panel";
import moment, { Moment } from "moment";
import { Button } from "antd";
import { DateUtil, DateValue } from "..";
import { isDateLike } from "../utils/Predicates";
import { ConfigConsumer, ConfigConsumerProps } from "antd/lib/config-provider";

export class RdsAbsolute extends React.PureComponent<{
  dir?: "ltr" | "rtl";
  value: DateValue;
  onDateChange: (value: DateValue) => void;
}> {
  state: any = { value: [moment(), moment()], valid: false };

  componentDidMount(): void {
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
    const _self = this;

    return (
      <div className="ards-date-range" dir={this.props.dir}>
        <ConfigConsumer>
          {({ getPrefixCls }: ConfigConsumerProps) => {
            const prefixCls = getPrefixCls("calendar");
            return (
              <RangeCalendar
                prefixCls={prefixCls}
                className={`${prefixCls}-time`}
                showDateInput
                showOk={false}
                showToday={false}
                selectedValue={[moment(this.state.value[0]), moment(this.state.value[1])]}
                renderFooter={() => (
                  <Button
                    size="small"
                    onClick={_self.onApply}
                    disabled={!this.state.valid}
                    type="primary"
                  >
                    Apply
                  </Button>
                )}
                timePicker={
                  <TimePickerPanel
                    prefixCls={`${prefixCls}-time-picker`}
                    className={`${prefixCls}-time-picker-column-3`}
                  />
                }
                onChange={_self.dateChanged}
                seperator=""
              />
            );
          }}
        </ConfigConsumer>
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
