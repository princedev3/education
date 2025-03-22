// import React from "react";
// import toast from "react-hot-toast";
// import ForgotPassword from "./forgot-password";
// import LoginForm from "./login-form";
// import { signIn } from "@/lib/auth";
// import Link from "next/link";

// const UserLogin = () => {
//   // const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
//   //   e.preventDefault();
//   //   setLoading(true);
//   //   const target = e.target as HTMLFormElement;
//   //   const formData = new FormData(target);
//   //   const email = formData.get("email");
//   //   const password = formData.get("password");
//   //   const res = await fetch(
//   //     `${process.env.NEXT_PUBLIC_FETCH_URL}/user/login-user`,
//   //     {
//   //       method: "POST",
//   //       body: JSON.stringify({ email, password }),
//   //     }
//   //   );
//   //   const data = await res.json();
//   //   console.log(data);
//   //   if (data.status === 200) {
//   //     toast.success("Login successful!");
//   //     router.push("/");
//   //     setLoading(false);
//   //     return;
//   //   }

//   //   setLoading(false);
//   // };

//   return (
//     <div className=" ">
//       <form
//         action={async (formData) => {
//           "use server";
//           const email = formData.get("email");
//           const password = formData.get("password");
//           console.log(password, email);
//         }}
//         className="flex flex-col gap-7"
//       >
//         <div className="flex flex-col gap-3">
//           <label
//             htmlFor=""
//             className="text-lg capitalize font-medium text-gray-800"
//           >
//             Email
//           </label>
//           <input
//             type="email"
//             name="email"
//             required
//             placeholder="Enter your Email"
//             className="p-2 outline-none border rounded-2xl text-gray-800"
//           />
//         </div>
//         <div className="flex flex-col gap-3">
//           <label
//             htmlFor=""
//             className="text-lg capitalize font-medium text-gray-800"
//           >
//             Password
//           </label>
//           <div className="w-full flex flex-col  ">
//             <div className="relative w-full ">
//               <input
//                 type={"password"}
//                 required
//                 name="password"
//                 className="p-2 outline-none border w-full rounded-2xl text-gray-800"
//               />
//             </div>
//             <ForgotPassword />
//           </div>
//         </div>

//         <div className="grid">
//           <button className="w-full items-center bg-[#1e81b0] text-white font-semibold capitalize py-3 cursor-pointer rounded-2xl">
//             Login
//           </button>
//           <Link
//             className="mx-auto text-gray-700 cursor-pointer"
//             href="/register"
//           >
//             Dont have an account? Register
//           </Link>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default UserLogin;
