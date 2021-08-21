import React from "react";
import "../css/ChannelCreate.css";
import { Button, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";

import { HashRouterasRouter } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "50ch",
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function ChannelCreate() {
  const classes = useStyles();
  const handleChange = (event) => {};

  return (
    <div className="channel__container">
      <div className="channel__inner__container">
        {/* 
          작성자 : 전형동
          수정 날짜 : 21-08-21
          구현 대기 중
         */}
        <div className="thumbnail__container">
          <div className="thumbnail__image"></div>
        </div>

        <div className="channel__introduction__container">
          <div className="channel__description">
            {/* 
              작성자 : 전형동
              수정 날짜 : 21-08-21
              구현 대기 중
             */}
            {/* <div className="thumbnail__upload__btn">
            <Button variant="contained" color="primary">
              Profile Upload
            </Button>
          </div> */}

            <div className="channel__title">
              <Input type="string" placeholder="Channel Title" />
            </div>
            <div className="channel__userName">
              <Input type="string" placeholder="User Name" />
            </div>
            <form
              action=""
              classsName={classes.root}
              noValidate
              autoComplate="off"
            >
              <TextField id="description" label="Contents" />
            </form>
          </div>

          <FormControl className={classes.formControl}>
            <Select native onChange={handleChange}>
              <option>Public</option>
              <option>Primary</option>
            </Select>
            <Input type="password" placeholder="password Input" />
          </FormControl>
          <div className="channel__create__btn">
            <Button variant="contained" color="primary" disableElevation>
              Create
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChannelCreate;
