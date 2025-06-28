import React from "react";
import { Link } from "react-router-dom";
import UserPageIcon from "../../assets/svgs/UserPageIcon.svg";
import Loader from "../Loader";

type FormItems = {
  label: string;
  name: string;
  type: string;
  id: string;
  placeholder: string;
  autoComplete?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

interface UserContainerProps {
  title: string;
  subtitle: string;
  buttonText: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  buttonDisabled?: boolean;
  buttonLoading?: boolean;
  footerLink?: string;
  footerText?: string;
  formItems: FormItems[];
}

const UserContainer: React.FC<UserContainerProps> = ({
  title,
  subtitle,
  buttonText,
  onSubmit,
  buttonDisabled,
  buttonLoading,
  formItems,
  footerLink = "/register",
  footerText = "Do not have and account?",
}) => {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="bg-subbackground h-auto w-[498px] rounded-[30px]">
        <div className="bg-white h-auto w-auto mt-[11px] mx-[11px] rounded-[21px] p-12 pt-[30px] shadow-subtle">
          <div className=" flex flex-col items-center justify-center">
            <span className="rounded-full bg-icon-bg w-[53px] h-[53px] relative">
              <img src={UserPageIcon} height={20} width={20} alt="" className="absolute top-1/3 left-[28%]" />
            </span>
            <h3 className="en-heading-text">{title}</h3>
            <h6 className="en-subheading-text">{subtitle}</h6>
          </div>
          <form className="flex flex-col gap-3.5 mt-16" onSubmit={onSubmit}>
            {formItems.map((item) => (
              <div key={item.id} className="flex flex-col gap-1.5">
                <label htmlFor={item.id} className="en-label-text self-start ml-[5px]">
                  {item.label}
                </label>
                <input
                  required
                  value={item.value}
                  onChange={item.onChange}
                  autoComplete={item.autoComplete}
                  name={item.name}
                  id={item.id}
                  type={item.type}
                  placeholder={item.placeholder}
                  className="w-full en-subheading-text atlys-input-form"
                />
              </div>
            ))}
            <button
              type="submit"
              className="w-full mt-[8px] h-[50px] text-white rounded-lg en-subheading-text font-semibold hover:saturate-[4] transition-colors border border-gray-300 bg-primary cursor-pointer"
            >
              {buttonLoading ? <Loader size="sm" className="mx-auto" /> : buttonText}
              <input type="submit" disabled={buttonDisabled} className="hidden" />
            </button>
          </form>
        </div>

        <div className="flex flex-col items-center justify-center my-6">
          <span className="en-alternate-text">
            {footerText}{" "}
            <Link className="text-primary font-semibold" to={footerLink}>
              {footerLink === "/register" ? "Sign Up" : "Sign In"}
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default UserContainer;
