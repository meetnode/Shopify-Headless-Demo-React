import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components";
import toast from "react-hot-toast";
import customerApi from "../api/customer";

const Register = () => {
  const navigate = useNavigate();
  const formattedData = {
    firstName: "",
    lastName: "",
    email: "",
    // phone: "",
    password: "",
    acceptsMarketing: false,
  };
  const [data, setData] = useState(formattedData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value, checked } = e.target;
    if (name === "acceptsMarketing") {
      value = checked;
    }

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const createCustomer = await customerApi.create(data);
      console.log(createCustomer, "createCustomer");
      toast.success("You have registered successfully");
      navigate("/login");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="max-w-screen-2xl mx-auto pt-24 flex items-center justify-center">
      <form
        onSubmit={handleRegister}
        className="max-w-5xl mx-auto flex flex-col gap-5 max-sm:gap-3 items-center justify-center max-sm:px-5"
      >
        <h2 className="text-5xl text-center mb-5 font-thin max-md:text-4xl max-sm:text-3xl max-[450px]:text-xl max-[450px]:font-normal">
          Welcome! Register here
        </h2>
        <div className="flex flex-col gap-2 w-full">
          <div className="flex gap-4 max-sm:flex-col">
            <div className="flex flex-col gap-1 flex-1">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                className="bg-white border border-black text-lg py-2 px-3 w-full outline-none max-[450px]:text-base"
                placeholder="Enter first name"
                id="firstName"
                name="firstName"
                value={data.firstName}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col gap-1 flex-1">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                className="bg-white border border-black text-lg py-2 px-3 w-full outline-none max-[450px]:text-base"
                placeholder="Enter last name"
                id="lastName"
                name="lastName"
                value={data.lastName}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex gap-4 max-sm:flex-col">
            <div className="flex flex-col gap-1 flex-1">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="bg-white border border-black text-lg py-2 px-3 w-full outline-none max-[450px]:text-base"
                placeholder="Enter email address"
                id="email"
                name="email"
                value={data.email}
                onChange={handleChange}
                required
              />
            </div>
            {/* <div className="flex flex-col gap-1 flex-1">
              <label htmlFor="phone">Phone</label>
              <input
                type="tel"
                className="bg-white border border-black text-lg py-2 px-3 w-full outline-none max-[450px]:text-base"
                placeholder="Enter phone number (+XX-XXXX-XXXX)"
                id="phone"
                name="phone"
                value={data.phone}
                onChange={handleChange}
              />
            </div> */}
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="bg-white border border-black text-lg py-2 px-3 w-full outline-none max-[450px]:text-base"
              placeholder="Enter password"
              id="password"
              name="password"
              value={data.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex items-center gap-2 mt-2">
            <input
              type="checkbox"
              id="acceptsMarketing"
              name="acceptsMarketing"
              onChange={handleChange}
            />
            <label htmlFor="acceptsMarketing">
              I agree to receive marketing emails
            </label>
          </div>
        </div>

        <Button type="submit" text="Register" mode="brown" />
        <Link
          to="/login"
          className="text-xl max-md:text-lg max-[450px]:text-sm"
        >
          Already have an account?{" "}
          <span className="text-secondaryBrown">Login now</span>
        </Link>
      </form>
    </div>
  );
};

export default Register;
