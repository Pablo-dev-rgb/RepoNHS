import React from 'react';
import { Button, Modal } from 'react-bootstrap';

function ModalTask({ show, onHide, taskData }) {
  return (
    <Modal show={show} onHide={onHide} centered>
        <Modal.Header closeButton>
            <Modal.Title>{taskData ? `Tarea: ${taskData.name}` : 'Detalle de Tarea'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {taskData ? (
            <>
                <p>Descripción: {taskData.description}</p>
                <p style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Completado: {taskData.completed ? 'Sí' : 'No'}</span>
                    <span>Asignado en: {new Date(taskData.created_at).toLocaleDateString()}</span>
                </p>
            </>
            ) : (
            <p>No se cargaron datos de la tarea.</p>
            )}
        </Modal.Body>
    </Modal>
  );
}
export default ModalTask;