import { ComponentPropsWithoutRef, Fragment } from 'react';
import MainHeader from './MainHeader';

export interface LayoutProps extends ComponentPropsWithoutRef<"main">{}

const Layout = (props: LayoutProps) => {
  return (
    <Fragment>
      <MainHeader />
      <main>{props.children}</main>
    </Fragment>
  );
};

export default Layout;
