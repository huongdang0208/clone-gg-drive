import { ConfigProvider, Layout, Space } from "antd";
import React, { useEffect, useState } from "react";
import "./App.css";
import { ContentComponent } from "./components/content";
import { HeaderComponent } from "./components/header";
import { LeftSideBar } from "./components/nav/left-side";
import { RightSideBar } from "./components/nav/right-side";

function App() {
  const [selectedFolder, setSelectedFolder] = useState<string>()
  useEffect(() => {
    console.log(selectedFolder)
  }, [selectedFolder, setSelectedFolder])
  return (
    <ConfigProvider theme={{ token: { colorPrimary: "#00b96b" } }}>
      <Space
        direction="vertical"
        style={{ width: "100%", position: "absolute" }}
      >
        <Layout>
          <HeaderComponent />
          <Layout hasSider style={{ backgroundColor: 'rgb(233 232 232)'}}>
            <LeftSideBar setSelectedFolder={setSelectedFolder} />
            <ContentComponent selectedFolder={selectedFolder || ""} />
            <RightSideBar selectedFolder={selectedFolder || ""} />
          </Layout>
        </Layout>
      </Space>
    </ConfigProvider>
  );
}

export default App;
