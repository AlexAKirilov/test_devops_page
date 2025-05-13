import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	ArticleStateType,
	defaultArticleState,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const App = () => {
	const [currentStyle, setCurrentStyle] =
		useState<ArticleStateType>(defaultArticleState);
	const [showForm, setShowForm] = useState(false);

	const toggleForm = () => setShowForm((prev) => !prev);
	const applyStyles = (newStyles: ArticleStateType) =>
		setCurrentStyle(newStyles);

	const styleVariables = {
		'--font-family': currentStyle.fontFamilyOption.value,
		'--font-size': currentStyle.fontSizeOption.value,
		'--font-color': currentStyle.fontColor.value,
		'--container-width': currentStyle.contentWidth.value,
		'--bg-color': currentStyle.backgroundColor.value,
	} as CSSProperties;

	return (
		<main className={clsx(styles.main)} style={styleVariables}>
			<ArticleParamsForm
				isOpen={showForm}
				onFormBtnClick={toggleForm}
				onFormSubmit={applyStyles}
			/>
			<Article />
		</main>
	);
};

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<App />
	</StrictMode>
);
