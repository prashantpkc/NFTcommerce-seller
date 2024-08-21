import React from "react";
import image2 from "./image2.png";
import { FaGoogle } from "react-icons/fa";

const Login = ()=>{

    return (
        <>
        <div className="bg-gradient-to-t from-purple-500 to-blue-500 w-full min-h-screen flex">
            <div >
                <img src={image2} className="ml-28" style={{marginTop:"100px"}}/>
            </div>

            <div >
                <div style={{marginLeft:"100px",marginTop:"70px",color:"white"}}>
                    <h1 style={{fontWeight:"bold",fontSize:"24px",marginBottom:"20px"}}>Welcome to CENTUMO NFT marketplace</h1>
                    <p>Sign In your credential!</p>
                    <p style={{marginTop:"10px",marginLeft:"180px",marginBottom:"5px"}}>Sign In with</p>
                    <button className="border border-white rounded-2xl absolute" style={{width:"450px",height:"35px"}}> Google</button>
                    <FaGoogle className="relative ml-44 mt-3 text-yellow-200"/>

                    <div style={{ display: 'flex', alignItems: 'center', margin: '20px 0' }}>
                        <hr style={{ flex: 1, border: 'none', borderTop: '1px solid white', marginLeft:"10px"}} />
                        <span style={{ padding: '0 10px', fontWeight: 'bold' }}>OR</span>
                        <hr style={{ flex: 1, border: 'none', borderTop: '1px solid white' }} />
                    </div>

                    <h1>Email</h1>
                    <input className="border border-white rounded-2xl absolute text-black" style={{width:"450px",height:"35px",paddingLeft:"180px"}}/><br/><br/>

                    <h1>Password</h1>
                    <input className="border border-white rounded-2xl absolute text-black" style={{width:"450px",height:"35px",paddingLeft:"180px"}}/><br/><br/>

                    <h1 style={{color:"yellow",marginLeft:"320px",marginBottom:"5px"}}>Forgot Password</h1>

                    <button className="bg-yellow-300 text-black rounded-2xl absolute" style={{width:"450px",height:"35px"}}>Sign In</button><br/><br/>


                    <p style={{marginLeft:"160px"}}>Haven't an account?</p>
                    <button className="border border-white rounded-2xl" style={{width:"250px",height:"35px",
                        marginLeft:"100px"
                    }}>
                        Create Account
                    </button>
                
                </div>
            </div>  

        </div>
        </>
    )
}
export default Login;
