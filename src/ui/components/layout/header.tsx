import React from "react";
import Menu from "./menu";
import AuthLink from "../auth/AuthLink";
import { useAuth } from "../../AuthContext";

const HeaderLayout: React.FC = () => {
  const { token, user } = useAuth();
  const nome = user?.name;

  return (
    <>
      <h1>Task List</h1>
      <Menu id="header" />
      {token && <span>Usuário logado {nome}</span>}
      <AuthLink />
    </>
  );
};

export default HeaderLayout;
