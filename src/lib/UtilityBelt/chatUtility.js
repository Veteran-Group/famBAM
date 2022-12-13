import axios from "axios"
import { api, dadNumber, momNumber } from '../../config.js';

export const sendTextTo = (parent, from) => {
  let number = '';

  if (parent === 'dad') {
    number = dadNumber
  } else if (parent === 'mom') {
    number = momNumber;
  }

  axios.put(`${api}/sendDadText?username=${from}&number=${number}`)
  localStorage.setItem('textButtonStatus', 'true');
}
