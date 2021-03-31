import React, {useState} from 'react';


import Button from '../../UI/Button/Button';
import Input from '../../UI/Input/Input';

const NewColumn = (props) => {


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
			<Button click={addCol} classes={'buttonCol'} disabled={inputCol === '' ? true: false}>Dodaj Kolumne</Button>
	 		
		</React.Fragment> 
	);
}
export default NewColumn;