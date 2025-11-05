// import React, { useContext, useState } from "react";
// import AuthLayout from "../../component/layouts/AuthLayout";
// import { useNavigate, Link } from "react-router-dom";
// import Input from "../../component/inputs/Input";
// import { validateEmail } from "../../utils/helper";
// import axiosInstance from "../../utils/axiosInstance";
// import { API_PATHS } from "../../utils/apiPaths";
// import { UserContext } from "../../context/UserContext";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const { updateUser } = useContext(UserContext);

//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     if (!validateEmail(email)) {
//       setError("Please enter a valid email address");
//       return;
//     }
//     if (!password) {
//       setError("Please enter the password");
//       return;
//     }

//     setError("");

//     //Login API call
//     try {
//       const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
//         email,
//         password,
//       });
//       const { token, user } = response.data;

//       if (token) {
//         localStorage.setItem("token", token);
//         updateUser(user);
//         navigate("/dashboard");
//       }
//     } catch (e) {
//       if (e.response && e.response.data.message) {
//         setError(e.response.data.message);
//       } else {
//         setError("Something went wrong. Please try again.");
//       }
//     }
//   };
//   return (
//     <AuthLayout>
//       <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
//         <h3 className="text-xl font-semibold text-black">Welcome Back</h3>
//         <p className="text-xs text-slate-700 mt-[5px] mb-6">
//           Please enter your deatils to login
//         </p>
//         <form onSubmit={handleLogin}>
//           <Input
//             value={email}
//             onChange={({ target }) => setEmail(target.value)}
//             label="Email Address"
//             placeholder="jhon@example.com"
//             type="text"
//           />

//           <Input
//             value={password}
//             onChange={({ target }) => setPassword(target.value)}
//             label="Password"
//             placeholder="Min 8 Characters"
//             type="password"
//           />
//           {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

//           <button type="submit" className="btn-primary">
//             Login
//           </button>

//           <p className="text-[13px] text-slate-800 mt-3">
//             Don't have an account?{" "}
//             <Link className="font-medium text-primary underline" to="/signup">
//               SignUp
//             </Link>
//           </p>
//         </form>
//       </div>
//     </AuthLayout>
//   );
// };

// export default Login;



import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Sparkles } from "lucide-react";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Decorative */}
      <div className="hidden lg:flex lg:w-1/2 gradient-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjIiIG9wYWNpdHk9Ii4xIi8+PC9nPjwvc3ZnPg==')] opacity-10"></div>
        <div className="relative z-10 flex flex-col justify-center px-16 text-white">
          <div className="animate-fade-up">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="h-16 w-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center animate-float">
                <Sparkles className="h-8 w-8" />
              </div>
              <h1 className="text-5xl font-bold">BalanceBin</h1>
            </div>
            <p className="text-xl text-white/90 leading-relaxed max-w-md">
              Track your finances with ease. Manage income, expenses, and achieve your financial goals.
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md animate-scale-in">
          <div className="mb-8">
            <h2 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
              Welcome Back
            </h2>
            <p className="text-muted-foreground text-lg">Please sign in to continue</p>
          </div>

          <form className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-base">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                className="h-12 text-base"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-base">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="h-12 text-base pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <Button 
              className="w-full h-12 text-base font-semibold gradient-primary border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
            >
              Sign In
            </Button>
          </form>

          <p className="mt-8 text-center text-muted-foreground">
            Don't have an account?{" "}
            <Link to="/signup" className="text-primary font-semibold hover:underline">
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;





