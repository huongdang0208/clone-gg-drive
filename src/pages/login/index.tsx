import { Space } from "antd";
import React from "react";
import { AuthForm } from "../../auth-form";

type Props = {};

export const LoginPage: React.FC<Props> = () => {
  return (
    <Space
      direction="vertical"
      style={{ width: "100%", position: "absolute" }}
    >
        <AuthForm isRegister={false} />
    </Space>
  );
};