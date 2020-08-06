import React, { Component } from "react";
import Navbar from "../Navbar/Navbar";
import {
  getMergeSortAnimations,
  getQuickSortAnimations,
  getBubbleSortAnimations,
} from "../../algorithms/Algorithms";

import "./Algovis.css";

const primaryColor = "#af5166";
const secondaryColor = "turquoise";

export default class Algovis extends Component {
  // The current state of the array
  state = {
    array: [],
    algorithm: "mergeSort",
    arrayLength: 305,
    speed: 1,
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

  // An arrow function that changes the animation speed
  handleSpeedChange = (newValue) => {
    const speed = 11 - newValue;
    this.setState({ speed });
  };

  // Mergesort animation
  mergeSort = () => {
    const animations = getMergeSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName("bar");
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? secondaryColor : primaryColor;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * this.state.speed);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * this.state.speed);
      }
    }

    console.log(this.state.isAnimating);
  };

  // Quicksort animation
  quickSort = () => {
    const animatingArray = getQuickSortAnimations(this.state.array);
    for (let i = 0; i < animatingArray.length; i++) {
      const arrayBars = document.getElementsByClassName("bar");
      const isColorChange = i % 4 <= 1;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animatingArray[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 4 === 0 ? secondaryColor : primaryColor;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * this.state.speed);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animatingArray[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * this.state.speed);
      }
    }
  };

  // Bubblesort animation
  bubbleSort = () => {
    const animatingArray = getBubbleSortAnimations(this.state.array);
    for (let i = 0; i < animatingArray.length; i++) {
      const arrayBars = document.getElementsByClassName("bar");
      const isColorChange = i % 4 <= 1;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animatingArray[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 4 === 0 ? secondaryColor : primaryColor;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * this.state.speed);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animatingArray[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * this.state.speed);
      }
    }
  };

  render() {
    // Extract the array and the algorithm from the state
    const { array, algorithm, arrayLength, speed, isAnimating } = this.state;

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

    // Set the sort function accordingly
    let sortFunction = this.mergeSort;

    if (this.state.algorithm === "mergeSort") {
      sortFunction = this.mergeSort;
    } else if (this.state.algorithm === "quickSort") {
      sortFunction = this.quickSort;
    } else if (this.state.algorithm === "bubbleSort") {
      sortFunction = this.bubbleSort;
    }

    // Return the bars represented by the numeric values of the elements of the array
    return (
      <>
        <Navbar
          reset={this.resetArray}
          algorithm={algorithm}
          arrayLength={arrayLength}
          speed={speed}
          isAnimating={isAnimating}
          handleAlgorithmChange={this.handleAlgorithmChange}
          handleArrayLengthChange={this.handleArrayLengthChange}
          handleSpeedChange={this.handleSpeedChange}
          sortFunction={sortFunction}
        />
        <div className="container">
          {array.map((el, i) => (
            <p
              className="bar"
              key={i}
              style={{
                height: `${el}px`,
                width,
                marginLeft: margin,
                marginRight: margin,
                backgroundColor: primaryColor,
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
