import axios from "axios"
import { api } from '../../config.js';

export const sendTextTo = (parent, from) => {
  let number = parent = 'dad' ? '+19162257301' : '+19167409976';

  axios.put(`${api}/sendDadText?username=${from}&number=${number}`)
  localStorage.setItem('textButtonStatus', 'true');
}
