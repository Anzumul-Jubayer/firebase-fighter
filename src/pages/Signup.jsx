import { Link, useNavigate } from "react-router";
import MyContainer from "../components/MyContainer";
import { toast } from "react-toastify";
import { useContext, useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { AuthContext } from "../context/AuthContext";

const Signup = () => {
  const {
    createUser,
    updateProfileFunc,
    sendVerificationMail,
    SetLoading,
    signOutFunc,
    setUser,
    user
  } = useContext(AuthContext);

  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  if(user){
    return navigate('/')
  }
  const handleSignup = (event) => {
    event.preventDefault();
    SetLoading(true); // start loader

    const displayName = event.target.name.value;
    const photoURL = event.target.photo.value;
    const email = event.target.email.value;
    const password = event.target.password.value;

    const regEx =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+={}[\]|;:'",.<>/?`~\\]).{8,}$/;
    if (!regEx.test(password)) {
      SetLoading(false);
      return toast.error(
        "Password must be 8+ chars with uppercase, lowercase, number & symbol."
      );
    }

    createUser(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        updateProfileFunc(user, displayName, photoURL)
          .then(() => {
            sendVerificationMail(user)
              .then(() => {
                event.target.reset();
                signOutFunc()
                  .then(() => {
                    setUser(null);
                    toast.success(
                      "Signup successful. Check your email to activate your account"
                    );
                    navigate("/signin");
                  })
                  .catch((err) => {
                    console.log(err);
                    toast.error(err.message);
                  })
                  .finally(() => SetLoading(false)); // stop loader after signout
              })
              .catch((err) => {
                toast.error(err.message);
                SetLoading(false); // stop loader on error
              });
          })
          .catch((err) => {
            toast.error(err.message);
            SetLoading(false); // stop loader on error
          });
      })
      .catch((err) => {
        console.log(err);
        console.log(err.code);

        if (err.code === "auth/email-already-in-use") {
          toast.error("User already registered. Please log in.");
        } else if (err.code === "auth/invalid-email") {
          toast.error("Invalid email format.");
        } else if (err.code === "auth/operation-not-allowed") {
          toast.error("Email/password sign-in is disabled.");
        } else if (err.code === "auth/weak-password") {
          toast.error("Password must be at least 6 characters.");
        } else if (err.code === "auth/user-disabled") {
          toast.error("Your account has been disabled.");
        } else if (err.code === "auth/user-not-found") {
          toast.error("No account found with this email.");
        } else if (err.code === "auth/wrong-password") {
          toast.error("Incorrect password.");
        } else if (err.code === "auth/too-many-requests") {
          toast.error("Too many attempts. Please try again later.");
        } else if (err.code === "auth/network-request-failed") {
          toast.error("Network error. Check your connection.");
        } else if (err.code === "auth/internal-error") {
          toast.error("Something went wrong. Try again.");
        } else if (err.code === "auth/popup-closed-by-user") {
          toast.error("Sign-in was cancelled.");
        } else if (err.code === "auth/account-exists-with-different-credential") {
          toast.error(
            "This email is already linked with another sign-in method."
          );
        } else if (err.code === "auth/credential-already-in-use") {
          toast.error("This credential is already in use.");
        } else if (err.code === "auth/invalid-credential") {
          toast.error("Invalid credentials provided.");
        } else {
          toast.error(err.message);
        }

        SetLoading(false); // stop loader on error
      });
  };

  return (
    <div className="min-h-[96vh] flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 relative overflow-hidden">
      {/* Animated floating circles */}
      <div className="absolute inset-0">
        <div className="absolute w-72 h-72 bg-pink-400/30 rounded-full blur-2xl top-10 left-10 animate-pulse"></div>
        <div className="absolute w-72 h-72 bg-purple-400/30 rounded-full blur-2xl bottom-10 right-10 animate-pulse"></div>
      </div>

      <MyContainer>
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10 p-6 lg:p-10 text-white">
          <div className="max-w-lg text-center lg:text-left">
            <h1 className="text-5xl font-extrabold drop-shadow-lg">
              Create Your Account
            </h1>
            <p className="mt-4 text-lg text-white/80 leading-relaxed">
              Join our community and unlock exclusive features. Your journey
              begins here!
            </p>
          </div>

          <div className="w-full max-w-md backdrop-blur-lg bg-white/10 border border-white/20 shadow-2xl rounded-2xl p-8">
            <h2 className="text-2xl font-semibold mb-6 text-center text-white">
              Sign Up
            </h2>

            <form onSubmit={handleSignup} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="your name"
                  className="input input-bordered w-full bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Photo</label>
                <input
                  type="text"
                  name="photo"
                  placeholder="photo url"
                  className="input input-bordered w-full bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="example@email.com"
                  className="input input-bordered w-full bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
              </div>

              <div className="relative">
                <label className="block text-sm font-medium mb-1">
                  Password
                </label>
                <input
                  type={show ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  className="input input-bordered w-full bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-pink-400"
                />

                <span
                  onClick={() => setShow(!show)}
                  className="absolute right-[8px] top-[36px] cursor-pointer z-50 "
                >
                  {show ? <AiFillEye /> : <AiFillEyeInvisible />}
                </span>
              </div>

              <button type="submit" className="my-btn">
                Sign Up
              </button>

              <div className="text-center mt-3">
                <p className="text-sm text-white/80">
                  Already have an account?{" "}
                  <Link
                    to="/signin"
                    className="text-pink-300 hover:text-white font-medium underline"
                  >
                    Sign in
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </MyContainer>
    </div>
  );
};

export default Signup;
