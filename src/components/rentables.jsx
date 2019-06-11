import React, { Component } from "react";

class Rentables extends Component {
  handleRemove(id) {
    this.props.AddRemove(id, -1);
  }

  handleAdd(id) {
    this.props.AddRemove(id, 1);
  }

  render() {
    const { data, rentables } = this.props;
    return (
      <div className="rentabeles">
        {data.map(p => (
          <div className="m-4" key={p.id}>
            <img src={p.image} alt={p.name} />
            <p>{p.name}</p>
            <p>{p.price}</p>

            <div>
              <button onClick={() => this.handleRemove(p.id)}>-</button>
              <span className="m-2">
                {rentables.filter(r => r.id === p.id)[0].amount}
              </span>
              <button onClick={() => this.handleAdd(p.id)}>+</button>
            </div>
          </div>
        ))}
      </div>
    );
  }
}
export default Rentables;
