import { Space } from "antd";
import React from "react";
import { AuthForm } from "../../auth-form";
import styles from './styles.module.scss'
type Props = {};

export const LoginPage: React.FC<Props> = () => {
  return (
    <Space 
    className={styles.body}
      direction="vertical"
      style={{ width: "100%", position: "absolute" }}
    >
        <AuthForm isRegister={false} />
    </Space>
  );
};
