import React, { useState } from "react";
import { Form, Switch } from "antd";
import { DateUtil, ReactDateSelector } from "../lib";

export const Tester = () => {
  const [date, setDate] = useState<string | undefined>("$week|$now");
  const [isDisabled, setIsDisabled] = useState(false);
  const [isReadonly, setIsReadonly] = useState(false);
  const [isLarge, setIsLarge] = useState(false);

  return (
    <>
      <div className="x-section">Component</div>
      <Form layout="inline">
        <Form.Item label="Date Selector" help={`${date}`}>
          <ReactDateSelector
            value={date}
            onDateChange={setDate}
            allowClear
            disabled={isDisabled}
            readOnly={isReadonly}
            size={isLarge ? "large" : "default"}
          />
        </Form.Item>
        <Form.Item label="Date value">
          {date ? DateUtil.parse(date)!.toString() : "undefined"}
        </Form.Item>
      </Form>
      <Form layout="inline">
        <Form.Item label="Disabled">
          <Switch checked={isDisabled} onChange={c => setIsDisabled(c)} />
        </Form.Item>
        <Form.Item label="Readonly">
          <Switch checked={isReadonly} onChange={c => setIsReadonly(c)} />
        </Form.Item>
        <Form.Item label="Large">
          <Switch checked={isLarge} onChange={c => setIsLarge(c)} />
        </Form.Item>
      </Form>
      <br />

      <div className="x-section">RTL Support</div>
      <div dir="rtl">
        <Form layout="inline">
          <Form.Item label="Date Selector" help={<bdi>{`${date}`}</bdi>}>
            <ReactDateSelector
              value={date}
              onDateChange={setDate}
              allowClear
              disabled={isDisabled}
              readOnly={isReadonly}
              size={isLarge ? "large" : "default"}
            />
          </Form.Item>
        </Form>
      </div>
    </>
  );
};
