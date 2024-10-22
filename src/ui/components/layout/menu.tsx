import React from "react";
import { useAuth } from '../../AuthContext';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { BrowserRouter as Router, Link } from "react-router-dom";

interface MenuNode {
  id: string;
  parent: string;
  icon: string;
  label: string;
  path: string;
  visible: boolean;
  requireAuth: boolean;
  roles: string[];
}

interface MenuProps {
  id: string;
}

const Menu: React.FC<MenuProps> = ({ id }) => {
  const { token } = useAuth();
  const menus = [
    {
      id: "header",
      nodes: [
        {
          id: "home",
          parent: "",
          icon: "",
          label: "Home",
          path: "/",
          visible: true,
          requireAuth: false,
          roles: [],
        },
        {
          id: "users",
          parent: "",
          icon: "",
          label: "Users",
          path: "/users",
          visible: true,
          requireAuth: true,
          roles: [],
        },
        {
          id: "tasks",
          parent: "",
          icon: "",
          label: "Tasks",
          path: "/tasks",
          visible: true,
          requireAuth: true,
          roles: [],
        }
      ],
    },
    {
      id: "lateral",
      nodes: [
        {
          id: "home",
          parent: "",
          icon: "",
          label: "Home",
          path: "/",
          visible: true,
          requireAuth: false,
          roles: [],
        },
        {
          id: "users",
          parent: "home",
          icon: "",
          label: "Users",
          path: "/users",
          visible: true,
          requireAuth: true,
          roles: [],
        },
        {
          id: "tasks",
          parent: "home",
          icon: "",
          label: "Tasks",
          path: "/tasks",
          visible: true,
          requireAuth: true,
          roles: [],
        },
      ],
    },
    {
      id: "footer",
      nodes: [
        {
          id: "home",
          parent: "",
          icon: "",
          label: "Home",
          path: "/",
          visible: true,
          requireAuth: false,
          roles: [],
        },
        {
          id: "users",
          parent: "home",
          icon: "",
          label: "Users",
          path: "/users",
          visible: true,
          requireAuth: true,
          roles: [],
        },
        {
          id: "tasks",
          parent: "",
          icon: "",
          label: "Tasks",
          path: "/tasks",
          visible: true,
          requireAuth: true,
          roles: [],
        },
      ],
    },
  ];
  const menu = menus.find((menu) => menu.id === id);

  const renderMenuNodes = (nodes: MenuNode[], parentId: string = "") => {
    return (
      <ul>
        {nodes
          .filter((node) => node.visible && node.parent === parentId)
          .map((node) => (
            node.requireAuth && !token ? null : (
            
            <li key={node.id}>
              <Link to={node.path}>
                {node.icon && (
                  <img src={node.icon} alt={`${node.label} icon`} />
                )}
                {node.label}
              </Link>
              {renderMenuNodes(nodes, node.id)}
            </li>
            )
          ))}
      </ul>
    );
  };

  return <nav>{menu && renderMenuNodes(menu.nodes)}</nav>;
};

export default Menu;
