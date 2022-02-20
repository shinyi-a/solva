import HeaderContent from "./header";
import FooterContent from "./footer";
import NavBar from "./navbar";
import { Layout } from "antd";

// import "tailwindcss/tailwind.css";

const LayoutContent = ({ children }) => {
  const { Header, Content, Footer, Sider } = Layout;

  if (children.type.name === "Home") {
    return <div>{children}</div>;
  } else {
    return (
      <Layout>
        <Header className="header">
          <HeaderContent />
        </Header>
        <Layout>
          <Sider
            width={256}
            className="site-layout-background"
            defaultSelectedKeys={["1"]}
          >
            <NavBar />
          </Sider>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            {children}
          </Content>
        </Layout>
        <Footer>
          <FooterContent />
        </Footer>
      </Layout>
    );

    // return (
    //   <>
    //     <HeaderContent />
    //     <NavBar />
    //     <div>{children}</div>
    //     <FooterContent />
    //   </>
    // );
  }
};

export default LayoutContent;
