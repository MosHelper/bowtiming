const moment = require('moment');
import { Col, InputNumber, Row, TimePicker } from 'antd'
import { List } from 'antd';
import Head from 'next/head'
import { useState } from 'react';
import {
  FieldTimeOutlined,
  SwapRightOutlined,
  UserSwitchOutlined
} from '@ant-design/icons';

export default function Home() {
  const format = 'HH:mm';
  const [startTime, setStartTime] = useState('');
  const [employee, setEmployee] = useState('');

  const handleEmp = (emp) => {
    const arrEmp = [];
    for (let i = 1; i <= emp; i++) {
      arrEmp.push(i);
    }
    setEmployee(arrEmp);
  }

  const renderT = (m, i) => {
    const sTime1 = moment(startTime.format(format), format);
    const sTime2 = moment(startTime.format(format), format);
    const mm1 = (i - 1) * m;
    const mm2 = i * m;
    return sTime1.add(mm1, 'minutes').format(format) + '-' + sTime2.add(mm2, 'minutes').format(format);
  }

  const renderTitle = (min, emp) => {
    const sTime = moment(startTime.format(format), format);
    const mm = emp.length * min;
    return sTime.add(mm, 'minutes').format(format);
  }

  const renderList = (min) => {
    return (startTime !== '' && employee !== '')
      ? (
        <Col key={min}>
          <List
            bordered
            header={<h2><FieldTimeOutlined />{min}น.<SwapRightOutlined />{renderTitle(min, employee)}</h2>}
            dataSource={employee}
            renderItem={(i) => (
              <List.Item key={i}>{renderT(min, i)}</List.Item>
            )}
          />
        </Col>
      )
      : <div key={min}></div>
  }

  return (
    <div>
      <Head>
        <title>BowTiming - แบ่งช่วงเวลาทำงาน</title>
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content="BowTiming - แบ่งช่วงเวลาทำงาน" />
      </Head>

      <main>
        <div id="params">
          <span className="brand">BowTiming</span>
          <UserSwitchOutlined className="userIcon" /><InputNumber onChange={handleEmp} min="1" size="large" />
          <TimePicker format={format} onChange={setStartTime} placeholder="Start At" size="large" />
        </div>

        <Row>
          {[10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60].map(min => renderList(min))}
        </Row>
      </main>
    </div>
  )
}
