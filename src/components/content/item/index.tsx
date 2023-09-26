import { Button, Card, Space } from "antd";
import React from "react";
import { FolderOutlined, MoreOutlined } from "@ant-design/icons";

import styles from './styles.module.scss'

type Props = {
  selectedFolder: string;
};
export const Item: React.FC<Props> = ({ selectedFolder }) => {
  return (
    <Card className={styles.card}>
      <Space color="success" className={styles.space}>
        <span>
            <FolderOutlined />
            {selectedFolder}
        </span>
        <span>
            <Button icon={<MoreOutlined />}></Button>
        </span>
      </Space>
    </Card>
  );
};
