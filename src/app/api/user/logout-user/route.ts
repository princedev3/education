// import { signOut } from "@/auth";
// import { NextResponse } from "next/server";

// export const POST = async () => {
//   try {
//     const res = await signOut({ redirect: false });

//     return NextResponse.json({ message: "log out", status: 200 });
//   } catch (error) {
//     console.log(error);
//     return NextResponse.json({ message: "can not log out", status: 500 });
//   }
// };

import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const redirectUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/login`;
    return NextResponse.redirect(redirectUrl, {
      headers: {
        "Set-Cookie": `authjs.session-token=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0`,
      },
    });
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json({ message: "Logout failed" }, { status: 500 });
  }
};
