import React from "react";
const ViewProfile = ()=>{
    return(
        <>
        <div className="flex text-white">
            <div className="border border-blue-900  w-[570px] h-[300px] rounded-lg mr-8 bg-gradient-to-t from-blue-600 to-blue-900 pt-6 pl-7">
                dfsdf
            </div>


            <div  className="border border-blue-900 w-[570px] h-[300px] rounded-lg bg-gradient-to-t from-blue-600 to-blue-900 pt-6 pl-7 ">
                <h1 className="text-lg font-semibold">Sender full details</h1>
                <hr className="mr-5 mt-3 mb-6"/>

                <div className="flex">
                    <div>
                        <p className="mb-2">Full Name</p>
                        <p className="mb-2">Email</p>
                        <p className="mb-2">Phone</p>
                        <p className="mb-2">Address</p>
                        <p className="mb-2">Country</p>
                        <p className="mb-2">Pin Code</p>
                    </div>
                    <div className="ml-[200px]">
                    <p className="mb-2">Amisha Raj</p>
                        <p className="mb-2">amisharaj107@gmail.com</p>
                        <p className="mb-2">914261914</p>
                        <p className="mb-2">Patna</p>
                        <p className="mb-2">India</p>
                        <p className="mb-2">890989</p>
                    </div>
                </div>

                
            </div>
        </div>
        </>
    )
}
export default ViewProfile;