"use client";

import { useFormStatus } from "react-dom";

const RegisterButton = () => {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
    >
      {pending ? "Registering..." : "Register"}
    </button>
  );
};

export default RegisterButton;
