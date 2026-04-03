import { clsx } from 'clsx';

import styles from './order-details.module.css';

type OrderDetailsProps = {
  orderNumber: number;
};

export const OrderDetails = ({ orderNumber }: OrderDetailsProps): React.JSX.Element => {
  return (
    <div className={clsx(styles.order_modal, 'pt-4 pb-15')}>
      <h2 className="text text_type_digits-large mb-8">{orderNumber}</h2>
      <p className="text text_type_main-medium">идентификатор заказа</p>

      <div className="pt-15 pb-15">
        <img src={'src/assets/images/done.png'} alt="done-image" />
      </div>

      <p className="text text_type_main-default mb-2">Ваш заказ начали готовить</p>
      <p className={clsx(styles.order_text_gray, 'text text_type_main-default')}>
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
};
