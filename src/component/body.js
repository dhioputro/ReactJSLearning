import React, {Component} from 'react';
import "./body.css";
import "./modal.css";
import Table from "./Table.js";

class Body extends Component {
    constructor() {
        super();
        this.state = {
            parklist: [
                {
                    "id":"0PFPH","vehicle":"motor","number":"d42425SG","status":"in","timein":"2020-08-27T11:37:49.437Z","timeout":""
                },
                {
                    "id":"MZCP4","vehicle":"motor","number":"B78443sh","status":"out","timein":"2020-08-27T11:42:09.108Z","timeout":"2020-08-27T11:42:15.747Z"
                },
                {
                    "id":"T6ZID","vehicle":"mobil","number":"z14424jak","status":"out","timein":"2020-08-27T12:15:23.478Z","timeout":"2020-08-27T12:15:36.422Z"
                }
            ],
            id: '',
            vehicle: '',
            number: '',
            showEntry: false,
            showExit: false,
            showLog: false,
            message1: '',
            message2: '',
        };

        this.handleIdChange = this.handleIdChange.bind(this);
        this.handleCarChange = this.handleCarChange.bind(this);
        this.handleNumberChange = this.handleNumberChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSubmitOut = this.handleSubmitOut.bind(this);
        this.dismissMessage1 = this.dismissMessage1.bind(this);
        this.dismissMessage2 = this.dismissMessage2.bind(this);
    }

    handleSubmit(evt) {
        evt.preventDefault();

        if (!this.state.vehicle) {
            return this.setState({ message1: 'vehicle is required' });
        }

        if (!this.state.number) {
            return this.setState({ message1: 'number is required' });
        }
       
        var a = new Date()
        var time = JSON.stringify(a.getHours() + ":" + a.getMinutes() + ":" + a.getSeconds());
        
        var newParker = { "id": (Math.random().toString(36).substr(2, 5)).toUpperCase(), "Vehicle": this.state.vehicle, "number": this.state.number, "status": "in", "timein": time, "timeout": "" }
        
        var parkers = this.state.parklist
        parkers.push(newParker)

        this.updateParkList(parkers)
        
        return this.setState({message1: "ok"})

    }

    handleSubmitOut(evt) {
        evt.preventDefault();

        var parkers = this.state.parklist
       
        for (var i = 0; i<parkers.length ; i++) {
            if (parkers[i].id === this.state.id) {

                var timeOut = new Date()
                console.log(parkers[i].timein.replace(/"/g,''))
                var timeIn = Date.parse(parkers[i].timein.replace(/"/g,''))
                console.log(timeIn)
                var diff = timeOut-timeIn
                var hh = Math.ceil(diff / 1000 / 60 / 60)

                var time = JSON.stringify(timeOut.getHours() + ":" + timeOut.getMinutes() + ":" + timeOut.getSeconds());

                parkers[i].status = "out"
                parkers[i].timeout = JSON.stringify(time)

                this.updateParkList(parkers)
                
                if (parkers[i].vehicle === "mobil") {
                    return this.setState({message2: (5000*hh)})    
                } else if (parkers[i].vehicle === "motor") {
                    return this.setState({message2: (2000*hh)})    
                } else {
                    return this.setState({message2: (7000*hh)})    
                }
            } 
        }  

        return this.setState({
            message2: 'Not Found'})

    }

    handleCarChange(evt) {
        this.setState({
            vehicle: evt.target.value,
        });
    };

    handleNumberChange(evt) {
        this.setState({
            number: evt.target.value,
        });
    }

    handleIdChange(evt) {
        this.setState({
            id: evt.target.value,
        });
    }

    dismissMessage1() {
        this.setState({ message1: '' });
    }

    dismissMessage2() {
        this.setState({ message2: '' });
    }

    updateParkList(parklist) {
        this.setState( {
            parklist: parklist
        })
    }

    showModalEntry = () => {
        this.setState({ showEntry: true });
    };
    hideModalEntry = () => {
        this.setState({ showEntry: false });
    };
    showModalExit = () => {
        this.setState({ showExit: true });
    };
    hideModalExit = () => {
        this.setState({ showExit: false });
    };
    showModalLog = () => {
        this.setState({ showLog: true });
    };
    hideModalLog = () => {
        this.setState({ showLog: false });
    };

    render() { 
        return ( 
            <>
                <body className="App-body">
                {/* app banner */}
                    <div className="banner">
                        <h2> Hi Admin, Welcome! </h2>
                        <button type="button" className="btn modal-btn" onClick={this.showModalEntry}>
                            Vehicle Entry
                        </button> 
                        <Modal className="modal" show={this.state.showEntry} handleClose={this.hideModalEntry}>
                            <div className="entry">
                                <h3>Masukkan Data</h3>
                                <form onSubmit={this.handleSubmit}>
                                    <label>Kendaraan</label><br />
                                    <input type="radio" name={this.state.vehicle} value="mobil" onChange={this.handleCarChange} />Mobil<br />
                                    <input type="radio" name={this.state.vehicle} value="motor" onChange={this.handleCarChange} />Motor<br />
                                    <br />
                                    <label>Plat Nomor</label><br />
                                    <input type="text" name={this.state.number} onChange={this.handleNumberChange}></input>
                                    <br />
                                    <br />
                                    <input type="submit" value="Masuk"></input>
                                    {
                                        this.state.message1 &&
                                        <p data-test="message" onClick={this.dismissMessage1}>
                                            {this.state.message1}
                                        </p>
                                    }
                                </form>
                            </div>
                        </Modal >

                        <button className="btn modal-btn" onClick={this.showModalExit}>
                            Vehicle Exit
                        </button>
                        <Modal className="modal" show={this.state.showExit} handleClose={this.hideModalExit}>
                            <div className="portal-keluar">
                                <h3>Parkir Keluar</h3>
                                <form onSubmit={this.handleSubmitOut}>
                                    <label>ID</label><br />
                                    <input type="text" name={this.state.id} onChange={this.handleIdChange}></input>
                                    <br />
                                    <br />
                                    <input type="submit" value="Keluar"></input>
                                    {
                                        this.state.message2 &&
                                        <p data-test="message" onClick={this.dismissMessage2}>
                                            {this.state.message2}
                                        </p>
                                    }
                                </form>
                            </div>
                        </Modal>

                        
                        <button className="btn modal-btn" onClick={this.showModalLog}>
                            Log
                        </button>
                        <Modal className="modal" show={this.state.showLog} handleClose={this.hideModalLog}>
                            <Table parked={this.state.parklist} />

                        </Modal>

                    </div>
        
                </body>
            </>
         );
    }
}

const Modal = ({ handleClose, show, children}) => {
        
    const showHideClassName = show ? "modal display-block" : "modal display-none";

    return(
        <>
            {/* entry modal */}
            <div className={showHideClassName}>
                <div className="modal-main">
                  {children}
                <button className="close-btn" onClick={handleClose}>Close</button>
                </div>
            </div>
        </>
    );
}

 
export default Body;