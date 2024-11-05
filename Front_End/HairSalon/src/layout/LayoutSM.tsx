import { Layout } from "antd";

import { Outlet } from "react-router-dom";
import HeaderSM from "../components/HeaderSM";
const { Content } = Layout;
const LayoutSM: React.FC = () => {
  return (
    <Layout className="overflow-hidden h-screen flex flex-col">
      <HeaderSM />
      <Content className={`transition-all duration-300 overflow-auto `}>
        <div className="flex flex-col min-h-screen">
          {/* <div className="flex-1 overflow-auto"> */}
          <Outlet />
        </div>
        {/* </div> */}
      </Content>
    </Layout>
  );
};

export default LayoutSM;
