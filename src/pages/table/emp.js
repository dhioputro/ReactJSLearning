import React, { Component } from 'react';
// import { Redirect } from 'react-router-dom';

class Employee extends Component {
    constructor(props){
        super(props);
        this.state = {
            // user: ''
        }
    }

    // retrieveData = (data) => {
    //   this.setState({
    //       user: data
    //   })
    // }

    tableHead() {
        return (
            <>
                <tr>
                    <td>Username</td>
                </tr>
                <tr>
                    <td>Nama</td>
                </tr>
                <tr>
                    <td>Tempat Lahir</td>
                </tr>                    
                <tr>
                    <td>Tanggal Lahir</td>
                </tr>                    
                <tr>
                    <td>Alamat</td>
                </tr>                    
                <tr>
                    <td>Posisi</td>
                </tr>                    
            </>
        )
    }

    tableData() {
        let users = JSON.parse(localStorage.getItem("user"))
        let temp = {}
        console.log(users);
        if(users === null) {
            return this.tableHead()
        }
        users.forEach(user => {
            if(user.username === this.props.loginSession.username){
                temp = user
                console.log("nemu");
                console.log("username : "+user.username);
                console.log("username login : "+this.props.loginSession.username);
                console.log("temp: "+temp);
            } else {
                console.log("ga nemu");
                console.log("username : "+user.username);
                console.log("username login : "+this.props.loginSession.username);
            }
        })
            
            return (
                <>
                    <tr>
                        <td>Username</td>
                        <td>{temp.username}</td>
                    </tr>
                    <tr>
                        <td>Nama</td>
                        <td>{temp.nama}</td>
                    </tr>
                    <tr>
                        <td>Tempat Lahir</td>
                        <td>{temp.birthplace}</td>
                    </tr>                    
                    <tr>
                        <td>Tanggal Lahir</td>
                        <td>{temp.birthdate}</td>
                    </tr>                    
                    <tr>
                        <td>Alamat</td>
                        <td>{temp.address}</td>
                    </tr>                    
                    <tr>
                        <td>Posisi</td>
                        <td>{temp.role}</td>
                    </tr>                    
                </>
            )
        // return userData.map((key, index) => {

        //         // if(username === this.props.localSession.username){
                    
        //         // }
                
                
        // })
        // users.forEach(user => {
        //     if(user.username === this.props.loginSession.username) {
                
        //         const { username, nama, birthplace, birthdate, address, 
        //             role } = user
        //             console.log("user:" +username);
        //             console.log("nama:" +nama);
        //         return (
        //             <>
        //                 <tr>
        //                     <td>Username</td>
        //                     <td>{username}</td>
        //                 </tr>
        //                 <tr>
        //                     <td>Nama</td>
        //                     <td>{nama}</td>
        //                 </tr>
        //                 <tr>
        //                     <td>Tempat Lahir</td>
        //                     <td>{birthplace}</td>
        //                 </tr>                    
        //                 <tr>
        //                     <td>Tanggal Lahir</td>
        //                     <td>{birthdate}</td>
        //                 </tr>                    
        //                 <tr>
        //                     <td>Alamat</td>
        //                     <td>{address}</td>
        //                 </tr>                    
        //                 <tr>
        //                     <td>Posisi</td>
        //                     <td>{role}</td>
        //                 </tr>                    
        //             </>
        //         )
        //     }
           
        // });
        
    }


    renderTable() {
        return (
           <div style={{ marginTop:"20px", display: "flex", justifyContent: "center"}}>
              <table id="users" cellPadding="10px" border="2px">
                 <tbody>
                    {/* {this.tableHead()} */}
                    {this.tableData()}
                 </tbody>
              </table>
           </div>
        )
     }
    render() {
        return(
            <>
                {this.renderTable()}
            </>
        )
    }
}

export default Employee