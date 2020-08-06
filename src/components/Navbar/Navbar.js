import React, { Component } from "react";
import {
  AppBar,
  Typography,
  Button,
  Toolbar,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Slider,
} from "@material-ui/core";

import styles from "./Navbar.module.css";

export default class Navbar extends Component {
  render() {
    return (
      <>
        <AppBar position="fixed" style={{ background: "turquoise" }}>
          <div className={styles.container}>
            <Toolbar>
              <Button
                onClick={() => this.props.reset()}
                disabled={this.props.isAnimating}
              >
                <Typography style={{ color: "black" }}>
                  Generate New Array
                </Typography>
              </Button>
            </Toolbar>
            <div>
              <InputLabel style={{ marginTop: "15px" }}>
                Array Length
              </InputLabel>
              <Slider
                value={this.props.arrayLength}
                min={5}
                max={325}
                step={10}
                onChange={(e, newValue) => {
                  if (newValue === this.props.arrayLength) {
                    return;
                  }

                  return this.props.handleArrayLengthChange(newValue);
                }}
                style={{ width: "100px", marginTop: "5px" }}
                disabled={this.props.isAnimating}
              />
            </div>
            <div>
              <InputLabel style={{ marginTop: "15px" }}>
                Animation Speed
              </InputLabel>
              <Slider
                value={11 - this.props.speed}
                min={1}
                max={10}
                step={1}
                onChange={(e, newValue) => {
                  if (newValue === this.props.speed) {
                    return;
                  }

                  return this.props.handleSpeedChange(newValue);
                }}
                style={{ width: "100px", marginTop: "5px" }}
                disabled={this.props.isAnimating}
              />
            </div>
            <Toolbar>
              <FormControl>
                <InputLabel>Algorithm:</InputLabel>
                <Select
                  value={this.props.algorithm}
                  onChange={(e) => this.props.handleAlgorithmChange(e)}
                  inputProps={{
                    name: "age",
                  }}
                  disabled={this.props.isAnimating}
                >
                  <MenuItem value="mergeSort">
                    <Typography style={{ color: "black" }}>
                      Merge Sort
                    </Typography>
                  </MenuItem>
                  <MenuItem value="quickSort">
                    <Typography style={{ color: "black" }}>
                      Quick Sort
                    </Typography>
                  </MenuItem>
                  <MenuItem value="bubbleSort">
                    <Typography style={{ color: "black" }}>
                      Bubble Sort
                    </Typography>
                  </MenuItem>
                </Select>
              </FormControl>
            </Toolbar>
            <Toolbar>
              <Button
                onClick={() => this.props.sortFunction()}
                disabled={this.props.isAnimating}
              >
                <Typography style={{ color: "black" }}>Sort</Typography>
              </Button>
            </Toolbar>
          </div>
        </AppBar>
        <Toolbar />
      </>
    );
  }
}
