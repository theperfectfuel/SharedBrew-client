import React from 'react';

export default ({ input, label, meta: {error, touched} }) => {

    const inputStyle = {
        width: '90%',
        float: 'right',
        border: '1px solid lightgray',
        //borderBottom: '1px solid lightgray',
        padding: '12px',
        margin: '10px',
        fontSize: '18px',
        resize: 'vertical',
        minHeight: '250px'
    }

    const labelStyle = {
        width: '50%',
        float: 'left',
        textAlign: 'left',
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
            </label><br />
            <textarea style={Object.assign(inputStyle)} {...input}  />
            {touched && error}
            <span style={clearStyle}></span>
        </div>
    );
};