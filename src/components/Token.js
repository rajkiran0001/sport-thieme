import React, { useState } from 'react';
import 'styled-components/macro';
import Button from './Button'
import Input from './Input'


const Token = () => {
	const [token, setToken] = useState('');
	return (
		<section
			css={{
				width: '100%',
				maxWidth: 420,
				margin: 'auto',
			}}
		>
			<form
				css={{ width: '100%' }}
				onSubmit={e => {
					e.preventDefault();
					localStorage.setItem('token', token);
					window.location.reload();
				}}
			>
				<h1
					css={{
						color: '#19194d',
						textAlign: 'center',
						fontSize: 48,
						marginTop: 12,
					}}
				>
					Enter your Token
				</h1>
				<Input
					type="password"
					name="token"
					value={token}
					onChange={e => {
						setToken(e.target.value);
					}}
					placeholder="Paste here"
					css={{width: '100%'}}
				/>
				<Button css={{width: '108%'}}>SUBMIT</Button>
			</form>
		</section>
	);
};

export default Token;
