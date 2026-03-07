import { Button } from '@krgaa/react-developer-burger-ui-components';
import { clsx } from 'clsx';
import { useMemo, useState } from 'react';

import { Modal } from '@components/modal/modal.tsx';
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

  /* Моковый список выбранных ингредиентов */
  const selectedIngredients: TIngredient[] = useMemo(() => {
    return ingredients.filter((ingredient) => ingredient.type !== 'bun');
  }, ingredients);
  /* Моковый выбор булочки */
  const selectedBun: TIngredient | undefined = useMemo(() => {
    return ingredients.find((ingredient) => ingredient.type === 'bun');
  }, ingredients);

  return (
    <section className={styles.burger_constructor}>
      <div className={styles.selected_ingredient_list}>
        <SelectedIngredient
          ingredient={{ ...selectedBun!, name: `${selectedBun?.name} (верх)` }}
          type="top"
          isLocked
        />

        <ul
          className={clsx(
            styles.selected_ingredient_list,
            styles.wrapper,
            'custom-scroll'
          )}
        >
          {selectedIngredients.map((ingredient) => {
            return (
              <li key={ingredient._id}>
                <SelectedIngredient ingredient={ingredient} />
              </li>
            );
          })}
        </ul>

        <SelectedIngredient
          ingredient={{ ...selectedBun!, name: `${selectedBun?.name} (низ)` }}
          type="bottom"
          isLocked
        />
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

      {showOrderDetails && (
        <Modal onClose={() => setShowOrderDetails(false)}>
          <OrderDetails />
        </Modal>
      )}
    </section>
  );
};
