import { Text } from 'components/text';
import clsx from 'clsx';
import styles from './Button.module.scss';

interface IButtonProps {
	title: string;
	onClick?: () => void;
	type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
}

export const Button = ({ title, onClick, type }: IButtonProps) => {
	let buttonClasses: string | undefined;
	buttonClasses = clsx(styles.button, type && styles[`button_${type}`]);

	return (
		<button className={buttonClasses} type={type} onClick={onClick}>
			<Text weight={800} uppercase>
				{title}
			</Text>
		</button>
	);
};
