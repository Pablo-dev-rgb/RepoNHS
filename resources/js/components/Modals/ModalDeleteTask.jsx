import React from "react";
import { Button, Modal } from "react-bootstrap";

const ModalDeleteTask = ({ show, onHide, taskId, onConfirm }) => {
    const handleDeleteConfirm = () => {
        console.log("ID enviado desde el modal:", taskId);
        // Llama a la función onConfirm que se pasa desde el componente padre (NoticeAll)
        onConfirm(taskId);
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header className="text-center modalHead">
                <Modal.Title>¿Estás seguro de que deseas eliminar esta tarea?</Modal.Title>
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

export default ModalDeleteTask;