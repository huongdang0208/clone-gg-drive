import { Button, Card, Menu, MenuProps, Popover, Space } from "antd";
import React, { useMemo, useState } from "react";
import {
  FolderOutlined,
  MoreOutlined,
  FullscreenOutlined,
  DownloadOutlined,
  EditOutlined,
  ShareAltOutlined,
  SortAscendingOutlined,
  InfoCircleOutlined,
  CopyOutlined,
  SwapOutlined,
  StarOutlined,
  HistoryOutlined,
  PlusOutlined
} from "@ant-design/icons";

import styles from "./styles.module.scss";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

type Props = {
  selectedFolder: string;
};
export const Item: React.FC<Props> = ({ selectedFolder }) => {
  const [showArrow, setShowArrow] = useState(true);
  const [arrowAtCenter, setArrowAtCenter] = useState(false);
  const [openKeys, setOpenKeys] = useState(["sub1"]);

  const rootSubmenuKeys = ["sub1", "sub2", "sub4"];

  const onOpenChange: MenuProps["onOpenChange"] = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (latestOpenKey && rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  const text = <span>Title</span>;
  const items: MenuItem[] = [
    getItem("Open with", "openWith", <FullscreenOutlined />, [
      getItem("Connect to other applications", "connect", <PlusOutlined />),
    ]),
    getItem("Download", "download", <DownloadOutlined />),
    getItem("Rename", "rename", <EditOutlined />),
    getItem("Share", "share", <ShareAltOutlined />, [
      getItem("Share", "shareItem", <ShareAltOutlined />),
      getItem("Copy URL", "copyURL", <CopyOutlined />),
    ]),
    getItem("Arrange", "arrange", <SortAscendingOutlined />, [
      getItem("Move to", "move", <SwapOutlined />),
      getItem("Remark", "remark", <StarOutlined />),
    ]),
    getItem("Information", "info", <InfoCircleOutlined />, [
      getItem("Detail", "detail", <InfoCircleOutlined />),
      getItem("History", "history", <HistoryOutlined />),
    ]),
  ];
  const content = (
    <div>
      <Menu
        mode="inline"
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        style={{ width: 256 }}
        items={items}
      />
    </div>
  );

  const mergedArrow = useMemo(() => {
    if (arrowAtCenter) return { pointAtCenter: true };
    return showArrow;
  }, [showArrow, arrowAtCenter]);
  return (
    <Card className={styles.card}>
      <Space color="success" className={styles.space}>
        <span>
          <FolderOutlined />
          {selectedFolder}
        </span>
        <span>
          <Popover
            placement="bottom"
            trigger="click"
            title={text}
            content={content}
            arrow={mergedArrow}
          >
            <Button icon={<MoreOutlined />}></Button>
          </Popover>
        </span>
      </Space>
    </Card>
  );
};
