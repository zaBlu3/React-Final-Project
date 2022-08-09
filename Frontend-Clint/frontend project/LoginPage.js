import React, { useContext, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import LoginContext from "./context/LoginContext";
import { LoginReducer, LoginState } from "./reducer/loginReducer";
import {
	Button,Spinner,
	Col,
	Container,
	Form,
	Alert,
	Row,
	OverlayTrigger,
	Tooltip,
} from "react-bootstrap";
import { requests } from "./utils/Utils";

function LoginPage() {
	const { setIsLogedin } = useContext(LoginContext);
	const [form, dispatch] = useReducer(LoginReducer, LoginState);
	const { register, error, loading } = form;

	const navigate = useNavigate();

	async function handleSubmit(event) {
		event.preventDefault();
		let formData = new FormData(event.currentTarget);
		let username = formData.get("username");
		let password = formData.get("password");
		dispatch({ type: "loading" });
		const data = await requests.postData(register ? "register" : "login", {
			username,
			password,
		});
		if (data.errors) return dispatch({ type: "error", payload: data.errors });
		sessionStorage["name"] = data.name;
		sessionStorage["permissions"] = JSON.stringify(data.permissions);
		sessionStorage["username"] = username;
		setIsLogedin(true);
		return navigate("/");
	}

	return (
		<>
			<Container>
				<h1 className="shadow-sm text-success mt-5 p-3 text-center rounded">
					{register ? "Register new account" : "Log In Page"}
				</h1>
				<Row className="mt-5">
					<Col
						lg={5}
						md={6}
						sm={12}
						className="p-5 m-auto shadow-sm rounded-lg"
					>
						<Form onSubmit={handleSubmit}>
							<Form.Group className="mb-3" controlId="username">
								{error.error ? (
									<Alert className="text-center" variant={"warning"}>{error.error} </Alert>
								) : null}

								<Form.Label>Username</Form.Label>
								<Form.Control
									isInvalid={!!error.username}
									autoComplete="off"
									required
									name="username"
									type="text"
									placeholder="Enter Username"
								/>
								<Form.Control.Feedback type="invalid">
									{error.username}{" "}
								</Form.Control.Feedback>
							</Form.Group>

							<Form.Group className="mb-3" controlId="password">
								<Form.Label>Password</Form.Label>
								<Form.Control
									isInvalid={!!error.password}
									required
									name="password"
									type="password"
									placeholder="Password"
								/>
								<OverlayTrigger
									placement="right"
									overlay={
										<Tooltip>
											Your password must be atleast 8 characters long, contain
											atLeast 1 letter and 1 number, and must not contain
											spaces, special characters, or emoji.
										</Tooltip>
									}
								>
									<Form.Control.Feedback type="invalid">
										{error.password}
									</Form.Control.Feedback>
								</OverlayTrigger>
							</Form.Group>

							<Form.Group className="mb-3" controlId="password">
								<Form.Text>
									{register ? (
										<span>
											To Sign in go back to the{" "}
											<a
												href=""
												onClick={(e) => {
													e.preventDefault();
													dispatch({ type: "login" });
												}}
											>
												Login Page
											</a>
										</span>
									) : (
										<span>
											New User ?{" "}
											<a
												href=""
												onClick={(e) => {
													e.preventDefault();
													dispatch({ type: "register" });
												}}
											>
												register account
											</a>
										</span>
									)}
								</Form.Text>
							</Form.Group>

							<Button
								variant="success btn-block"
								disabled={loading}
								type="submit"
							>
								{loading ? (
									<>
										Loading
										<Spinner
											as="span"
											className="mx-2"
											animation="border"
											size="sm"
											role="status"
										/>
									</>
								) : register ? (
									"Register"
								) : (
									"Login"
								)}
							</Button>
						</Form>
					</Col>
				</Row>
			</Container>
		</>
	);
}

export default LoginPage;
