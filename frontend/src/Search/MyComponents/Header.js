import React, { Component } from 'react';
import logo from './simplifyVms.png'; 
export default class Header extends Component {

    render() {
        let mystyle ={
            padding:"10px",
        }
        let mylogo ={
            height : "40px",
        }
        return (
            <div style = {mystyle}>
                <nav className="navbar navbar-expand navbar-light bg-light">
                    <a href="https://simplifyvms.com/" className="navbar-brand">
                        <img alt="logo" className="photo" src={logo} style = {mylogo}/>
                    </a>
                </nav>
            </div>
        );
    }
}