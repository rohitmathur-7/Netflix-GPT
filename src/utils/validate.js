const validateEmail = (userEmail) => {
	const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

	const res = emailRegex.test(userEmail);
	if (!res) return "Invalid Email";

	return null;
};

const validatePassword = (userPassword, isSignIn) => {
	const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

	const res = passwordRegex.test(userPassword);

	if (res) return null;

	if (isSignIn) return "Invalid Password";

	return (
		<div>
			{/* <p>Your password should be atleast 8 characters long and must contain:</p>
			<ul>
				<li>Contain at least one digit.</li>
				<li>Contain at least one lowercase letter.</li>
				<li>Contain at least one uppercase letter.</li>
			</ul> */}
		</div>
	);
};

export const checkDataValidation = (userEmail, userPassword, isSignIn) => {
	const emailRes = validateEmail(userEmail);
	const passwordRes = validatePassword(userPassword, isSignIn);

	return [emailRes, passwordRes];
};
