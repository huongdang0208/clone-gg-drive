import { Col, Input, Layout, Row, Space, Typography } from "antd";
import {
  CloudServerOutlined,
  SearchOutlined,
  SettingOutlined,
  MoreOutlined
} from "@ant-design/icons";
import React from "react";

import styles from "./styles.module.scss";

type Props = {};

const { Header } = Layout;

export const HeaderComponent: React.FC<Props> = () => {
  return (
    <Header className={styles.header}>
      <Row>
        <Col span={8} className={styles.col}>
          <CloudServerOutlined
            style={{ fontSize: "2rem", color: "#fffff", marginRight: "0.5rem" }}
          />
          <Typography.Title>My Storage</Typography.Title>
        </Col>
        <Col span={8} className={styles.col}>
          <Input
            size="large"
            placeholder="Search in storage"
            prefix={<SearchOutlined />}
            addonAfter={<MoreOutlined />}
          />
        </Col>
        <Col span={8}>
          <Space className={styles.space}>
            <SettingOutlined style={{ fontSize: "1.5rem", color: "#fffff" }} />
          </Space>
        </Col>
      </Row>
    </Header>
  );
};
