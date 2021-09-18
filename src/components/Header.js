import React from "react";
import Monthly from "./Monthly";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInput: "",
      relayData: {},
    };
  }
  handleInput = (e) => {
    
    e.target.value =
      e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1);
    this.setState({
      userInput: e.target.value,
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.setState((prevState) => {
      return {
        relayData: Object.assign(prevState.relayData, {
          [this.state.userInput]: [],
        }),
        userInput: "",
      };
    });
  };
  handleDelete = (id) => {
    const allTodos = this.state.relayData;
    delete allTodos[Object.keys(allTodos)[id]];
    this.setState({
      relayData: allTodos,
    });
  };
  handleDates = (date, id) => {
    let allValues = Object.values(this.state.relayData);
    if (!allValues[id].includes(date)) {
      allValues[id].push(date);
    } else {
      allValues[id].splice(allValues[id].indexOf(date), 1);
    }
    this.setState(() => {
      return {
        relayData: this.state.relayData,
      };
    });
  };
  componentDidMount() {
    if (localStorage.relayData) {
      this.setState({ relayData: JSON.parse(localStorage.relayData) });
    }
    window.addEventListener("beforeunload", this.handleUpdateLocalStorage);
  }
  componentWillUnmount() {
    window.removeEventListener("beforeunload", this.handleUpdateLocalStorage);
  }
  handleUpdateLocalStorage = () => {
    localStorage.setItem("relayData", JSON.stringify(this.state.relayData));
  };
  render() {
    return (
      <>
        <div className="flex flex-col mt-20">
          <h1 className="text-center text-4xl text-indigo-400">
            Monthly Activity Tracker!
          </h1>
          <form
            className="flex border w-5/12 mx-auto my-10 align-middle justify-between"
            onSubmit={this.handleSubmit}
          >
            <input
              type="text"
              placeholder="e.g coding"
              className="w-8/12 pl-6"
              onChange={this.handleInput}
              value={this.state.userInput}
            />
            <button
              type="submit"
              className="bg-green-400 text-white p-3 w-4/12"
            >
              Add Activity
            </button>
          </form>
        </div>
        <Monthly
          info={this.state.relayData}
          handleDelete={this.handleDelete}
          handleDates={this.handleDates}
          key={Object.keys(this.state.relayData).length}
        />
      </>
    );
  }
}
export default Header;
