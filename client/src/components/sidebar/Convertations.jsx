import React from "react";
import Convertation from "./Convertation";
import useGetConversations from "../../hooks/useGetConversations";

const Convertations = () => {
  const { convertations, loading  } = useGetConversations();
  return (
    <div className="py-2 flex flex-col overflow-y-auto">
      {
        convertations?.map((convertation, index) =>(
          <Convertation
            key={convertation._id}
            convertation={convertation}
          />
        ))
      }
    </div>
  );
};

export default Convertations;
