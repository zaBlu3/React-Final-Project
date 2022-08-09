import axios from "axios";

export const ACTIONS = {
    ADD: 'Add',
    UPDATE: 'Update',
    INITIALIZE: 'Initialize',
    DELETE : "Delete",
  }

const urls = {
	users: "http://localhost:8000/users/",
	movies: "http://localhost:8001/movies/",
	subscriptions: "http://localhost:8001/subscriptions/",
	login:"http://localhost:8000/login",
	register:"http://localhost:8000/register"

};


export function goToPage(permession, navigate) {
	havePermession(permession) ? navigate() : alert("you dont have permessions");
}
export function checkPermissionAnadRedirect(action, section, navigateToError) {
	if (havePermession(`${action} ${section}`)) return true; // return true if he have permission
	navigateToError(
		`You dont have the permession to ${action} on this page (${section} page) \n please contact admin for more information`
	);
	return false; // redirect and reutns flase for no permessions
}

export function checkNavLink(e, action, section) {
	//prevent navlink from moving on
	if (havePermession(`${action} ${section}`)) return; // check the permession and alert if doesnt have plus prevent default
	alert(`you dont have permessions to ${action} ${section}`);
	e.preventDefault();
}

export const checkAdmin = () => {
	return sessionStorage["username"] === "admin";
};



export const havePermession = (permession) => {
	return JSON.parse(sessionStorage["permissions"]).includes(permession);
};

export const errorFormatter = async (method) => {
	try {
		const { data } = await method();
		return data;
	} catch ({message,response}) {
        let str = "";
        if(response){
            if(response.data.errors) return response.data;
            str = ` (${response.data})`
        }
        return {
			errors: {
				error: message + str,
			},
		};
	}
};


export const requests = {
	getData: (url) => errorFormatter(() => axios.get(urls[url])),

	getDataById: (url, id) => errorFormatter(() => axios.get(urls[url] + id)),

	postData: (url, object) => errorFormatter(() => axios.post(urls[url], object)),

	updateData: (url, id, object) => errorFormatter(() => axios.patch(urls[url] + id, object)),

	deleteData: (url, id) => errorFormatter(() => axios.delete(urls[url] + id)),
};

export const dispatchHelper = async (action, section, dispatch, id, object) => {
	let data;
	switch (action) {
		case ACTIONS.ADD:
			data = await requests.postData(section, object);
			break;
		case ACTIONS.UPDATE:
			data = await requests.updateData(section, id, object);
			break;
		case ACTIONS.DELETE:
			await requests.deleteData(section, id);
            data = {_id : id};
			break;
		case ACTIONS.INITIALIZE:
			data = await requests.getData(section);
            return dispatch({ type: action, payload: data });
			
	    default:
            data.errors = "action not supported"
            break    
	}
	if (!data.errors) {
		dispatch({ type: action, payload: data });
		return {}
        
	}
    return data.errors
};
