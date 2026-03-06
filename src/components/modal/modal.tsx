import { CloseIcon } from '@krgaa/react-developer-burger-ui-components';
import { clsx } from 'clsx';
import { useEffect } from 'react';
import ReactDOM from 'react-dom';

import { ModalOverlay } from '@components/modal-overlay/modal-overlay.tsx';

import styles from './modal.module.css';

type ModalProps = {
  title?: string;
  onClose: () => void;
  className?: string;
  children?: React.JSX.Element;
};

export const Modal = ({
  title,
  onClose,
  className,
  children,
}: ModalProps): React.JSX.Element | undefined => {
  const modalRoot = document.getElementById('modals');

  useEffect(() => {
    document.addEventListener('keydown', closeModalByEscape);

    return (): void => {
      document.removeEventListener('keydown', closeModalByEscape);
    };
  }, []);

  const closeModalByEscape = (e: KeyboardEvent): void => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!modalRoot) {
    return undefined;
  }

  return ReactDOM.createPortal(
    <>
      <ModalOverlay onClose={onClose} />

      <section className={clsx(styles.modal, 'pt-10 pr-10 pb-15 pl-10', className)}>
        <header className={styles.modal_header}>
          {title && <h3 className="text text text_type_main-large">{title}</h3>}
          <CloseIcon type="primary" onClick={onClose} className={styles.modal_close} />
        </header>

        {children}
      </section>
    </>,
    modalRoot
  );
};
