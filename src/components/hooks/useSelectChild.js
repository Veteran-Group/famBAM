import React, { useState, useEffect } from 'react';

const useSelectChild = (childName, status) => {
  let [childStatus, setChildStatus] = useState({});

  childStatus[childName] = status;

  return childStatus;

}