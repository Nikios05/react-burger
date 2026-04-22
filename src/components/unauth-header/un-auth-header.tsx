import { Logo } from '@krgaa/react-developer-burger-ui-components';

import styles from './unauth-header.module.css';

export const UnAuthHeader = (): React.JSX.Element => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Logo />
      </div>
    </header>
  );
};
