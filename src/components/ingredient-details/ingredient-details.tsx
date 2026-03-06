import { Modal } from '@components/modal/modal.tsx';

import type { TIngredient } from '@utils/types.ts';

import styles from './ingredient-details.module.css';

type IngredientDetailsProps = {
  ingredient: TIngredient;
  onClose: () => void;
};

export const IngredientDetails = ({
  ingredient,
  onClose,
}: IngredientDetailsProps): React.JSX.Element => {
  return (
    <Modal title="Детали ингредиента" onClose={onClose}>
      <div className={styles.ingredient_details}>
        <div className={styles.ingredient_image}>
          <img src={ingredient.image_large} alt="ingredient-image" />
        </div>

        <h4 className="text text_type_main-medium mb-8">{ingredient.name}</h4>

        <ul className={styles.macronutrients_list}>
          <li className={styles.macronutrients_item}>
            <span className="text text_type_main-default">Калории,ккал</span>
            <span className="text text_type_digits-default">{ingredient.calories}</span>
          </li>
          <li className={styles.macronutrients_item}>
            <span className="text text_type_main-default">Белки, г</span>
            <span className="text text_type_digits-default">{ingredient.proteins}</span>
          </li>
          <li className={styles.macronutrients_item}>
            <span className="text text_type_main-default">Жиры, г</span>
            <span className="text text_type_digits-default">{ingredient.fat}</span>
          </li>
          <li className={styles.macronutrients_item}>
            <span className="text text_type_main-default">Углеводы, г</span>
            <span className="text text_type_digits-default">
              {ingredient.carbohydrates}
            </span>
          </li>
        </ul>
      </div>
    </Modal>
  );
};
