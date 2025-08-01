"use client"
import { Button } from "@/components/ui/button";
import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useEffect } from "react";


export default function Home() {

  useEffect(()=>{
    redirect('/api/auth/login?post_login_redirect_url=/dashboard')
  },[])
  return (
    <div>
      {/* <h2>Attendence Tracker</h2>
      <Button>GetIt</Button>

      <LoginLink>Sign in</LoginLink>
      <RegisterLink>Sign up</RegisterLink> */}

    </div>
  );
}
