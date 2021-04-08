import axios from 'axios';

import {useState} from 'react';

let resSend, error = null;

const useData = () => {

	const [sending, setSending] = useState(false);
	const [fatching, setFatching] = useState(false);
	const [resSend, setResSend] = useState(null);
	const [errSend, setErrSend] = useState(null);

	const [resFatch, setResFatch] = useState(null);
	const [errFatch, setErrFatch] = useState(null);



	const saveData = (userId, data, token) => {
		setSending(true);
		setResSend(null); 
		setErrSend(null);
		setResFatch(null); 
		setErrFatch(null);
		axios.put(`https://kanban-hooks-default-rtdb.firebaseio.com/users/${userId}.json?auth=${token}`, data)
		.then(response => {
			setResSend(response);
			setSending(false);
		})
		.catch(err => {
			setErrSend(err);
			setSending(false);
		})
	}

	const fatchData = (userId, token) => {
		setFatching(true);
		setResFatch(null); 
		setErrFatch(null);
		setResSend(null); 
		setErrSend(null);
		axios.get(`https://kanban-hooks-default-rtdb.firebaseio.com/users/${userId}.json?auth=${token}`)
		.then(response => {
			setResFatch(response);
			setFatching(false);
		})
		.catch(err => {
			setErrFatch(err);
			setFatching(false);
		})
	}

	return{
		saveData: saveData,
		fatchData: fatchData,
		responseSend: resSend,
		errorSend: errSend,
		responseFatch: resFatch,
		errorFatch: errFatch,
		sending: sending,
		fatching: fatching
	}
}

export default useData;