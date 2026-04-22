import { Outlet } from 'react-router-dom';

import { AppHeader } from '@components/app-header/app-header.tsx';

import styles from './wrapper-page.module.css';

export const WrapperPage = (): React.JSX.Element => {
  return (
    <div className={styles.wrapper}>
      <AppHeader />

      <div className={styles.page_content}>
        <Outlet />
      </div>
    </div>
  );
};
