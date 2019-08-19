import React from 'react';
import '../assets/styling/index.css';
import '../assets/styling/modal.css';

const Modal = (props) => {
	return (
		<div className="modal">
			<header className="modal_header">
				<h1>{props.title}</h1>
			</header>
			<section className="modal_content">{props.children}</section>
			<section className="modal_actions">
				{props.canCancel && <button className="btn" onClick={props.onCancel}>cancel</button>}
				{props.canConfirm && <button className="btn" onClick={props.onConfirm}>{props.confirmText}</button>}
			</section>
		</div>
	);
};

export default Modal;
