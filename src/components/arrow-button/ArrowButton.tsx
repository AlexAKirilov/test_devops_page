import { useState } from 'react';
import clsx from 'clsx';
import arrow from 'src/images/arrow.svg';

import styles from './ArrowButton.module.scss';

// TODO: Add interface for props

interface IProps {
	/** Текущее состояние кнопки (открыта/закрыта) */
	isOpen: boolean;
	/** Обработчик клика по кнопке */
	onClick: OnClick;
	/** Дополнительные CSS-классы */
	className?: string;
}

/** Функция для обработки открытия/закрытия формы */
export type OnClick = () => void;

// TODO: Add Props

export const ArrowButton = ({ isOpen, onClick, className }: IProps) => {
	const [isInternalOpen, setIsInternalOpen] = useState(false);

	const handleClick = () => {
		setIsInternalOpen(!isInternalOpen);
		onClick();
	};

	const containerClasses = clsx(
		styles.container,
		isOpen && styles.container_open,
		className
	);

	const arrowClasses = clsx(
		styles.arrow,
		(isOpen || isInternalOpen) && styles.arrow_open
	);

	return (
		<div
			role="button"
			aria-label={
				isOpen
					? 'Закрыть форму параметров статьи'
					: 'Открыть форму параметров статьи'
			}
			tabIndex={0}
			onClick={handleClick}
			onKeyDown={(e) => e.key === 'Enter' && handleClick()}
			className={containerClasses}
		>
			<img
				src={arrow}
				alt="иконка стрелочки"
				className={arrowClasses}
			/>
		</div>
	);
};
