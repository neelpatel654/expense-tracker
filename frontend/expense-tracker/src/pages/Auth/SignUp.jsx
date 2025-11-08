import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Sparkles, Upload, User } from "lucide-react";
import { validateEmail } from "../../utils/helper";
import uploadImage from "../../utils/uploadImage";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/UserContext";

const SignUp = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  // handle profile pic selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProfilePic(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!fullName) {
      setError("Please enter full name");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }
    if (!password) {
      setError("Please enter the password");
      return;
    }

    setError("");
    setLoading(true);

    try {
      let profileImageUrl = "";
      // Upload image if selected
      if (profilePic) {
        try {
          const imgUploadRes = await uploadImage(profilePic);
          profileImageUrl = imgUploadRes.imageUrl || "";
        } catch (err) {
          setError(err.message);
          setLoading(false);
          return;
        }
      }

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        fullName,
        email,
        password,
        profileImageUrl,
      });

      const { token, user } = response.data;
      if (token) {
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/login");
      }
    } catch (e) {
      if (e.response && e.response.data.message) {
        setError(e.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

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
              Start your journey to financial freedom. Join thousands of users
              managing their money smarter.
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Signup Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-xl animate-scale-in">
          <div className="mb-8">
            <h2 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
              Create Account
            </h2>
            <p className="text-muted-foreground text-lg">
              Get started with your financial journey
            </p>
          </div>

          <form onSubmit={handleSignUp} className="space-y-6">
            {/* Profile Picture Upload */}
            <div className="flex justify-center mb-8">
              <div className="relative group">
                <div className="h-28 w-28 rounded-full bg-gradient-to-br from-primary/20 to-primary-light/20 flex items-center justify-center border-4 border-white shadow-lg overflow-hidden">
                  {previewUrl ? (
                    <img
                      src={previewUrl}
                      alt="Profile Preview"
                      className="h-full w-full object-cover rounded-full"
                    />
                  ) : (
                    <User className="h-14 w-14 text-primary" />
                  )}
                </div>
                <label
                  htmlFor="profilePic"
                  className="absolute bottom-0 right-0 h-10 w-10 rounded-full gradient-primary text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-all hover:scale-110 cursor-pointer"
                >
                  <Upload className="h-5 w-5" />
                </label>
                <input
                  id="profilePic"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-base">
                  Full Name
                </Label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="John Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="h-12 text-base"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-base">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 text-base"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-base">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Min 8 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 text-base pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 text-base font-semibold gradient-primary border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </Button>
          </form>

          <p className="mt-8 text-center text-muted-foreground">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-primary font-semibold hover:underline"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
