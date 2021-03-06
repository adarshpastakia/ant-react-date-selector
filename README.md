# React Date Selector


> # DEPRECATED
> ## This repository is moved to [https://github.com/adarshpastakia/ant-extensions](https://github.com/adarshpastakia/ant-extensions)

### React Date Selector for relative dates with DateMath

---

### Install

```shell
npm install ant-react-date-selector
```

---

### Basic Usage

- Component

```tsx
import React, { useState } from "react";
import { Form } from "antd";
import { ReactDateSelector } from "ant-react-date-selector";

export const Tester = () => {
  const [date, setDate] = useState<string | undefined>("$week|$now");

  return (
    <Form layout="inline">
      <Form.Item label="Date Selector">
        <ReactDateSelector value={date} onDateChange={setDate} allowClear />
      </Form.Item>
    </Form>
  );
};
```
> Component uses basic ant.design InputProps
> 
> Props
> - `value`: `string`
> - `onDateChange`: `(date: string) => void`
> - `open`: `boolean`
> - `onVisibleChange`: `(open: boolean) => void`

---

- Util to parse date values and labels

```ts
import { DateUtil } from "ant-react-date-selector";

// Last 7 Days
DateUtil.label("$day-7");

// Last 7 Days ~ Now
DateUtil.label("$day-7|$now");

/**
 * @return [iso_date, iso_date]
 * Return string array of [start, end]
 */
DateUtil.parse("$day-7|$now");

/**
 * @return iso_date
 * Return single date string
 */
DateUtil.parse("$day-7");
```
