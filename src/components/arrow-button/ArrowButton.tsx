import arrow from 'src/images/arrow.svg';

import styles from './ArrowButton.module.scss';

/** Функция для обработки открытия/закрытия формы */
export type OnClick = () => void;

export type ArrowButtonProps = {
	onClick: OnClick;
	isOpen: boolean;
};

export const ArrowButton = ({ onClick, isOpen }: ArrowButtonProps) => {
	return (
		/* Не забываем указаывать role и aria-label атрибуты для интерактивных элементов */
		<div
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			className={
				isOpen
					? `${styles.container} ${styles.container_open}`
					: styles.container
			}
			onClick={onClick}>
			<img
				src={arrow}
				alt='иконка стрелочки'
				className={
					isOpen ? `${styles.arrow} ${styles.arrow_open}` : styles.arrow
				}
			/>
		</div>
	);
};
