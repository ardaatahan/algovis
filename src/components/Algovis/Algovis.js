import React, { Component } from "react";
import Navbar from "../Navbar/Navbar";

import styles from "./Algovis.module.css";

export default class Algovis extends Component {
  // The current state of the array
  state = {
    array: [],
    algorithm: "mergeSort",
    arrayLength: 305,
  };

  // Initialize the array with random numbers when this component mounts
  componentDidMount() {
    this.resetArray();
  }

  // An arrow function that populates an empty array with random numbers
  // and sets the state to the newly generated array
  resetArray = () => {
    const array = [];

    for (let i = 0; i < this.state.arrayLength; i++) {
      array.push(randomIntFromInterval(5, 730));
    }

    this.setState({ array });
  };

  // An arrow function that changes the algorithm state
  handleAlgorithmChange = (e) => {
    this.setState({ algorithm: e.target.value });
  };

  // An arrow function that changes the array length
  handleArrayLengthChange = (newValue) => {
    this.setState({ arrayLength: newValue });
    this.resetArray();
  };

  render() {
    // Extract the array and the algorithm from the state
    const { array, algorithm, arrayLength } = this.state;

    // Get the current width of the screen and adjust it acordingly for the styling
    const adjustWidth = Math.floor(
      document.body.clientWidth / (array.length * 4)
    );

    const width = `${adjustWidth}px`;

    // Adjust the margin of the bars according to the array length
    const adjustMargin =
      arrayLength < 5
        ? 10
        : arrayLength < 8
        ? 8
        : arrayLength < 11
        ? 6
        : arrayLength < 20
        ? 4
        : arrayLength < 50
        ? 3.5
        : arrayLength < 100
        ? 3
        : arrayLength < 130
        ? 2.5
        : 2;

    const margin = `${adjustMargin}px`;

    // Return the bars represented by the numeric values of the elements of the array
    return (
      <>
        <Navbar
          reset={this.resetArray}
          algorithm={algorithm}
          arrayLength={arrayLength}
          handleAlgorithmChange={this.handleAlgorithmChange}
          handleArrayLengthChange={this.handleArrayLengthChange}
        />
        <div className={styles.container}>
          {array.map((el, i) => (
            <p
              className={styles.bar}
              key={i}
              style={{
                height: `${el}px`,
                width,
                marginLeft: margin,
                marginRight: margin,
              }}
            ></p>
          ))}
        </div>
      </>
    );
  }
}

// Function taken from https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript?rq=1
const randomIntFromInterval = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

// A helper arrow function that checks whether two arrays are equal
// const areArraysEqual = (arr1, arr2) => {
//   if (arr1.length !== arr2.length) {
//     return false;
//   }

//   for (let i = 0; i < arr1.length; i++) {
//     if (arr1[i] !== arr2[i]) {
//       return false;
//     }
//   }

//   return true;
// };
