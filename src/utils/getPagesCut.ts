interface PagesCutResult {
	start: number;
	end: number;
  }
  
  /**
   * Calculates the range of pages to display in pagination.
   * 
   * @param totalPages - Total number of pages available
   * @param pagesCutCount - Number of pages to display in pagination
   * @param currentPage - Current active page number
   * @returns Object with start and end page numbers
   * @throws Error if input parameters are invalid
   */
  export const getPagesCut = (
	totalPages: number, 
	pagesCutCount: number, 
	currentPage: number
  ): PagesCutResult => {
	// Input validation
	if (totalPages < 1 || pagesCutCount < 1 || currentPage < 1) {
	  throw new Error('Invalid input: All parameters must be positive numbers');
	}
	if (currentPage > totalPages) {
	  throw new Error('Current page cannot be greater than total pages');
	}
  
	const beginning = Math.floor(pagesCutCount / 2);
	const ending = Math.ceil(pagesCutCount / 2);
  
	// If total pages is less than pages to show
	if (totalPages < pagesCutCount) {
	  return { start: 1, end: totalPages + 1 };
	}
	// If we're at the start
	else if (currentPage >= 1 && currentPage <= ending) {
	  return { start: 1, end: pagesCutCount + 1 };
	}
	// If we're near the end
	else if (currentPage + beginning >= totalPages) {
	  return { 
		start: totalPages - pagesCutCount + 1,
		end: totalPages + 1
	  };
	}
	// If we're in the middle
	else {
	  return { 
		start: currentPage - beginning,
		end: currentPage + ending
	  };
	}
  };