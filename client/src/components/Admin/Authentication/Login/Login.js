import React from 'react'

export default function Login() {
    return (
        <div>
            <div className="unix-login">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-lg-offset-3">
                            <div className="login-content">
                                <div className="login-logo">
                                    <a href="index.html"><span>Foodmin</span></a>
                                </div>
                                <div className="login-form">
                                    <h4>Administratior Login</h4>
                                    <form>
                                        <div className="form-group">
                                            <label>Email address</label>
                                            <input type="email" className="form-control" placeholder="Email"/>
                                        </div>
                                        <div className="form-group">
                                            <label>Password</label>
                                            <input type="password" className="form-control" placeholder="Password"/>
                                        </div>
                                        <div className="checkbox">
                                            <label>
                                                <input type="checkbox"/> Remember Me
                                            </label>
                                            <label className="pull-right">
                                                <a href="#">Forgotten Password?</a>
                                            </label>

                                        </div>
                                        <button type="submit" className="btn btn-primary btn-flat m-b-30 m-t-30">Sign in</button>
                                        <div className="social-login-content">
                                            <div className="social-button">
                                                <button type="button" className="btn btn-primary bg-facebook btn-flat btn-addon m-b-10"><i className="ti-facebook"></i>Sign in with facebook</button>
                                                <button type="button" className="btn btn-primary bg-twitter btn-flat btn-addon m-t-10"><i className="ti-twitter"></i>Sign in with twitter</button>
                                            </div>
                                        </div>
                                        <div className="register-link m-t-15 text-center">
                                            <p>Don't have account ? <a href="#"> Sign Up Here</a></p>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
 
        </div>
    )
}
