import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { signupData } from "../dal/dal";

export default function Register() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log(data); // handle signup logic here
    try {
      const result = await signupData(data);
      console.log("Logged in:", result);
      navigate("/dashboard");
    } catch (error) {
      console.log("Error in login", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200">
      <div className="card w-80 bg-base-100 shadow-md p-6">
        <h2 className="card-title justify-center mb-4">Sign Up</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="form-control">
          <input
            type="text"
            placeholder="Full Name"
            {...register("username", { required: true })}
            className="input input-bordered mb-3"
          />
          <input
            type="email"
            placeholder="Email"
            {...register("email", { required: true })}
            className="input input-bordered mb-3"
          />
          <input
            type="password"
            placeholder="Password"
            {...register("password", { required: true })}
            className="input input-bordered mb-3"
          />
          <button type="submit" className="btn btn-neutral w-full">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
