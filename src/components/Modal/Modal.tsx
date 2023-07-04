import { useCallback } from 'react';
import { useAppDispatch } from '../../store/hooks/useAppDispatch';
import { useAppSelector } from '../../store/hooks/useAppSelector';
import { closeModal as closeModalDispatch } from '../../store/features/modal/modalSlice';
import styles from './Modal.module.scss';

export function Modal() {
    const { isOpen, content } = useAppSelector((state) => state.modal);
    const dispatch = useAppDispatch();

    const closeModal = useCallback(() => {
        dispatch(closeModalDispatch());
    }, [dispatch]);

    return (
        <div
            className={styles.backdrop}
            onClick={closeModal}
            style={{
                display: isOpen ? 'flex' : 'none',
            }}
        >
            <dialog open={isOpen} className={`modal-content ${styles.modal}`}>
                <div className="modal-header">
                    <a href="#" className={styles.close} onClick={closeModal}>
                        Close
                    </a>
                </div>
                <div className={`modal-body ${styles.textGradient}`}>
                    {content}
                </div>
            </dialog>
        </div>
    );
}
