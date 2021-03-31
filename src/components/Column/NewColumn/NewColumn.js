import React, {useState} from 'react';

import Button from '../../UI/Button/Button';
import Input from '../../UI/Input/Input';

const ExistingColumn = (props) => {


	const [inputCol, setInputCol] = useState('');
	

	const addCol = () => {

		props.add(inputCol);
		setInputCol('');
	};


	return(
		<React.Fragment>
			<Input 
				type='text' 
				value={inputCol} 
				onChange={(event) => setInputCol(event.target.value)}
				placeholder='nazwa kolumny'
				//onKeyDown={colHandlerKeyPress}
				>
			</Input>
			<Button click={addCol} disabled={inputCol === '' ? true: false}>Dodaj Kolumne</Button>
	 		
		</React.Fragment> 
	);
}
export default ExistingColumn;