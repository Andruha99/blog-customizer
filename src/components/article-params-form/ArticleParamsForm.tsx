import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';

import styles from './ArticleParamsForm.module.scss';
import { useEffect, useRef, useState } from 'react';
import { Text } from '../text';
import { Select } from '../select';
import {
	OptionType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { RadioGroup } from '../radio-group';

export type PageStylesProps = {
	fontFamily: string;
	fontSize: string;
	fontColor: string;
	containerWidth: string;
	bgColor: string;
};

export type ArticleParamsProps = {
	setPageStyles: (newPageStyles: PageStylesProps) => void;
};

export const ArticleParamsForm = (props: ArticleParamsProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [formState, setFormState] = useState(defaultArticleState);

	const formRef = useRef<HTMLFormElement | null>(null);

	const toggleOpen = () => {
		setIsOpen(!isOpen);
	};

	const handleFormChange = (value: OptionType, option: string) => {
		setFormState({ ...formState, [option]: value });
	};

	const closeByOverlay = (e: MouseEvent) => {
		if (formRef.current && !formRef.current.contains(e.target as Node)) {
			setIsOpen(false);
			console.log(formRef.current);
		}
	};

	useEffect(() => {
		document.addEventListener('mousedown', closeByOverlay);

		return () => {
			document.removeEventListener('mousedown', closeByOverlay);
		};
	}, []);

	const confirmForm = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		props.setPageStyles({
			fontFamily: formState.fontFamilyOption.value,
			fontSize: formState.fontSizeOption.value,
			fontColor: formState.fontColor.value,
			containerWidth: formState.contentWidth.value,
			bgColor: formState.backgroundColor.value,
		});

		setIsOpen(false);
	};

	const resetForm = () => {
		setFormState(defaultArticleState);

		props.setPageStyles({
			fontFamily: defaultArticleState.fontFamilyOption.value,
			fontSize: defaultArticleState.fontSizeOption.value,
			fontColor: defaultArticleState.fontColor.value,
			containerWidth: defaultArticleState.contentWidth.value,
			bgColor: defaultArticleState.backgroundColor.value,
		});
	};

	return (
		<>
			<ArrowButton onClick={toggleOpen} isOpen={isOpen} />
			<aside
				className={
					isOpen
						? `${styles.container} ${styles.container_open}`
						: styles.container
				}>
				<form className={styles.form} onSubmit={confirmForm} ref={formRef}>
					<Text size={31} uppercase weight={800}>
						Задайте параметры
					</Text>
					<Select
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						title={'Шрифт'}
						onChange={(value) => handleFormChange(value, 'fontFamilyOption')}
					/>

					<RadioGroup
						name={'radio'}
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						title={'Размер шрифта'}
						onChange={(value) => handleFormChange(value, 'fontSizeOption')}
					/>

					<Select
						selected={formState.fontColor}
						options={fontColors}
						title={'Цвет шрифта'}
						onChange={(value) => handleFormChange(value, 'fontColor')}
					/>

					<Select
						selected={formState.backgroundColor}
						options={backgroundColors}
						title={'Цвет фона'}
						onChange={(value) => handleFormChange(value, 'backgroundColor')}
					/>

					<Select
						selected={formState.contentWidth}
						options={contentWidthArr}
						title={'Ширина контента'}
						onChange={(value) => handleFormChange(value, 'contentWidth')}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' onClick={resetForm} />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
