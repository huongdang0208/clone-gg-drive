import { Layout, Menu, MenuProps, message, Upload } from "antd";
import React, { Dispatch, SetStateAction, useState } from "react";
import { FolderOutlined, PlusOutlined, LoadingOutlined } from "@ant-design/icons";
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import type { UploadChangeParam } from 'antd/es/upload';

import { Folder } from "../../../types/folder.type";
import styles from "./styles.module.scss";

type Props = {
  setSelectedFolder: Dispatch<SetStateAction<string | undefined>>;
};
type MenuItem = Required<MenuProps>["items"][number];

const { Sider } = Layout;

export const myFolder: Folder[] = [
    {
        id: '1',
        foldername: 'My Storage',
        mimetype: '',
        shared: false,
        copyable: false,
        hasThumbnail: false,
        owner: 'owner',
        hasChildren: true,
        children: [
            {
              id: "123-abc",
              foldername: "Copy Folder 1",
              mimetype: "audio/mpeg",
              hasThumbnail: false,
              shared: false,
              owner: "Thu Huong",
              copyable: false,
            },
            {
              id: "123-abcd",
              foldername: "Copy Folder 2",
              mimetype: "audio/mpeg",
              hasThumbnail: false,
              shared: false,
              owner: "Thu Huong",
              copyable: false,
              hasChildren: true,
              children: [
                {
                  id: "123-abcde",
                  foldername: "Copy Folder 3",
                  mimetype: "audio/mpeg",
                  hasThumbnail: false,
                  shared: false,
                  owner: "Thu Huong",
                  copyable: false,
                  hasChildren: false,
                },
                {
                  id: "123-abcdef",
                  foldername: "Copy Folder 4",
                  mimetype: "audio/mpeg",
                  hasThumbnail: false,
                  shared: false,
                  owner: "Thu Huong",
                  copyable: false,
                  hasChildren: false,
                },
              ],
            },
          ]
    }
];

export const LeftSideBar: React.FC<Props> = ({ setSelectedFolder }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();
  const getItem = (
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[]
  ): MenuItem => {
    return {
      key,
      icon,
      children,
      label,
    } as MenuItem;
  };

  const items: MenuItem[] = myFolder.map((folder: Folder) => {
      return getItem(
        folder.foldername,
        folder.id,
        <FolderOutlined />,
        folder?.children?.map((sub_folder) => {
          if (sub_folder.hasChildren) {
            return getItem(sub_folder.foldername, sub_folder.id, <FolderOutlined />, sub_folder.children?.map((sub) => {
                return getItem(sub.foldername, sub.id, <FolderOutlined />)
            }))
          }
            return getItem(sub_folder.foldername, sub_folder.id, <FolderOutlined />)
        })
      );
  });

  const onSelectFolder = ( key: string) => {
    setSelectedFolder(key)
  };

  const onOpenChange = (openKeys: string[]) => {
    if (openKeys.length > 0) {
        setSelectedFolder(openKeys[0])
    }
  }

  const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  };

  const getBase64 = (img: RcFile, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(img);
  };

  const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as RcFile, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div>Upload</div>
    </div>
  );

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      className={styles.sider}
    >
        <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
        beforeUpload={beforeUpload}
        onChange={handleChange}
      >
        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
      </Upload>
      <Menu
        theme="dark"
        defaultSelectedKeys={["1"]}
        mode="inline"
        items={items}
        onClick={({ key }) => onSelectFolder(key)}
        onOpenChange={(openKeys: string[]) => onOpenChange(openKeys)}
      />
    </Sider>
  );
};
