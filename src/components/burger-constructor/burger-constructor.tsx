import { Button } from '@krgaa/react-developer-burger-ui-components';
import { clsx } from 'clsx';
import { useState } from 'react';

import { OrderDetails } from '@components/order-details/order-details.tsx';
import { Price } from '@components/price/price.tsx';
import { SelectedIngredient } from '@components/selected-ingredient/selected-ingredient.tsx';

import type { TIngredient } from '@utils/types';

import styles from './burger-constructor.module.css';

type TBurgerConstructorProps = {
  ingredients: TIngredient[];
};

export const BurgerConstructor = ({
  ingredients,
}: TBurgerConstructorProps): React.JSX.Element => {
  const [showOrderDetails, setShowOrderDetails] = useState(false);

  return (
    <section className={styles.burger_constructor}>
      <div className={styles.selected_ingredient_list}>
        <SelectedIngredient ingredient={ingredients[0]} type="top" isLocked />

        <ul
          className={clsx(
            styles.selected_ingredient_list,
            styles.wrapper,
            'custom-scroll'
          )}
        >
          {ingredients.map((ingredient) => {
            return (
              <li key={ingredient._id}>
                <SelectedIngredient ingredient={ingredient} />
              </li>
            );
          })}
        </ul>

        <SelectedIngredient ingredient={ingredients[0]} type="bottom" isLocked />
      </div>

      <div className={clsx(styles.controls, 'pl-4 pr-4')}>
        <Price price={610} size="medium" />
        <Button
          size="large"
          type="primary"
          htmlType="button"
          onClick={() => setShowOrderDetails(true)}
        >
          Оформить заказ
        </Button>
      </div>

      {showOrderDetails && <OrderDetails onClose={() => setShowOrderDetails(false)} />}
    </section>
  );
};
