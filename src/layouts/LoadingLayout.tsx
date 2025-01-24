import { createPortal } from "react-dom"
import '../styles/loadingLayout.scss'
import LoadingSpinner from "../components/LoadingSpinner"

interface LoadingLayoutProps {
	isLoading: boolean
}
/**
 * Renders a loading layout with a spinner if isLoading is true.
 * Utilizes React's createPortal to render the loading spinner in the root element.
 * 
 * @param {LoadingLayoutProps} props - The props containing isLoading state.
 * @returns {React.ReactPortal} - A portal containing the loading spinner or null if not loading.
 */
export const LoadingLayout = ({ isLoading }: LoadingLayoutProps): React.ReactPortal => {
	return (
		createPortal(
			isLoading && <div data-testid="loading-layout" className="loading-layout">
				<LoadingSpinner />
			</div>, document.getElementById("root") || document.createElement("div")
		)

	)
}
