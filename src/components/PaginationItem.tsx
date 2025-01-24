import classNames from "classnames";


interface PaginationItemProps {
	currentPage: number;
	onPageChange: (page: number) => void;
	page: string;
	isDisabled?: boolean;
}


export const PaginationItem = ({ page, currentPage, onPageChange, isDisabled }: PaginationItemProps): JSX.Element => {

	

	const parsedPage = parseInt(page)

	const btnClasses = classNames({
		"page-item": true,
		active: parsedPage === currentPage,
		disabled: isDisabled,
	});

	const pageBtnClasses = classNames({
		"page-link": true,
		active: parsedPage === currentPage,
		disabled: isDisabled,
	});
	return (
		<button disabled={isDisabled} aria-label={`Page button ${page}`} className={btnClasses} onClick={() => onPageChange(parsedPage)}>
			<span className={pageBtnClasses}>{page}</span>
		</button>
	);
};


