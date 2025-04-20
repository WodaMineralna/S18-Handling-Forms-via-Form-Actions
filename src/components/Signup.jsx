import {
  isEmail,
  isNotEmpty,
  hasMinLength,
  isEqualToOtherValue,
} from "../util/validation";

const PASSWORD_MINLENGTH = 6;

const ERROR_MESSAGES = {
  email: "Please enter a valid email.",
  password: `Password must be at least ${PASSWORD_MINLENGTH} characters long.`,
  confirmPassword: "Passwords must match.",
  firstOrLastName: "Please enter first and last name.",
  role: "Please select a role.",
  acquisition: "Please select at least one option.",
  terms: "You must agree to the terms and conditions.",
};

export default function Signup() {
  function signupAction(formData) {
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirm-password");
    const firstName = formData.get("first-name");
    const lastName = formData.get("last-name");
    const role = formData.get("role");
    const acquisition = formData.getAll("acquisition");
    const terms = formData.get("terms");

    let errors = [];

    if (!isEmail(email)) errors.push(ERROR_MESSAGES.email);
    if (!hasMinLength(password, PASSWORD_MINLENGTH))
      errors.push(ERROR_MESSAGES.password);
    if (!isEqualToOtherValue(password, confirmPassword))
      errors.push(ERROR_MESSAGES.confirmPassword);
    if (!isNotEmpty(firstName) || !isNotEmpty(lastName))
      errors.push(ERROR_MESSAGES.firstOrLastName);
    if (!isNotEmpty(role)) errors.push(ERROR_MESSAGES.role);
    if (acquisition.length === 0) errors.push(ERROR_MESSAGES.acquisition);
    if (!terms) errors.push(ERROR_MESSAGES.terms);

    console.log(errors); // testing
  }

  return (
    <form action={signupAction}>
      <h2>Welcome on board!</h2>
      <p>We just need a little bit of data from you to get you started 🚀</p>

      <div className="control">
        <label htmlFor="email">Email</label>
        <input id="email" type="email" name="email" />
      </div>

      <div className="control-row">
        <div className="control">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" />
        </div>

        <div className="control">
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            id="confirm-password"
            type="password"
            name="confirm-password"
          />
        </div>
      </div>

      <hr />

      <div className="control-row">
        <div className="control">
          <label htmlFor="first-name">First Name</label>
          <input type="text" id="first-name" name="first-name" />
        </div>

        <div className="control">
          <label htmlFor="last-name">Last Name</label>
          <input type="text" id="last-name" name="last-name" />
        </div>
      </div>

      <div className="control">
        <label htmlFor="phone">What best describes your role?</label>
        <select id="role" name="role">
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
          <option value="employee">Employee</option>
          <option value="founder">Founder</option>
          <option value="other">Other</option>
        </select>
      </div>

      <fieldset>
        <legend>How did you find us?</legend>
        <div className="control">
          <input
            type="checkbox"
            id="google"
            name="acquisition"
            value="google"
          />
          <label htmlFor="google">Google</label>
        </div>

        <div className="control">
          <input
            type="checkbox"
            id="friend"
            name="acquisition"
            value="friend"
          />
          <label htmlFor="friend">Referred by friend</label>
        </div>

        <div className="control">
          <input type="checkbox" id="other" name="acquisition" value="other" />
          <label htmlFor="other">Other</label>
        </div>
      </fieldset>

      <div className="control">
        <label htmlFor="terms-and-conditions">
          <input type="checkbox" id="terms-and-conditions" name="terms" />I
          agree to the terms and conditions
        </label>
      </div>

      <p className="form-actions">
        <button type="reset" className="button button-flat">
          Reset
        </button>
        <button className="button">Sign up</button>
      </p>
    </form>
  );
}
