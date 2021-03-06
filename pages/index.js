const moment = require('moment');
import { Button, Col, InputNumber, notification, Row, TimePicker } from 'antd'
import { List } from 'antd';
import Head from 'next/head'
import { useState } from 'react';
import {
  FieldTimeOutlined,
  SwapRightOutlined,
  UserSwitchOutlined,
  CopyOutlined,
  CheckCircleOutlined,
  PlusCircleOutlined
} from '@ant-design/icons';
import copy from "copy-to-clipboard";

export default function Home() {
  const format = 'HH:mm';
  const [startTime, setStartTime] = useState('');
  const [employee, setEmployee] = useState('');
  const [forstep, setForstep] = useState([])
  const [step, setStep] = useState(5)

  const handleEmp = (emp) => {
    const arrEmp = [];
    for (let i = 1; i <= emp; i++) {
      arrEmp.push(i);
    }
    setEmployee(arrEmp);
    handleStep(step);
  }

  const handleStep = (step) => {
    const forStep = []
    for (let i = 0; i <= 60; i += step) {
      forStep.push(i)
    }
    setStep(step)
    setForstep(forStep)
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

  const copyToClipboard = (min) => {
    const val = textareaVal(min);
    copy(val, { format: 'text/plain' });
    notification.open({
      message: 'Copied!',
      description: (<h2><FieldTimeOutlined />{min}น.<SwapRightOutlined />{renderTitle(min, employee)}</h2>),
      icon: <CheckCircleOutlined style={{ color: '#009688' }} />,
    });
  }

  const textareaVal = (min) => {
    let str = "";
    for (let index = 1; index <= employee.length; index++) {
      str += renderT(min, index) + "\n";
    }
    return str;
  }

  const renderList = (min) => {
    return (startTime !== '' && employee !== '')
      ? (
        <Col key={min}>
          <List
            bordered
            header={<h2><FieldTimeOutlined />{min}น.<SwapRightOutlined />{renderTitle(min, employee)}</h2>}
            footer={<Button type="primary" shape="round" icon={<CopyOutlined />} onClick={e => copyToClipboard(min)} block size="large">Copy</Button>}
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
        <meta property="og:image" content="https://bowtiming.vercel.app/bg.png" />

      </Head>

      <main>
        <div id="params">
          <span className="brand">BowTiming</span>
          <UserSwitchOutlined className="userIcon" /><InputNumber onChange={handleEmp} min="1" size="large" />
          <TimePicker format={format} onChange={setStartTime} placeholder="Start At" size="large" />
          <div style={{ marginLeft: 20, 'color': 'white' }}><PlusCircleOutlined /> เพิ่มทีละ <InputNumber onChange={handleStep} defaultValue={step} placeholder="Step" min="1" size="large" /> นาที</div>
        </div>

        <Row>
          {forstep.map(min => renderList(min))}
        </Row>
      </main>
    </div>
  )
}
