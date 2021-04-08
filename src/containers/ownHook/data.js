import axios from 'axios';

import {useState} from 'react';

let res, error = null;

const useData = () => {

	const [loading, setLoading] = useState(false);

	const saveData = (userId, data) => {
		setLoading(true);
		axios.post(`https://kanban-hooks-default-rtdb.firebaseio.com/${userId}`, data)
		.then(response => {
			res = response;
			setLoading(false);
		})
		.catch(err => {
			error = err
			setLoading(false);
		})
	}

	return{
		saveData: saveData,
		response: res,
		error: error,
		loadingState: loading
	}
}