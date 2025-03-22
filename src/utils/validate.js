const validateEmail = (userEmail) => {
	// First check if email contains @ symbol
	if (!userEmail.includes("@")) {
		return "Email must contain @ symbol";
	}

	// Then perform full regex validation
	const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
	const res = emailRegex.test(userEmail);

	if (!res) {
		return "Invalid Email";
	}

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

const validateFullName = (fullName, isSignIn) => {
	// Skip validation if in sign-in mode
	if (isSignIn) return null;

	// Check if name is provided for sign-up
	if (!fullName || fullName.trim() === "") {
		return "Full name is required";
	}

	// Check if name has minimum length
	if (fullName.trim().length < 2) {
		return "Name must be at least 2 characters";
	}

	// Check if name only contains letters and spaces
	const nameRegex = /^[A-Za-z\s]+$/;
	if (!nameRegex.test(fullName)) {
		return "Full name should only contain letters";
	}

	return null;
};
export const checkDataValidation = (
	fullName,
	userEmail,
	userPassword,
	isSignIn
) => {
	const emailRes = validateEmail(userEmail);
	const passwordRes = validatePassword(userPassword, isSignIn);
	const nameRes = validateFullName(fullName, isSignIn);

	return [emailRes, passwordRes, nameRes];
};
