import { Outlet } from 'react-router-dom';

import { UnAuthHeader } from '@components/unauth-header/un-auth-header.tsx';

import styles from './unauth-wrapper-page.module.css';

export const UnAuthWrapperPage = (): React.JSX.Element => {
  return (
    <div className={styles.wrapper}>
      <UnAuthHeader />

      <div className={styles.page_content}>
        <Outlet />
      </div>
    </div>
  );
};
