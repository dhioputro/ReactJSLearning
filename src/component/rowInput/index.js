import React, {Component} from "react"
import Input from "../input"
import "./rowInput.css"

class RowInput extends Component {
    constructor(props){
        super(props)
        this.state = {}
    }
    
    render(){
        return (
            <>
                <label className="labelInput" htmlFor={this.props.name}>{this.props.label}</label>
                <div className="input">
                    <Input 
                        type={this.props.type}
                        name={this.props.name}
                        defaultValue={this.props.defaultValue}
                        fnSetValue={this.props.fnSetValue}
                    />
                </div>
            </>
        )
    }
}

export default RowInput