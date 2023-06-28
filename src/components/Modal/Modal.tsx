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
            <dialog open={isOpen} className="modal-content">
                <div className="modal-header">
                    <button
                        type="button"
                        className="btn-close"
                        aria-label="Close"
                        onClick={closeModal}
                    />
                </div>
                <div className="modal-body">{content}</div>
            </dialog>
        </div>
    );
}

<div className="modal-dialog">
    <div className="modal-content">
        <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
                Modal title
            </h1>
            <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
            ></button>
        </div>
        <div className="modal-body">...</div>
        <div className="modal-footer">
            <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
            >
                Close
            </button>
            <button type="button" className="btn btn-primary">
                Save changes
            </button>
        </div>
    </div>
</div>;
