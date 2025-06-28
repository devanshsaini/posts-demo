import React, { useState } from "react";
import UserContainer from "../../components/UserContainer";
import { useAuthContext } from "../../context/AuthContext";
import { supabase } from "../../lib/supabase";

const SignUp: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    "repeat-password": "",
  });

  const formItems = [
    {
      label: "Email or username",
      name: "email",
      type: "email",
      id: "email",
      placeholder: "Enter your email or username",
      autoComplete: "email",
      value: formData.email,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({ ...prev, email: e.target.value }));
      },
    },
    {
      label: "Password",
      name: "password",
      type: "password",
      id: "password",
      placeholder: "Enter your password",
      autoComplete: "password",
      value: formData.password,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({ ...prev, password: e.target.value }));
      },
    },
    {
      label: "Repeat password",
      name: "repeat-password",
      type: "repeat-password",
      id: "repeat-password",
      placeholder: "Enter your password again",
      autoComplete: "repeat-password",
      value: formData["repeat-password"],
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({ ...prev, "repeat-password": e.target.value }));
      },
    },
  ];
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);

  const { setUser } = useAuthContext();

  const onSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setButtonLoading(true);
    setButtonDisabled(true);

    const { email, password } = formData;
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      console.error("Error signing up:", error.message);
      setButtonLoading(false);
      setButtonDisabled(false);
      return;
    }

    const sessionUser = data?.user;
    if (sessionUser) {
      setUser({
        id: sessionUser.id,
        email: sessionUser.email || "",
        username: sessionUser.email?.split("@")[0] || "",
        isAuthenticated: true,
      });
    }

    setButtonLoading(false);
    setButtonDisabled(false);
  };

  return (
    <UserContainer
      title="Create an account to continue"
      subtitle="Create an account to access all the features on this app"
      buttonText="Sign Up"
      onSubmit={onSignUp}
      buttonDisabled={buttonDisabled}
      buttonLoading={buttonLoading}
      formItems={formItems}
      footerLink="/login"
      footerText="Already have an account?"
    />
  );
};

export default SignUp;
