import React, { useState } from 'react';
import 'styled-components/macro';

const Token = () => {
	const [token, setToken] = useState('');
	return (
		<section
			css={{
				width: '100%',
				maxWidth: 420,
				margin: '0 auto',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				fontFamily: 'Calibri',
				padding: '0 16px',
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
				<input
					type="password"
					name="token"
					value={token}
					onChange={e => {
						setToken(e.target.value);
					}}
					placeholder="Paste here"
					css={{
						marginBottom: 16,
						borderRadius: 4,
						fontSize: 18,
						fontFamily: 'Calibri',
						padding: '8px 16px',
						border: '1px solid #424242',
						boxShadow: 'none',
						width: '100%',
					}}
				/>
				<button css={{
						width: '108%',
						borderRadius: 4,
						fontSize: 18,
						fontFamily: 'Calibri',
						padding: '8px 16px',
						border: '1px solid #424242',
						boxShadow: 'none',
						background:"#19194d",
						color: "#fff"
				}}>SUBMIT</button>
			</form>
		</section>
	);
};

export default Token;
