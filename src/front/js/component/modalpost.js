import React, { useEffect, useState } from "react";
import "../../styles/muro.css";

const ModalPost = () => {
    return (
        <div className="d-flex justify-content-end mt-3">
            <div
                className="modal fade"
                id="exampleModal"
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div id="PostModal" className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Nueva publicación</h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="message-text" className="col-form-label">
                                        ¿Listo para jugar?:
                                    </label>
                                    <textarea className="form-control" id="TextoPost"></textarea>
                                    <label className="mt-4" for="fileInput">Selecciona una imagen para subir:</label>
                                    <input type="file" id="fileInput" name="image" accept="image/*" required></input>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button
                                id="Cerrar"
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Cerrar
                            </button>
                            <button id="Publicar" type="button" className="btn btn-primary">
                                Publicar
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ModalPost;