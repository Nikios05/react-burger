import {
  ConstructorElement,
  DragIcon,
} from '@krgaa/react-developer-burger-ui-components';
import { clsx } from 'clsx';
import { useMemo, useRef, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';

import { getCurrentDragIngredient } from '@services/ingredient-info/recuder.ts';
import {
  addIngredient,
  swapIngredients,
} from '@services/selected-ingredients/action.ts';

import type { IngredientExtended } from '@utils/types.ts';

import styles from './selected-ingredient.module.css';

type SelectedIngredientProps = {
  ingredient?: IngredientExtended | null;
  type?: 'top' | 'bottom';
  position?: number;
  isLocked?: boolean;
  deleteHandler?: () => void;
};

export const SelectedIngredient = ({
  ingredient,
  type,
  isLocked,
  deleteHandler,
}: SelectedIngredientProps): React.JSX.Element => {
  const dispatch = useDispatch();
  const ref = useRef<HTMLDivElement | null>(null);
  const [dragStartIndex, setDragStartIndex] = useState<number | null>(null);

  const [{ isDragging }, dragRef] = useDrag({
    type: 'sort',
    item: () => {
      const startIndex = ingredient?.position ?? 0;
      setDragStartIndex(startIndex);

      return {
        ...ingredient,
        startPosition: startIndex,
      };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (item, monitor) => {
      if (!monitor.didDrop()) {
        if (dragStartIndex !== null && item.position !== dragStartIndex) {
          dispatch(swapIngredients(item.position ?? 0, dragStartIndex));
        }
      }

      setDragStartIndex(null);
    },
  });

  const [, dropTarget] = useDrop({
    accept: ['ingredient', 'sort'],
    drop(ingredient: IngredientExtended, monitor) {
      if (monitor.getItemType() === 'sort') {
        return;
      }

      dispatch(addIngredient(ingredient));
    },
    hover: (draggedItem, monitor) => {
      if (monitor.getItemType() === 'ingredient' || draggedItem.type === 'bun') {
        return;
      }

      if (!ref.current) return;

      const dragIndex = draggedItem.position ?? 0;
      const hoverIndex = ingredient?.position ?? 0;

      if (dragIndex === hoverIndex) return;

      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = (clientOffset?.y ?? 0) - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

      dispatch(swapIngredients(dragIndex, hoverIndex));
      draggedItem.position = hoverIndex;
    },
  });

  const currentDragIngredient = useSelector(getCurrentDragIngredient);

  const ingredientName = useMemo(() => {
    const rawName = ingredient?.name ?? '';
    if (type) {
      return type === 'top' ? `${rawName} (верх)` : `${rawName} (низ)`;
    } else {
      return rawName;
    }
  }, [ingredient, type]);

  const highLightPlaceholder = useMemo(() => {
    if (!currentDragIngredient) return false;

    if (type) {
      return currentDragIngredient.type === 'bun';
    } else {
      return currentDragIngredient.type !== 'bun';
    }
  }, [currentDragIngredient, type]);

  dragRef(dropTarget(ref));

  return (
    <div
      className={clsx('pl-8', 'pr-4', styles.selected_ingredient)}
      style={{ opacity: isDragging ? 0 : 1 }}
      ref={ref}
    >
      {!isLocked && ingredient && <DragIcon type="primary" className={styles.icon} />}

      {ingredient ? (
        <ConstructorElement
          isLocked={isLocked}
          price={ingredient.price}
          text={ingredientName}
          thumbnail={ingredient.image}
          handleClose={deleteHandler}
          type={type}
        />
      ) : (
        <div
          className={clsx([
            styles.constructor_element_placeholder,
            highLightPlaceholder && styles.highlight,
            'constructor-element',
            type &&
              (type === 'top'
                ? 'constructor-element_pos_top'
                : 'constructor-element_pos_bottom'),
          ])}
        >
          {type ? 'Выберите булки' : 'Выберите начинку'}
        </div>
      )}
    </div>
  );
};
