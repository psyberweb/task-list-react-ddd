import React, { ReactNode } from 'react';
import './MainStyle.css';
import HeaderLayout from '../components/layout/header';
import FooterLayout from '../components/layout/footer';
import Menu from '../components/layout/menu';

interface MainPageProps {
  children: ReactNode;
}
  
const MainPage: React.FC<MainPageProps> = ({ children }) => {
  return (
    <div className="App">
      <header className="App-header">
        <HeaderLayout />
      </header >
      <main className="App-main">
        <div className="App-menuLateral">
            <Menu id="lateral"/>
        </div>
        { children }
      </main>
      <footer className="App-footer">
        <FooterLayout />
      </footer>
    </div>
  );
}

export default MainPage;
