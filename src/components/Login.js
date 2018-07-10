import React from 'react';

const divStyle = {
    maxWidth: '600px',
    textAlign: 'center',
    margin: '0 auto'
}

function Login() {
    return(
        <div style={divStyle}>
            <div>LOGIN</div>
            <form action="/auth/google" method='post'>
                <div className="form-group">
                    <label htmlFor="username">User Name:</label>
                    <input type="text" className="form-control" name="username" />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" className="form-control" name="password" />
                </div>
                <button type="submit" className="btn btn-default">Submit</button>
            </form>
        </div>
    )
}

export default Login;