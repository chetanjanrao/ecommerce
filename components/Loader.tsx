import React from "react";

function Loader(){
     return(
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900">
        </div>
      </div>
     ) 
}
export default Loader;