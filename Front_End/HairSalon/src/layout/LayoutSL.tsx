import { Layout } from "antd";

import { Outlet } from "react-router-dom";
import HeaderSM from "../pages/StaffManager/HeaderSM";
import HeaderSL from "../pages/StaffStylish/HeaderSL";
const { Content } = Layout;
const LayoutSL: React.FC = () => {
  return (
    <Layout className="overflow-hidden h-screen flex flex-col">
      <HeaderSL/>
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

export default LayoutSL;
