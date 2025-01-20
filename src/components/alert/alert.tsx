import './alert.css';

export type TAlertProps = {
	text: string,
}

export const Alert = ({ text }: TAlertProps) => {
	return (
		<p className='alert'>{text}</p>
	);
};
