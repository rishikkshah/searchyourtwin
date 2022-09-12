import tick from "./assets/checkmark.svg";
import cross from "./assets/crossmark.svg";
import React from "react";
import "./App.css";
import Result from "./Result";
import upload from "./ris_drag_icon.svg";

import { FileUploader } from "react-drag-drop-files";
import { useState } from "react";
import { Button } from "@mui/material";
const ok = require("./assets/ok.jpg");
const notOk = require("./assets/notOk.webp");

const fileTypes = ["JPG", "PNG", "JPEG"];

function DragDrop() {
  const [flag, setFlag] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [searchData, setSearchData] = useState(null);

  const data = new FormData();
  const handleChange = (file) => {
    setFile(file);
    setFlag(false);
    setError(false);
  };
  data.append("file", file);

  const handleSubmit = (e) => {
    // console.log(URL.createObjectURL(file));
    e.preventDefault();
    setLoading(true);
    fetch("/detectFace", {
      method: "POST",
      body: data,
    })
      .then((res) => {
        // console.log(res);
        return res.json();
      })
      .then((data) => {
        if (data.length == 0) {
          setFlag(false);
          setError(true);
          setLoading(false);
        } else {
          setSearchData(data[0]);
          setError(false);
          setFlag(true);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err.message);
        // setError(true);
        setLoading(false);
      });
  };
  const handleClear = (e) => {
    e.preventDefault();
    setFile(null);
    setFlag(false);
    setError(false);
  };
  return (
    <div
      style={{
        // height: "50vh",
        // width: "75vw",
        background: "white",
        color: "black",
        padding: "50px 0 50px 0",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <form onSubmit={handleSubmit}>
        <div
          style={{
            // height: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
              margin: "10px 25px 10px 50px",
              maxHeight: "300px",
              maxWidth: "300px",
            }}
          >
            <FileUploader
              handleChange={handleChange}
              name="file"
              types={fileTypes}
            >
              <div
                style={{
                  border: "1px solid gray",
                  cursor: "pointer",
                }}
              >
                {file ? (
                  <img
                    src={URL.createObjectURL(file)}
                    alt="img"
                    style={{ maxWidth: "300px", maxHeight: "200px" }}
                  />
                ) : (
                  <div style={{ padding: "20px" }}>
                    <h3 style={{ margin: "0" }}>Upload Image</h3>
                    <img
                      src={upload}
                      alt="logo"
                      style={{
                        // width: "200px",
                        padding: "30px 30px 30px 30px",
                        marginTop: "0px",
                      }}
                    />
                  </div>
                )}
              </div>
            </FileUploader>
            <Button
              type="submit"
              variant="contained"
              style={{ marginTop: "20px" }}
              onClick={handleClear}
            >
              Clear
            </Button>
          </div>
          <div
            style={{
              textAlign: "left",
              margin: "10px 25px 10px 25px",
              maxWidth: "300px",
              maxHeight: "300px",
            }}
          >
            <h2>Tips for best results</h2>
            <ul>
              <li>Center your head in the photo</li>
              <li>Look directly at the camera</li>
              <li>No Hair across your head or eyes</li>
              <li>Make sure your face is clearly visible</li>
              <li>Don't tilt your head up/down or left/right</li>
            </ul>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
              margin: "10px 25px 10px 50px",
              maxHeight: "300px",
              maxWidth: "300px",
            }}
          >
            <div style={{ display: "flex" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  margin: "10px",
                }}
              >
                <img
                  src={ok}
                  alt="ok"
                  style={{ width: "100px", height: "100px" }}
                />
                <img
                  src={tick}
                  alt="tick"
                  style={{ width: "50px", color: "green" }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  margin: "10px",
                }}
              >
                <img
                  src={notOk}
                  alt="notOk"
                  style={{ width: "100px", height: "100px" }}
                />
                <img src={cross} alt="cross" style={{ width: "50px" }} />
              </div>
            </div>
            <Button
              type="submit"
              variant="contained"
              style={{ marginTop: "20px" }}
              disabled={loading}
            >
              {loading ? "Loading..." : "Search"}
            </Button>
          </div>
        </div>
      </form>
      {flag && (
        <div style={{ marginTop: "0px" }}>
          <Result o_img={URL.createObjectURL(file)} s_data={searchData} />
        </div>
      )}

      {error && (
        <h1 style={{ color: "black" }}>Oops! We couldn't find your twin :(</h1>
      )}
    </div>
  );
}
export default DragDrop;
