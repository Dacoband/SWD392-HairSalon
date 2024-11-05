import Header from "../components/Header";
import Footer from "../components/Footer";
import { Layout } from "antd";

import { Outlet } from "react-router-dom";
const { Content } = Layout;
const LayoutMain: React.FC = () => {
  return (
    <Layout className="overflow-hidden h-screen flex flex-col">
      <Header />
      <Content className={`transition-all duration-300 overflow-auto `}>
        <div className="flex flex-col min-h-screen">
          <div className="flex-1 overflow-auto">
            <Outlet />
            
          </div>
          <Footer />
        </div>
      </Content>
    </Layout>
  );
};

export default LayoutMain;
