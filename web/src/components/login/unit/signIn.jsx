import React from "react";

export function SignIn () {

    return(
        <div className="login-container">
              <button onClick={() => window.location = "http://localhost:3001/api/google"}>Sign In</button>
        </div>
    )
}
