import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MovieContext } from "./context/MovieContext";
import { ACTIONS,requests,dispatchHelper } from "./utils/Utils";
import { Form, Button, Row, Col, Alert } from "react-bootstrap";
function AddEditMovie({ title }) {
	const navigate = useNavigate();
	const [movie, setMovie] = useState({});
	const [errors, setError] = useState({});
	const { id } = useParams();

	const { dispatch,findMovieById } = useContext(MovieContext);

	useEffect(() => {
		async function getData() {
			
				const data = await requests.getDataById("movies", id);
				if (!data.errors) {
					const {subscriptions} = findMovieById(id) 
					setMovie(() => ({ ...data, subscriptions }));
				} else {
					alert(data.errors.id + "\n check the url and try again");
					navigate(-1);
				}
			
		}
		if (title !== ACTIONS.ADD) getData();
	}, [id]);

	const handleMovieData = ({ target: { name, value } }) => {
		if (name === "genres") value = value.split(",");
		setMovie({ ...movie, [name]: value });
	};

	

	const handleSubmit = async (e) => {
	e.preventDefault()
	const error = await dispatchHelper(title,"movies",dispatch,id,movie)
	if(!Object.keys(error).length) return navigate("/movies")//if there is no error then navigate to all movies page
	setError(error)
	
	};

	return (
		<div className="addFrom">
			{Object.keys(errors).length ? (
				<Alert variant="danger" onClose={() => setError({})} dismissible>
					<Alert.Heading>YOU GOT AN ERROR!</Alert.Heading>

					{Object.entries(errors).map(([key, value]) => {
						return (
							<p key={key}>
								<strong>{key} </strong> - {value}
							</p>
						);
					})}
				</Alert>
			) : null}
			<Form onSubmit={handleSubmit}>  
				<Form.Group as={Row} className="mb-3" controlId="name">
					<Form.Label column sm={2}>
						Name
					</Form.Label>
					<Col sm={6}>
						<Form.Control
							name="name"
							value={movie.name ?? ""}
							onChange={handleMovieData}
							type="text"
							placeholder="Enter Name"
						/>
					</Col>
				</Form.Group>
				<Form.Group as={Row} className="mb-3" controlId="genres">
					<Form.Label column sm={2}>
						Genres
					</Form.Label>
					<Col sm={6}>
						<Form.Control
							name="genres"
							value={movie.genres ?? ""}
							onChange={handleMovieData}
							type="text"
							placeholder="Enter Genres"
						/>
						<Form.Text className="text-muted">
							please use `,` between genres
						</Form.Text>
					</Col>
				</Form.Group>
				<Form.Group as={Row} className="mb-3" controlId="url">
					<Form.Label column sm={2}>
						Image Url
					</Form.Label>
					<Col sm={6}>
						<Form.Control
							name="image"
							value={movie.image ?? ""}
							onChange={handleMovieData}
							type="text"
							placeholder="Enter Image Url"
						/>
						<Form.Text className="text-muted">
							make sure to inlude protocl
						</Form.Text>
					</Col>
				</Form.Group>
				<Form.Group as={Row} className="mb-3" controlId="Premiered">
					<Form.Label column sm={2}>
						Premiered
					</Form.Label>
					<Col sm={6}>
						<Form.Control
							name="premiered"
							onChange={handleMovieData}
							value={
								movie.premiered
									? new Date(movie.premiered).toISOString().split("T")[0]
									: ""
							}
							className="text-center"
							type="date"
						/>
					</Col>
				</Form.Group>

				<Button variant="primary" type="submit">
					Submit
				</Button>
			</Form>

			{/* <div className="container addMovie">
				<div className="errors">
					{Object.entries(errors).map(([key, value]) => {
						return (
							<p
								className="alert alert-danger alert-dismissible fade show"
								role="alert"
								key={value}
							>
								<strong>{key} </strong> - {value}
							</p>
						);
					})}
				</div> */}

				{/* <form onSubmit={handleSubmit}>
					<div className="form-group row">
						<label htmlFor="FirstName" className="col-sm-2 col-form-label">
							Name
						</label>
						<div className="col-sm-10">
							<input
								onChange={handleMovieData}
								name="name"
								type="text"
								className="form-control"
								id="name"
								placeholder="name"
								defaultValue={movie.name}
							/>
						</div>
					</div>
					<div className="form-group row">
						<label htmlFor="LastName" className="col-sm-2 col-form-label">
							Genres
						</label>
						<div className="col-sm-10">
							<input
								
								name="genres"
								type="text"
								className="form-control"
								id="LastName"
								placeholder="genres (please use `,` between genres)"
								value={movie ?? movie.genres}
                                onChange={handleMovieData}
							/>
						</div>
					</div>
					<div className="form-group row">
						<label htmlFor="UserName" className="col-sm-2 col-form-label">
							image url
						</label>
						<div className="col-sm-10">
							<input
								onChange={handleMovieData}
								name="image"
								type="text"
								className="form-control"
								id="UserName"
								placeholder="image url"
								defaultValue={movie.image}
							/>
						</div>
					</div>
					<div className="form-group row">
						<label htmlFor="UserName" className="col-sm-2 col-form-label">
							premiered
						</label>
						<div className="col-sm-10">
							<input
								onChange={handleMovieData}
								name="premiered"
								type="date"
								className="form-control"
								id="UserName"
								defaultValue={
									movie.premiered
										? new Date(movie.premiered).toISOString().split("T")[0]
										: null
								}
							/>
						</div>
					</div>
					<div className="form-group row">
						<div className="">
							<button type="submit" className="btn btn-primary">
								{title === "Add" ? "Save" : "Update"}
							</button>
						</div>
						<div className="">
							<button
								onClick={() => navigate("/movies")}
								className="btn btn-danger"
							>
								Cancel
							</button>
						</div>
					</div>
			</div>
				</form> */}
		</div>
	);
}

export default AddEditMovie;
