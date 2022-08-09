import { ACTIONS } from "../utils/Utils";


export const initalState = {
	loading: true,
};

export const Reducer = (state, action) => {
    const {type ,payload} = action
    switch (type) {
		case ACTIONS.INITIALIZE:
			return payload;
		case ACTIONS.ADD:
			state.push(payload);
			return state;
		case ACTIONS.UPDATE:
			return state.map((data) =>
				data._id === payload._id
					? { ...data, ...payload }
					: data
			);
		case ACTIONS.DELETE:
			return state.filter(({ _id }) => _id !== payload._id);
		default:
			return state;
	}
};