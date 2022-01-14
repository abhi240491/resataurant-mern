import React from 'react'

function showErrorMessage(msg) {
    return (
        <div className = 'alert alert-danger' role = 'alert'>
            {msg}
        </div>
    )
}

function showSuccessMessage(msg) {
    return (
        <div className = 'alert alert-success' role = 'alert'>
            {msg}
        </div>
    )
}

export {showErrorMessage, showSuccessMessage}
