import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContainer from "../../components/UserContainer";
import { useAuthContext } from "../../context/AuthContext";
import { supabase } from "../../lib/supabase";

const SignIn: React.FC = () => {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const { setUser } = useAuthContext();
  const navigate = useNavigate();

  const formItems = [
    {
      label: "Email or username",
      name: "email",
      type: "email",
      id: "email",
      placeholder: "Enter your email or username",
      autoComplete: "email",
      value: formValues.email,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormValues((prev) => ({ ...prev, email: e.target.value }));
      },
    },
    {
      label: "Password",
      name: "password",
      type: "password",
      id: "password",
      placeholder: "Enter your password",
      autoComplete: "password",
      value: formValues.password,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormValues((prev) => ({ ...prev, password: e.target.value }));
      },
    },
  ];
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);

  const onLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setButtonLoading(true);
    setButtonDisabled(true);

    const { email, password } = formValues;
    const { data, error: loginError } = await supabase.auth.signInWithPassword({ email, password });

    if (loginError) {
      return;
    }

    const sessionUser = data?.user;
    if (sessionUser) {
      setUser({
        id: sessionUser.id,
        username: sessionUser.email?.split("@")[0] || "",
        email: sessionUser.email || "",
        isAuthenticated: true,
      });
      navigate("/home");
    }
    setButtonLoading(false);
    setButtonDisabled(false);
  };

  return (
    <UserContainer
      title="Sign in to continue"
      subtitle="Sign in to access all the features on this app"
      buttonText="Sign In"
      onSubmit={onLogin}
      buttonDisabled={buttonDisabled}
      buttonLoading={buttonLoading}
      formItems={formItems}
      footerLink="/register"
      footerText="Do not have an account?"
    />
  );
};

export default SignIn;
