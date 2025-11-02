// src/components/auth/GoogleButton.jsx
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginWithGoogle } from "../../../features/userAuthSlice"; 

const GOOGLE_CLIENT_ID = "778600902236-f976jp5oclk3dm7un2j12i17a1jgillf.apps.googleusercontent.com";

export default function GoogleButton() {
  const dispatch = useDispatch();

  useEffect(() => {
    /* 1) Google script add */
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    script.onload = () => {
      /* 2) initialize */
      window.google?.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: (response) => {
          // response.credential is the ID token (JWT)
          const id_token = response.credential;
          console.log(id_token);
          dispatch(loginWithGoogle(id_token));

        },
      });

      /* 3) render button */
      window.google?.accounts.id.renderButton(
        document.getElementById("g_id_signin"),
        { theme: "outline", size: "large" } // কাস্টমাইজ করুন
      );

      /* Optional: prompt One Tap */
      // window.google?.accounts.id.prompt();
    };

    return () => {
      document.body.removeChild(script);
    };
  }, [dispatch]);

  return <div id="g_id_signin"></div>;
}
