import { Tab } from '@krgaa/react-developer-burger-ui-components';
import { clsx } from 'clsx';
import { useMemo, useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { IngredientDetails } from '@components/ingredient-details/ingredient-details.tsx';
import { IngredientSection } from '@components/ingredient-section/ingredient-section.tsx';
import { Modal } from '@components/modal/modal.tsx';
import {
  closeIngredientInfo,
  showIngredientInfo,
} from '@services/ingredient-info/action.ts';
import { getShowModalIngredient } from '@services/ingredient-info/recuder.ts';
import { INGREDIENTS_TABS } from '@utils/const.ts';

import type { TIngredient } from '@utils/types';

import styles from './burger-ingredients.module.css';

type TBurgerIngredientsProps = {
  ingredients: TIngredient[];
};

export const BurgerIngredients = ({
  ingredients,
}: TBurgerIngredientsProps): React.JSX.Element => {
  const [currentClosestSection, setCurrentClosestSection] = useState('bun');
  const ingredientsListRef = useRef<HTMLUListElement | null>(null);
  const ingredientSectionRefs = useRef<Map<string, HTMLElement>>(new Map());

  const dispatch = useDispatch();
  const showModalIngredient = useSelector(getShowModalIngredient);

  useEffect(() => {
    ingredientsListRef.current?.addEventListener('scroll', handleScroll);

    return (): void => {
      ingredientsListRef.current?.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScroll = (): void => {
    let minDistance = Infinity;
    let closestSection = 'bun';

    ingredientSectionRefs.current.forEach((element, type) => {
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const distance = Math.abs(rect.top);

      if (distance < minDistance) {
        minDistance = distance;
        closestSection = type;
      }
    });

    setCurrentClosestSection((prev) =>
      prev === closestSection ? prev : closestSection
    );
  };

  const getIngredientNameByType = (type: TIngredient['type']): string => {
    switch (type) {
      case 'bun':
        return 'Булки';
      case 'main':
        return 'Начинка';
      case 'sauce':
        return 'Соусы';
      default:
        return 'Не известный ингредиент';
    }
  };

  const ingredientsByType = useMemo(() => {
    const sortedIngredients: Record<TIngredient['type'], TIngredient[]> = {};

    ingredients.forEach((ingredient) => {
      if (!sortedIngredients[ingredient.type]) {
        sortedIngredients[ingredient.type] = [];
      }

      sortedIngredients[ingredient.type].push(ingredient);
    });

    return Object.entries(sortedIngredients).map(([type, ingredients]) => ({
      type,
      title: getIngredientNameByType(type),
      ingredients,
    }));
  }, [ingredients]);

  return (
    <section className={styles.burger_ingredients}>
      <nav>
        <ul className={styles.menu}>
          {INGREDIENTS_TABS.map((tab) => (
            <li key={tab.value}>
              <Tab
                value={tab.value}
                active={currentClosestSection === tab.value}
                onClick={() => {
                  ingredientSectionRefs.current
                    .get(tab.value)
                    ?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                {tab.label}
              </Tab>
            </li>
          ))}
        </ul>
      </nav>

      {showModalIngredient && (
        <Modal
          title="Детали ингредиента"
          onClose={() => {
            dispatch(closeIngredientInfo());
          }}
        >
          <IngredientDetails />
        </Modal>
      )}

      <ul className={clsx([styles.wrapper, 'custom-scroll'])} ref={ingredientsListRef}>
        {ingredientsByType.map((item, index) => {
          return (
            <li
              key={`${item.title}_${index}`}
              ref={(el) => {
                if (el) {
                  ingredientSectionRefs.current.set(item.type, el);
                } else {
                  ingredientSectionRefs.current.delete(item.type);
                }
              }}
            >
              <IngredientSection
                title={item.title}
                ingredients={item.ingredients}
                onClick={(ingredient) => {
                  dispatch(showIngredientInfo(ingredient));
                }}
              />
            </li>
          );
        })}
      </ul>
    </section>
  );
};
