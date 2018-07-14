import React from 'react';

export default ({ input, label, meta: {error, touched} }) => {

    const inputStyle = {
        width: '70%',
        float: 'right',
        border: '0',
        borderBottom: '1px solid lightgray',
        padding: '12px',
        margin: '10px',
        fontSize: '18px',
        resize: 'both'
    }

    const labelStyle = {
        width: '20%',
        float: 'left',
        textAlign: 'right',
        marginTop: '20px'
    }

    const clearStyle = {
        content: '',
        display: 'table',
        clear: 'both'
    }

    return(
        <div>
            <label style={labelStyle}>
                {label}
            </label>
            <input style={Object.assign(inputStyle)} {...input}  />
            {touched && error}
            <span style={clearStyle}></span>
        </div>
    );
};