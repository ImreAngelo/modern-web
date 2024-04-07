"use client";
import Image from "next/legacy/image"
import "./login.css"

export default function LoginPage() {
    return (
        <div className="input-wrapper">
            <p>
                This page is only accessible to logged in users.
            </p>
            <form className="input-form">
                <div style={{
                    display:'flex',
                    justifyContent:'center',
                    padding:'0 0 2rem 0'
                }}>
                    <Image
                        src="/next.svg"
                        alt="Next.js Logo"
                        style={{
                            filter:'invert(1)'
                        }}
                        width={180}
                        height={37}
                        priority
                    />
                </div>
                <input 
                    className="input-field"
                    placeholder="mail"
                    type="mail"
                    name="username"
                />
                <input 
                    className="input-field"
                    placeholder="password"
                    type="password"
                    name="pass"
                />
                <btn 
                    className="input-btn"
                    onClick={() => {
                        console.log("TODO")
                    }}
                >
                    Login
                </btn>
            </form>
        </div>
    )
}