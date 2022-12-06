import React, { useState, useEffect, useContext } from 'react';
import axios, { Axios } from 'axios';
import { api } from "../config.js";
import './styles/parentportal.css';
import { AppContext } from '../App.js';
import { Accordion } from '@mantine/core';
import { Promise } from 'bluebird';

const ParentPortal = () => {

  const { profile } = useContext(AppContext);
  let [children, setChildren] = useState([]);


  useEffect(() => {
    axios.get(`${api}/getKids?id=${profile.id}`)
      .then((response) => {
        setChildren(children = response.data);
      })
      .then(() => {console.log(JSON.stringify(children))})
  }, []);

  return (
    <>
      <div className="parent-portal">
        <div className="child-container">
          <Accordion>
            {children.map((child) => {
              return (
                <Accordion.Item value={child.f_name}>
                  <Accordion.Control>{child.f_name}</Accordion.Control>
                  <Accordion.Panel>
                    <p/>User ID: {child.user_id}  |  Logged In: {JSON.stringify(child.logged_in)}
                    <p/>Username: {child.username}  |  Last Name: {child.l_name}
                  </Accordion.Panel>
                </Accordion.Item>
              )})
            }
          </Accordion>
        </div>
      </div>
    </>
  )
}

export default ParentPortal;