import axios from 'axios';

import {useState} from 'react';

let res, error = null;

const useData = () => {

	const [sending, setSending] = useState(false);
	const [fatching, setFatching] = useState(false);


	const saveData = (userId, data, token) => {
		setSending(true);
		res = null; 
		error = null;
		axios.put(`https://kanban-hooks-default-rtdb.firebaseio.com/users/${userId}.json?auth=${token}`, data)
		.then(response => {
			res = response;
			setSending(false);
		})
		.catch(err => {
			error = err
			setSending(false);
		})
	}

	return{
		saveData: saveData,
		response: res,
		error: error,
		sending: sending
	}
}

export default useData;