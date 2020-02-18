import React from "react";
// @ts-ignore
import Calendar from "rc-calendar/lib/Calendar";
// @ts-ignore
import TimePickerPanel from "rc-time-picker/lib/Panel";
import moment, { Moment } from "moment";
import { Button } from "antd";
import { DateUtil, DateValue } from "..";
import { isDateLike } from "../utils/Predicates";
import { ConfigConsumer, ConfigConsumerProps } from "antd/lib/config-provider";

export class RdsAbsoluteSingle extends React.PureComponent<{
  dir?: "ltr" | "rtl";
  value: DateValue;
  onDateChange: (value: DateValue) => void;
}> {
  state: any = { value: moment(), valid: false };

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
    this.setState({ value: dtValue, valid: false });
  }

  render() {
    const _self = this;

    return (
      <div className="ards-date-single" dir={this.props.dir}>
        <ConfigConsumer>
          {({ getPrefixCls }: ConfigConsumerProps) => {
            const prefixCls = getPrefixCls("calendar");
            return (
              <Calendar
                prefixCls={prefixCls}
                className={`${prefixCls}-time`}
                showDateInput
                showOk={false}
                showToday={false}
                selectedValue={moment(this.state.value)}
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
    this.props.onDateChange(this.state.value);
  };

  private dateChanged = (value: Moment) => {
    this.setState({
      value: value.toISOString(),
      valid: !!value
    });
  };
}
