import React from "react";
import { Button, Modal } from "react-bootstrap";

const ModalDeleteNotice = ({ show, onHide, noticeId, onConfirm }) => {
    const handleDeleteConfirm = () => {
        // Llama a la función onConfirm que se pasa desde el componente padre (NoticeAll)
        onConfirm(noticeId);
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Confirmar Eliminación</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                ¿Estás seguro de que deseas eliminar esta noticia? Esta acción no se puede deshacer.
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Cancelar
                </Button>
                <Button variant="danger" onClick={handleDeleteConfirm}>
                    Eliminar
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalDeleteNotice;