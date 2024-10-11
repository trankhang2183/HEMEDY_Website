"use client";
import React, { ReactNode } from "react";
import { Layout, theme } from "antd";
import SliderComponent from "@layout/components/slider/Slider";
import { Footer } from "antd/es/layout/layout";

const { Content } = Layout;

interface Props {
  content: ReactNode;
}

const AdminLayout: React.FC<Props> = (props) => {
  const { content } = props;
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout className="max-h-screen">
      <Layout>
        <SliderComponent />
        <Content
          style={{
            marginTop: "10px",
            marginLeft: "10px",
            marginRight: "10px",
            background: colorBgContainer,
          }}
          className="overflow-y-auto webkit-scrollbar"
        >
          <div className="">{content}</div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
