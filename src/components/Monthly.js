import React from "react";
class Monthly extends React.Component {
  constructor(props) {
    super(props);
    const date = new Date();
    this.month = date.toLocaleString("default", { month: "long" });
    this.state = {
      toDos: props.info,
    };
  }
  createBox = (dateArr = []) => {
    for (let i = 0; i < 31; i++) {
      dateArr.push(i + 1);
    }
    return dateArr;
  };
  render() {
    return (
      <>
        {Object.keys(this.state.toDos).map((cv, id) => {
          return (
            <>
              <div className="flex w-10/12 mx-auto px-4 py-6 justify-between shadow-lg border mb-10 relative">
                <div className="border bg-blue-100 p-2 w-3/12 flex flex-col justify-center align-middle">
                  <h1 className="mx-auto font-semibold">{cv}</h1>
                  <span className="mx-auto font-semibold rounded px-5 bg-red-400 text-white">
                    {this.month}
                  </span>
                </div>
                <div
                  className="absolute top-1 right-1 cursor-pointer bg-red-500 rounded-full h-6 w-6 flex text-3xl p-4"
                  onClick={() => {
                    this.props.handleDelete(id);
                  }}
                >
                  <h1 className=" text-white absolute -top-2 custom-left">⨯</h1>
                </div>
                <div className="w-9/12 flex flex-wrap justify-left">
                  {this.createBox().map((cv, index) => {
                    return (
                      <>
                        <div
                          className={
                            Object.values(this.state.toDos)[id].includes(
                              index + 1
                            )
                              ? "h-12 w-16 border text-center flex justify-center align-middle rounded m-2 hover:border-indigo-500 cursor-pointer bg-green-400 "
                              : "h-12 w-16 border text-center flex justify-center align-middle rounded m-2 hover:border-indigo-500 cursor-pointer"
                          }
                          onClick={() => {
                            this.props.handleDates(index + 1, id);
                          }}
                        >
                          <h1 className="my-auto">{index + 1}</h1>
                        </div>
                      </>
                    );
                  })}
                </div>
              </div>
            </>
          );
        })}
      </>
    );
  }
}
export default Monthly;
