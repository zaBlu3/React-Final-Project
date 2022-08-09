import React, { useEffect, useState } from "react";
import { Form, Button, Row, Col, Alert,Container,Spinner } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { ACTIONS, dispatchHelper, requests } from "../utils/Utils";





//from fields for each page
const FormFields = {
    subscriptions : [
    {
        name: "name",
        type: "text",
        placeholder: "Full Name",
        text: "make sure you enter 2 words only as fullname",
    },
    {
        name: "email",
        type: "email",
        placeholder: "Email",
        text: "email must include with @ and .",
    },
    {
        name: "city",
        type: "text",
        placeholder: "City",
    
    },],
    movies : [
            
            
        {name : "name", type : "text", placeholder : "Name", text : "min length 2"},
        {name : "premiered", type : "date", text : "between 1888-2025",css:"text-center"},
        {name : "image", type : "text", placeholder : "Name", text : "make sure to inlude protocl"},
        {name : "genres", type : "text", placeholder : "Name", text : "	please use `,` between genres"},
    
    
    
    
    ],
    users : [
        {name : "firstname", type : "text", placeholder : "First Name", text : "min length 3, Only letters"},
        {name : "lastname", type : "text", placeholder : "Last Name", text : "min length 3, Only letters"},
        {name : "username", type : "text", placeholder : "Username", text : "min length 4"},
        {name : "ViewMovies", type : "checkbox"},
        {name : "UpdateMovies", type : "checkbox"},
        {name : "DeleteMovies", type : "checkbox"},
        {name : "CreateMovies", type : "checkbox"},
        {name : "ViewSubscriptions", type : "checkbox"},
        {name : "UpdateSubscriptions", type : "checkbox"},
        {name : "DeleteSubscriptions", type : "checkbox"},
        {name : "CreateSubscriptions", type : "checkbox"},

    ]
}











function FormTemplate({title, page, dispatch, moviesOnly : findMovieById }) {
	const navigate = useNavigate();
	const InitialData = {
		subscriptions : {},
		movies:{},
		users: {permissions : {}}
	}
	const [data, setData] = useState(InitialData[page]);//store the data
	const [errors, setErrors] = useState({});//store the errors
	const [isLoading, setLoading] = useState(false);//store the loading state
	const { id } = useParams();//id from url



	
	useEffect(() => {
		async function fetch() {
			 //get the data from the server by the id - we send a request because it has error if id is not valid
			const response = await requests.getDataById(page, id);
			//if there is no error
			if (!response.errors) {
				// if im in the user form i have array of permission thats need to be set on the data object
				if (response.permissions)
				//remove spaces from name of permission and asign it to the data object as true
					response.permissions.forEach(element => {
						data.permissions[element.replace(/\s/g, "")] = true; 
					});
				//if we are in the movies page we need to add the subscriptions to the data
				else if (page === "movies"){
					//we find the movie saved in the global state and we get its subscription (subscription are not saved in the movies data base only in the frontend state)
					data.subscriptions = findMovieById(id).subscriptions
				}
				setData(() => ({ ...response, ...data }));
			} else {
				// id not vald then we alert error and we redirect to the page before
				alert(response.errors.id + "\n check the url and try again"); 
				navigate(-1);
			}
		}
		//if we are in the edit page we need to fetch data
		if (title !== ACTIONS.ADD) fetch();
	}, [id]);





	//handle data changes
	const handleData = ({ target: { name, value } }) => {
		if (name === "genres") value = value.split(",");
		setData({ ...data, [name]: value });
	};


	//hadle the checkbox fields change
	const handleCheckData = ({ target: { checked, name } }) => {
		let payload = {};
		if (checked) {
			if (name.includes("Sub") && !name.includes("View")) {//check the view subs
				document.getElementsByName("ViewSubscriptions")[0].checked = true;
				payload = { ViewSubscriptions: checked };
			} else if (name.includes("Mov") && !name.includes("View")) {//check the vie movie
				document.getElementsByName("ViewMovies")[0].checked = true;
				payload = { ViewMovies: checked };
			}
		}
		setData({
			...data,
			permissions: { ...data.permissions, ...payload, [name]: checked },
		});
	};



	//handle form submit
	const handleSubmit = async (e) => {
		//prevent page to refresh
		e.preventDefault();
		// set loading to true
		setLoading(true);
		//only viable for the user form page
		let userPermessions = {};
		///checks if we are at the users page by checking if there is permissions
		if (data.permissions) {
			//setting the user permissions to an array of strings that server can accept
			userPermessions = {
				permissions: Object.keys(data.permissions)
					.filter((key) => data.permissions[key])
					.map((key) => key.split(/(?=[A-Z])/).join(" ")),
			};
		}
		const error = await dispatchHelper(title, page, dispatch, id, {
			...data,
			...userPermessions,
		});
		if (!Object.keys(error).length) return navigate("/" + page); //if there is no error then navigate to all movies page
		setTimeout(setLoading, 1000, false);
		setTimeout(setErrors, 1000, error);
	};

	return (
		<Container className="form">
			<h1>{title + " " + page.slice(0,-1)}</h1>
		<Form onSubmit={handleSubmit} >
			{Object.keys(errors).length ? (
				<Alert variant="danger" onClose={() => setErrors({})} dismissible>
					<Alert.Heading>
						YOU GOT AN ERROR! - close error and try again
					</Alert.Heading>

					{Object.entries(errors).map(([key, value]) => {
						return (
							<p key={key}>
								<strong>{key} </strong> - {value}
							</p>
						);
					})}
				</Alert>
			) : null}
			{FormFields[page].map(({ name, type, placeholder, text, css }) => {
				return (
					<Form.Group
						key={name}
						as={Row}
						className="ml-3 mb-3"
						controlId={name}
					>
						{type === "checkbox" ? (
							<Form.Check
								type={"switch"}
								checked={data.permissions[name] ?? ""}
								name={name}
								onChange={handleCheckData}
								label={name.split(/(?=[A-Z])/).join(" ")}
							/>
						) : (
							<>
								<Form.Label className="text-capitalize mr-4" column sm={2}>
									{name}
								</Form.Label>
								<Col sm={6}>
									<Form.Control
										name={name}
										value={
											(type === "date"
												? data[name] &&
												  new Date(data[name]).toISOString().split("T")[0]
												: data[name]) ?? ""
										}
										type={type}
										className={css}
										onChange={handleData}
										placeholder={`Enter ${placeholder}`}
									/>
									{text ? (
										<Form.Text className="text-muted">{text}</Form.Text>
									) : null}
								</Col>
							</>
						)}
					</Form.Group>
				);
			})}
			<Form.Group dir="rtl" as={Row} sm={6}>
				<Button className="ml-2" size="md" variant="danger" onClick={() => navigate("/" + page)}>
					Cancel
				</Button>
				<Button
					size="md"
					variant="primary"
					type="submit"
					disabled={isLoading || Object.keys(errors).length}
				>
					{isLoading
						? <>
						Loading
						<Spinner
							as="span"
							className="mx-2"
							animation="border"
							size="sm"
							role="status"
						/>
					</>
						: title === ACTIONS.ADD
						? "Save"
						: ACTIONS.UPDATE}
				</Button>
			</Form.Group>
		</Form>
		</Container>
	);
}

export default FormTemplate;
