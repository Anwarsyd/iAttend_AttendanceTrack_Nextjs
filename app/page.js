"use client"
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {RegisterLink, LoginLink} from "@kinde-oss/kinde-auth-nextjs/components";


export default function Home() {
  return (
    <div>
      <h2>Attendence Tracker</h2>
      <Button>GetIt</Button>

      <LoginLink>Sign in</LoginLink>
      <RegisterLink>Sign up</RegisterLink>

    </div>
  );
}
