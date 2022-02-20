import Link from "next/link";
import { Menu, Button } from "antd";
import {
  AppstoreOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  MailOutlined,
} from "@ant-design/icons";
const NavBar = () => {
  return (
    <div style={{ width: 256 }}>
      <Menu
        defaultSelectedKeys={["1"]}
        mode="inline"
        theme="dark"
        style={{ height: "100%", borderRight: 0 }}
      >
        <Link href="/all">
          <a>
            <Menu.Item key="1" icon={<PieChartOutlined />}>
              All HDB Blocks
            </Menu.Item>
          </a>
        </Link>
        <Link href="/pending">
          <a>
            <Menu.Item key="2" icon={<DesktopOutlined />}>
              Pending
            </Menu.Item>
          </a>
        </Link>
        <Link href="/construction">
          <a>
            <Menu.Item key="4" icon={<ContainerOutlined />}>
              Under Construction
            </Menu.Item>
          </a>
        </Link>
        <Link href="/TnC">
          <a>
            <Menu.Item key="5" icon={<ContainerOutlined />}>
              Testing and Commissioning
            </Menu.Item>
          </a>
        </Link>
        <Link href="/turnon">
          <a>
            <Menu.Item key="6" icon={<ContainerOutlined />}>
              Turned On
            </Menu.Item>
          </a>
        </Link>
      </Menu>
    </div>
  );

  // return (
  //   <ul>
  //     <Link href="/all">
  //       <a>
  //         <li>All HDB Blocks</li>
  //       </a>
  //     </Link>
  //     <Link href="/pending">
  //       <a>
  //         <li>Pending</li>
  //       </a>
  //     </Link>
  //     <Link href="/construction">
  //       <a>
  //         <li>Construction</li>
  //       </a>
  //     </Link>
  //     <Link href="/TnC">
  //       <a>
  //         <li>Testing and Commissioning</li>
  //       </a>
  //     </Link>
  //     <Link href="/turnon">
  //       <a>
  //         <li>Turned On</li>
  //       </a>
  //     </Link>
  //   </ul>
  // );
};

export default NavBar;
