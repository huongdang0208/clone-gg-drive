import { Layout, Space } from "antd";
import React, { useState } from "react";
import { ContentComponent } from "../../components/content";
import { HeaderComponent } from "../../components/header";
import { LeftSideBar } from "../../components/nav/left-side";
import { RightSideBar } from "../../components/nav/right-side";
import { Folder } from "../../types/folder.type";

type Props = {};

export const HomePage: React.FC<Props> = () => {
  const [selectedFolder, setSelectedFolder] = useState<Folder>();
  return (
    <Space direction="vertical" style={{ width: "100%", position: "absolute" }}>
      <Layout>
        <HeaderComponent />
        <Layout hasSider style={{ backgroundColor: "rgb(233 232 232)" }}>
          <LeftSideBar setSelectedFolder={setSelectedFolder || undefined} />
          <ContentComponent selectedFolder={selectedFolder || undefined} />
          <RightSideBar selectedFolder={selectedFolder || undefined} />
        </Layout>
      </Layout>
    </Space>
  );
};
