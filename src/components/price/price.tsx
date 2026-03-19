import { CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';
import { clsx } from 'clsx';

import styles from './price.module.css';

type TPriceProps = {
  price: number;
  size?: 'default' | 'medium';
};

export const Price = ({
  price = 0,
  size = 'default',
}: TPriceProps): React.JSX.Element => {
  const priceValueClasses = clsx(
    'text',
    size === 'medium' ? 'text_type_digits-medium' : 'text_type_digits-default'
  );

  const priceIconClasses = clsx(
    size === 'medium' ? styles.icon_medium : styles.icon_default
  );

  return (
    <div className={styles.price}>
      <span className={priceValueClasses}>{price}</span>
      <CurrencyIcon type="primary" className={priceIconClasses} />
    </div>
  );
};
