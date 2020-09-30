import React, { Component } from 'react';
// import { Redirect } from 'react-router-dom';

class User extends Component {


    tableHead() {
        return (
            <tr>
                <th>Username</th>
                <th>Nama</th>
                <th>Tempat Lahir</th>
                <th>Tanggal Lahir</th>
                <th>Alamat</th>
                <th>Posisi</th>
            </tr>
        )
    }

    tableData() {
        console.log(this.props.userLogin);
        let users = JSON.parse(localStorage.getItem("user"))
        if(users === null) 
            return this.TableHead()

        return users.map((key, index) => {
            const { username, nama, birthplace, birthdate, address, 
                role } = key
            return (
                    <tr>
                        <td>{username}</td>
                        <td>{nama}</td>
                        <td>{birthplace}</td>
                        <td>{birthdate}</td>
                        <td>{address}</td>
                        <td>{role}</td>
                        <td>
                            <button onClick={() => this.deleteData(this.props.userLogin, index)}>
                                Del
                            </button>
                        </td>
                    </tr>
            )
        })
    }


    renderTable() {
        return (
           <div style={{ marginTop:"20px", display: "flex", justifyContent: "center"}}>
              <table id="users" cellPadding="10px" border="2px">
                 <tbody>
                    {this.tableHead()}
                    {this.tableData()}
                 </tbody>
              </table>
           </div>
        )
    }
    
    deleteData(user, i) {
        let users = JSON.parse(localStorage.getItem("user")) 
        users.map((key, index) => {
            if (user.username === key.username){
                return alert('username sedang login')
            }
            if(i === index) {
                users.splice(index, 1)
            }  
            return users
        })
        localStorage.setItem('user', JSON.stringify(users))
    }

    render() {
        // if(this.props.loginStatus)
        //     return <Redirect to="/" />
        return(
            <>
            {this.renderTable()}
            </>
        )
    }
}



export default User