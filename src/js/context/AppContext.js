import { createContext, useReducer } from "react";
import { TOKEN_LIST_PAGE } from "../utils/constants";

const initialState = {
	page: null,
	chromia_account: null,
	collapsed_sidebar: false
};

const actions = {
	CHANGE_PAGE: "CHANGE_PAGE",
	SET_ACCOUNT: "SET_ACCOUNT",
	TOGGLE_SIDEBAR: "TOGGLE_SIDEBAR",
};


const reducer = (state, action) => {
	switch (action.type) {
		case actions.CHANGE_PAGE:
			return { ...state, page: action.pageId };
		case actions.SET_ACCOUNT:
			return { ...state, chromia_account: action.chromia_account };
		case actions.TOGGLE_SIDEBAR:
			return { ...state, collapsed_sidebar: action.collapsed_sidebar };
		default:
			return state;
	}
};

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	const value = {
		page: state.page,
		chromia_account: state.chromia_account,
		collapsed_sidebar: state.collapsed_sidebar,
		changePage: (pageId) => {
			dispatch({ type: actions.CHANGE_PAGE, pageId });
		},
		setAccount: (chromia_account) => {
			dispatch({ type: actions.SET_ACCOUNT, chromia_account });
		},
		toggleSidebar: (collapsed_sidebar) => {
			dispatch({ type: actions.TOGGLE_SIDEBAR, collapsed_sidebar });
		}
	};

	return (
		<AppContext.Provider value={value}>
			{children}
		</AppContext.Provider>
	);
};
