import React, { Component } from 'react';


class Table extends Component {
    constructor(props) {
        super()
        this.state = {}
    }

    renderTableData() {
        var parked = this.props.parked
        return parked.map((park, index) => {
            const { id, vehicle, number, status, timein, timeout } = park
            return (
                    <tr key={id}>
                        <td>{id}</td>
                        <td>{vehicle}</td>
                        <td>{number}</td>
                        <td>{status}</td>
                        <td>{timein.replace(/"/g,'')}</td>
                        <td>{timeout.replace(/"/g,'')}</td>
                    </tr>
            )
        })
    }

    renderTableHead() {
        return (
            <tr>
                <th>Id</th>
                <th>Vehicle</th>
                <th>Plat</th>
                <th>Status</th>
                <th>Entry</th>
                <th>Exit</th>
            </tr>
        )
    }
    renderTable() {
        return (
           <div>
              <table id='parkers'>
                 <tbody>
                    {this.renderTableHead()}
                    {this.renderTableData()}
                 </tbody>
              </table>
           </div>
        )
     }

    render() {
        return(
            <div className="log">
                {this.renderTable()}
            </div>
        )
    }
}

export default Table;