import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import RegisterChoice from "../../../components/Auth/RegisterChoice";
import StudentRegisterForm from "../../../components/Auth/StudentRegisterForm";
import TeacherRegisterForm from "../../../components/Auth/TeacherRegisterForm";

export default function RegisterPage() {
  const router = useRouter();
  const { role } = router.query;
  const [selectedRole, setSelectedRole] = useState(null);

  useEffect(() => {
    if (role === "student" || role === "teacher") {
      setSelectedRole(role);
    } else {
      setSelectedRole(null);
    }
  }, [role]);

  const handleSuccess = (data) => {
    console.log("Registration successful:", data);
    router.push("/dashboard"); // Redirect after successful registration
  };

  const renderForm = () => {
    if (selectedRole === "student") {
      return <StudentRegisterForm onSuccess={handleSuccess} />;
    } else if (selectedRole === "teacher") {
      return <TeacherRegisterForm onSuccess={handleSuccess} />;
    } else {
      return <RegisterChoice />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {renderForm()}
      </motion.div>
    </div>
  );
}
