import React from "react";
import { Button, Modal } from "react-bootstrap";

const ModalDeleteNotice = ({ show, onHide, noticeId, onConfirm }) => {
    const handleDeleteConfirm = () => {
        // Llama a la función onConfirm que se pasa desde el componente padre (NoticeAll)
        onConfirm(noticeId);
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header className="text-center modalHead">
                <Modal.Title>¿Estás seguro de que deseas eliminar esta noticia?</Modal.Title>
            </Modal.Header>
            <Modal.Body className="d-flex justify-content-center modalBody">
                <Button className="me-5" variant="secondary" onClick={onHide}>
                    Cancelar
            </Button>
            <Button variant="danger" onClick={handleDeleteConfirm}>
                    Eliminar
            </Button>
            </Modal.Body>
        </Modal>
    )
}

export default ModalDeleteNotice;