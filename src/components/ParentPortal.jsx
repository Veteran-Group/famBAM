import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { api } from "../config.js";
import './styles/parentportal.css';
import { AppContext } from '../App.js';
import { Checkbox, Button } from '@mantine/core';
//import { useSelectChild } from './hooks/useSelectChild.js';

const ParentPortal = () => {

  const { profile } = useContext(AppContext);
  let [children, setChildren] = useState([]);
  let [childStat, setChildStat] = useState({});


  useEffect(() => {
    axios.get(`${api}/getKids?id=${profile.id}`)
      .then((response) => {
        setChildren(children = response.data);
      })
  }, []);

  return (
    <>
      <div className="parent-portal">
        <div className="child-container">
          {children.map((child) => {
            return (
              <>
                <Checkbox onClick={() => { childStat[child.f_name] = true }} className="childChkBox" label={child.f_name} />
              </>
              )
            })
          }
          <Button onClick={() => { alert(JSON.stringify(childStat)) }} />
        </div>
      </div>
    </>
  )
}

export default ParentPortal;