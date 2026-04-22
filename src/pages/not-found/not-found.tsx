import { Logo } from '@krgaa/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';

import styles from './not-found.module.css';

export const NotFoundPage = (): React.JSX.Element => {
  return (
    <section className={styles.not_found}>
      <Link to="/">
        <Logo />
      </Link>
      <h2 className="text text_type_main-medium">Страница не найдена</h2>
    </section>
  );
};
