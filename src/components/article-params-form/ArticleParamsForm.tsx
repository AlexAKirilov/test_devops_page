import { FormEvent, useEffect, useRef, useState } from 'react';
import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import styles from './ArticleParamsForm.module.scss';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import clsx from 'clsx';
import { Text } from '../text';
import { Separator } from '../separator';
import { Spacing } from '../spacing';
import { Select } from '../select';
import { RadioGroup } from '../radio-group';

interface IProps {
	isOpen: boolean;
	onFormBtnClick: () => void;
	onFormSubmit: (state: ArticleStateType) => void;
}

export const ArticleParamsForm = ({
	isOpen,
	onFormBtnClick,
	onFormSubmit,
}: IProps) => {
	const [formState, setFormState] = useState(defaultArticleState);
	const formRef = useRef<HTMLElement>(null);

	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (
				formRef.current &&
				!formRef.current.contains(e.target as Node) &&
				isOpen
			) {
				onFormBtnClick();
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, [isOpen, onFormBtnClick]);

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		onFormSubmit(formState);
	};

	const handleReset = () => {
		setFormState(defaultArticleState);
		onFormSubmit(defaultArticleState);
	};

	const handleChange = <K extends keyof ArticleStateType>(
		field: K,
		value: ArticleStateType[K]
	) => {
		setFormState((prev) => ({ ...prev, [field]: value }));
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={onFormBtnClick} />
			<aside
				ref={formRef}
				className={clsx(styles.container, isOpen && styles.container_open)}
			>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Text size={31} weight={800} uppercase>
						Задайте параметры
					</Text>

					<Spacing size={50} />

					<Select
						options={fontFamilyOptions}
						selected={formState.fontFamilyOption}
						title='Шрифт'
						onChange={(value) => handleChange('fontFamilyOption', value)}
					/>

					<Spacing size={50} />

					<RadioGroup
						name='font-size'
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						title='Размер шрифта'
						onChange={(value) => handleChange('fontSizeOption', value)}
					/>

					<Spacing size={50} />

					<Select
						options={fontColors}
						selected={formState.fontColor}
						title='Цвет шрифта'
						onChange={(value) => handleChange('fontColor', value)}
					/>

					<Spacing size={50} />

					<Separator />

					<Spacing size={50} />

					<Select
						options={backgroundColors}
						selected={formState.backgroundColor}
						title='Цвет фона'
						onChange={(value) => handleChange('backgroundColor', value)}
					/>

					<Spacing size={50} />

					<Select
						options={contentWidthArr}
						selected={formState.contentWidth}
						title='Ширина контента'
						onChange={(value) => handleChange('contentWidth', value)}
					/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};