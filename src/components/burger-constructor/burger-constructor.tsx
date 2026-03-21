import { Button } from '@krgaa/react-developer-burger-ui-components';
import { clsx } from 'clsx';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Modal } from '@components/modal/modal.tsx';
import { OrderDetails } from '@components/order-details/order-details.tsx';
import { Price } from '@components/price/price.tsx';
import { SelectedIngredient } from '@components/selected-ingredient/selected-ingredient.tsx';
import { useSendOrderMutation } from '@services/orders/api.ts';
import {
  clearIngredients,
  deleteIngredient,
} from '@services/selected-ingredients/action.ts';
import {
  getOrderPrice,
  getSelectedBun,
  getSelectedIngredients,
} from '@services/selected-ingredients/recuder.ts';

import styles from './burger-constructor.module.css';

export const BurgerConstructor = (): React.JSX.Element => {
  const dispatch = useDispatch();
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [orderNumber, setOrderNumber] = useState<number | null>(null);

  const [sendOrder] = useSendOrderMutation();

  const selectedIngredients = useSelector(getSelectedIngredients);
  const selectedBun = useSelector(getSelectedBun);
  const orderPrice = useSelector(getOrderPrice);

  const orderSendHandler = (): void => {
    if (!selectedBun) {
      return;
    }

    const selectedIngredientsIds = selectedIngredients.map(({ _id }) => _id);
    const selectedBunId = selectedBun._id;

    sendOrder([selectedBunId, ...selectedIngredientsIds, selectedBunId])
      .then((res) => {
        const orderNumber = res.data?.order.number;

        if (orderNumber) {
          setOrderNumber(orderNumber);
          setShowOrderDetails(true);
          dispatch(clearIngredients());
        }
      })
      .catch((err) => {
        console.error('Failed to send order:', err);
      });
  };

  const deleteIngredientHandler = (id: string): void => {
    dispatch(deleteIngredient(id));
  };

  return (
    <section className={styles.burger_constructor}>
      <div className={styles.selected_ingredient_list}>
        <SelectedIngredient ingredient={selectedBun} type="top" isLocked />

        <ul
          className={clsx(
            styles.selected_ingredient_list,
            styles.wrapper,
            'custom-scroll'
          )}
        >
          {selectedIngredients.length > 0 ? (
            selectedIngredients.map((ingredient) => {
              return (
                <li key={ingredient.innerId}>
                  <SelectedIngredient
                    ingredient={ingredient}
                    deleteHandler={() => deleteIngredientHandler(ingredient.innerId)}
                  />
                </li>
              );
            })
          ) : (
            <SelectedIngredient />
          )}
        </ul>

        <SelectedIngredient ingredient={selectedBun} type="bottom" isLocked />
      </div>

      <div className={clsx(styles.controls, 'pl-4 pr-4')}>
        <Price price={orderPrice} size="medium" />
        <Button
          size="large"
          type="primary"
          htmlType="button"
          onClick={orderSendHandler}
          disabled={!selectedBun}
        >
          Оформить заказ
        </Button>
      </div>

      {showOrderDetails && orderNumber && (
        <Modal onClose={() => setShowOrderDetails(false)}>
          <OrderDetails orderNumber={orderNumber} />
        </Modal>
      )}
    </section>
  );
};
