import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
// import { user } from '../../pages';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            nama: "",
            birthplace: "",
            birthdate: "",
            address: "",
            role: "",
            password: "",
            repassword: ""
        }
    }

    setValueInput = (value, name) => {
        this.setState({
            [name]: value
        })
    }

    saveReg = () => {
        const { username, nama, birthplace, birthdate, address, 
            role, password, repassword } = this.state
        console.log("username:" + username);
        console.info("password: " + password);
        console.warn("repassword: " + repassword);

        var newUser = {
            username: username,
            nama: nama,
            birthplace: birthplace,
            birthdate: birthdate,
            address: address,
            role: role,
            password: password,
        }
        var arr = []
        var users = JSON.parse(localStorage.getItem("user"))
        var found = 0

        users.forEach(user => {
            if(user.username === username) {
                found++
            } 
        });

        if(found === 0) {
            if( password !== repassword) {
                alert("Password dan Re-type tidak sama")
            } else {
                if(arr.length === 0 && users === null) {
                    arr.push(newUser)
                    localStorage.setItem('user', JSON.stringify(arr))
                    console.log("push awal");
                } else {
                    users.push(newUser)
                    localStorage.setItem('user', JSON.stringify(users))
                    console.log("push selanjutnya");
                    
                }
            }
        } else {
            alert("username tidak tersedia")
        }     
    }

    render() {
        if(this.props.loginStatus)
            return <Redirect to="/" />

        return (
            <div style={{ marginTop: "10px", display: "flex", justifyContent: "center"}}>
                <div>
                    <div>
                        <div style={{ textAlign: "left", marginTop: "5px"}}>
                            Username</div>
                        <div>
                            <input 
                                type="text"
                                onChange={(e) => this.setValueInput(e.target.value, 
                                "username")}
                            />
                        </div>
                    </div>
                    
                    <div>
                        <div style={{ textAlign: "left", marginTop: "5px"}}>
                            Nama</div>
                        <div>
                            <input 
                                type="text"
                                onChange={(e) => this.setValueInput(e.target.value, 
                                "nama")}
                            />
                        </div>
                    </div>
                    
                    <div>
                        <div style={{ textAlign: "left", marginTop: "5px"}}>
                            Tempat Lahir</div>
                        <div>
                            <input 
                                type="text"
                                onChange={(e) => this.setValueInput(e.target.value, 
                                "birthplace")}
                            />
                        </div>
                    </div>
                    
                    <div>
                        <div style={{ textAlign: "left", marginTop: "5px"}}>
                            Tanggal Lahir</div>
                        <div>
                            <input 
                                type="text"
                                onChange={(e) => this.setValueInput(e.target.value, 
                                "birthdate")}
                            />
                        </div>
                    </div>
                    
                    <div>
                        <div style={{ textAlign: "left", marginTop: "5px"}}>
                            Alamat</div>
                        <div>
                            <input 
                                type="text"
                                onChange={(e) => this.setValueInput(e.target.value, 
                                "address")}
                            />
                        </div>
                    </div>
                    
                    <div>
                        <div style={{ textAlign: "left", marginTop: "5px"}}>
                            Posisi</div>
                        <div>
                            <input 
                                type="text"
                                onChange={(e) => this.setValueInput(e.target.value, 
                                "role")}
                            />
                        </div>
                    </div>

                    <div>
                        <div style={{ textAlign: "left", marginTop: "5px"}}>
                            Password</div>
                        <div>
                            <input 
                                type="password"
                                onChange={(e) => this.setValueInput(e.target.value, 
                                "password")}
                            />
                        </div>
                    </div>

                    <div>
                        <div style={{ textAlign: "left", marginTop: "5px"}}>
                            Re-Type Password</div>
                        <div>
                            <input 
                                type="password"
                                onChange={(e) => this.setValueInput(e.target.value, 
                                "repassword")}
                            />
                        </div>
                    </div>

                    <div style={{ marginTop: "15px" }}>
                        <button onClick={this.saveReg}>Register</button>
                        
                    </div>
                    
                </div>
            </div>
        )
    }
}

export default Register