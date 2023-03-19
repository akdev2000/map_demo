import React, { forwardRef, useState } from "react";
import "./App.css";
import MapContainer from "./components/maps";

import CameraOutlinedIcon from "@mui/icons-material/CameraOutlined";
import ClearIcon from "@mui/icons-material/Clear";
import { Icon, IconButton, Modal, Typography } from "@mui/material";
import { Box, SxProps } from "@mui/system";
import { Link, useNavigate } from "react-router-dom";
import { customScreenShot } from "./helpers/Helpers";
import Preview from "./components/preview";
import OpenInNewOutlinedIcon from "@mui/icons-material/OpenInNewOutlined";

function App() {
  const [newImage, setNewImage] = useState("");
  const ref = React.createRef<HTMLDivElement>();

  return (
    <div className="App">
      <CameraOutlinedIcon
        className="elementstyle"
        onClick={() => {
          customScreenShot({
            setNewImage,
            ref,
          });
        }}
        sx={{ fontSize: 40 }}
      />
      <div style={{ height: "100vh", width: "100%" }} ref={ref}>
        <MapBox ref={ref} />
      </div>
      <Modal
        open={newImage?.length > 0}
        onClose={() => setNewImage("")}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Preview Snapshot
              </Typography>
              <IconButton
                sx={{ ml: 3 }}
                onClick={() => {
                  let image = new Image();
                  image.src = newImage;

                  let w: any = window.open("");
                  w.document.write(image.outerHTML);
                }}
              >
                <OpenInNewOutlinedIcon color="primary" />
              </IconButton>
            </div>
            <IconButton sx={{ p: 1 }} onClick={() => setNewImage("")}>
              <ClearIcon />
            </IconButton>
          </div>
          <Preview image={newImage} />
        </Box>
      </Modal>
    </div>
  );
}

const MapBox = forwardRef<HTMLDivElement>(MapContainer);

const style: SxProps = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
//   height: "90vh",
  bgcolor: "white",
  border: "2px solid #000",
  boxShadow: 24,
  display: "flex",
  flexDirection: "column",
//   justifyContent: "space-between",
  p: 3,
};

export default App;
