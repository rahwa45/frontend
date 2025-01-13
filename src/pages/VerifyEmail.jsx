import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSnackbar } from "notistack";

const VerifyEmail = () => {
  const { token } = useParams(); // Get the token from the URL params
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        // Send the token to the backend for verification
        await axios.get(
          `https://backend-6wvj.onrender.com/user/verify/${token}`
        );
        enqueueSnackbar("Email verified successfully!", { variant: "success" });
        navigate("/");
      } catch (error) {
        enqueueSnackbar("Invalid or expired token", { variant: "error" });
        console.error("Verification error:", error);
      } finally {
        setLoading(false);
      }
    };

    if (token) verifyEmail(); // Call verifyEmail only if token is defined
  }, [token, enqueueSnackbar, navigate]);

  return (
    <div>
      <h1>Email Verification</h1>

      {loading ? (
        <p>Please wait while we verify your email...</p>
      ) : (
        <p>Email verification complete.</p>
      )}
    </div>
  );
};

export default VerifyEmail;
