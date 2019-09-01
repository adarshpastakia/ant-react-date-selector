import React, { useState } from "react";
import { Form } from "antd";
import { DateUtil, ReactDateSelector } from "../lib";

export const Tester = () => {
  const [date, setDate] = useState<string | undefined>("$week|$now");

  return (
    <>
      <div className="x-section">Component</div>
      <Form layout="inline">
        <Form.Item label="Date Selector">
          <ReactDateSelector value={date} onDateChange={setDate} allowClear />
        </Form.Item>
        <Form.Item label="Actual value">{`${date}`}</Form.Item>
        <Form.Item label="Date value">
          {date ? DateUtil.parse(date)!.toString() : "undefined"}
        </Form.Item>
      </Form>
    </>
  );
};
