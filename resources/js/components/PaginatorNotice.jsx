import React from "react";

const paginatorNotice = ({ paginationMeta, handlePageChange }) => {
    if (!paginationMeta || !paginationMeta.links) return null;

    const { current_page, last_page } = paginationMeta;

    const maxPagesToShow = 5; // Define cuántas páginas quieres mostrar en el rango central
    let startPage = Math.max(1, current_page - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(last_page, startPage + maxPagesToShow - 1);

    if (endPage - startPage + 1 < maxPagesToShow) {
        startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    const pageNumbers = [];
    for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
    }

    return(
        <nav>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', paddingBottom: '20px' }}>
                {/* Botón "Anterior" */}
                <li style={{ margin: '0 5px' }}>
                    <button
                        onClick={() => handlePageChange(paginationMeta.prev_page_url)}
                        disabled={!paginationMeta.prev_page_url}
                        style={{
                            border: '1px', padding: '8px 12px', borderRadius: '10px',
                            backgroundColor:'#468EBB',
                            cursor: paginationMeta.prev_page_url ? 'pointer' : 'not-allowed'
                        }}
                    >
                        &laquo;
                    </button>
                </li>
                
                {/* Números de página en el rango */}
                {pageNumbers.map((pageNumber) => (
                    <li key={pageNumber} style={{ margin: '0 5px' }}>
                        <button
                            onClick={() => handlePageChange(paginationMeta.links.find(link => parseInt(link.label) === pageNumber)?.url)}
                            style={{
                                fontWeight: current_page === pageNumber ? 'bold' : 'normal',
                                backgroundColor: current_page === pageNumber ? '	#30A1E5' : '#468EBB',
                                border: '1px', padding: '8px 12px', borderRadius: '10px',
                                cursor: 'pointer'
                            }}
                        >
                            {pageNumber}
                        </button>
                    </li>
                ))}

                {/* Botón "Siguiente" */}
                <li style={{ margin: '0 5px' }}>
                    <button
                        onClick={() => handlePageChange(paginationMeta.next_page_url)}
                        disabled={!paginationMeta.next_page_url}
                        style={{
                            border: '1px', padding: '8px 12px', borderRadius: '10px',
                            backgroundColor:'#468EBB',
                            cursor: paginationMeta.next_page_url ? 'pointer' : 'not-allowed'
                        }}
                    >
                         &raquo;
                    </button>
                </li>
            </ul>
        </nav>
    )
}

export default paginatorNotice