import React, { useState, useEffect } from "react";

import Search from "../components/Search";
import News from "../components/News";

import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

import Collapse from "@material-ui/core/Collapse";

const Home = () => {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    document.title = `Web Search`;
  }, []);
  return (
    <div>
      <h1 className="text-center" style={{ margin: "40px 0" }}>
        Web Search
      </h1>
      <Search />
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          maxWidth: "750px",
          margin: "20px auto",
        }}
      >
        <FormGroup>
          <FormControlLabel
            value="end"
            control={
              <Switch
                color="primary"
                onClick={() => {
                  setOpen((value) => !value);
                }}
              />
            }
            label="Show News"
            labelPlacement="end"
          />
        </FormGroup>
      </div>
      <Collapse in={open}>
        <News />
      </Collapse>
    </div>
  );
};

export default Home;
