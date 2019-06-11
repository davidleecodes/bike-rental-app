import React, { Component } from "react";
import { getProducts } from "../service/productService";
import Rentables from "./rentables.jsx";

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      date: "",
      rentables: [
        { id: 1, amount: 0 },
        { id: 2, amount: 0 },
        { id: 3, amount: 0 },
        { id: 4, amount: 0 },
        { id: 5, amount: 0 },
        { id: 6, amount: 0 }
      ],
      errors: {}
    };
    this.handleChange = this.handleChange.bind(this);
    this.AddRemove = this.AddRemove.bind(this);
  }

  AddRemove(id, num) {
    const newRentables = this.state.rentables.map(p => {
      if (p.id === id) {
        if (p.amount + num < 0) return p;
        else return { ...p, amount: p.amount + num };
      }
      return p;
    });
    this.setState({
      rentables: newRentables
    });
  }

  handleChange(evt) {
    let name = evt.target.name;
    let value = evt.target.value;
    this.setState({
      [name]: value
    });
  }

  validate = () => {
    const errors = {};
    if (this.state.name.trim() === "") errors.name = "name is required";

    if (this.state.email.trim() === "") errors.email = "email is required";
    let bikeRents = this.state.rentables.reduce((acc, curr) => {
      if (curr.id === 1 || curr.id === 2 || curr.id === 3) {
        return acc + curr.amount;
      }
      return acc;
    }, 0);
    if (bikeRents === 0) errors.bike = "bike is required";
    return Object.keys(errors).length === 0 ? null : errors;
  };

  handleSubmit = e => {
    e.preventDefault();
    const errors = this.validate();
    console.log(errors);
    this.setState({ errors });
  };

  render() {
    const productsData = getProducts();
    return (
      <div>
        <h1 className="display-1">bike rental</h1>
        <div>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              name="name"
              id="name"
              className="form-control"
              value={this.state.name}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              name="email"
              id="email"
              className="form-control"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </div>
        </div>
        <Rentables
          data={productsData}
          rentables={this.state.rentables}
          AddRemove={this.AddRemove}
        />
        <button onClick={this.handleSubmit}>Submit</button>
        {this.state.errors &&
          Object.values(this.state.errors).map(p => (
            <div key={p} className="alert alert-danger">
              {p}
            </div>
          ))}
      </div>
    );
  }
}

export default Checkout;
