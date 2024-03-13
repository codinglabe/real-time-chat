import React from "react";

const GenderCheckbox = ({onChangeChekBox, selectedGender}) => {
  return (
    <div className="flex items-center">
      <div className="form-control">
        <label className={`label cursor-pointer ${selectedGender === "male" ? "selected":""}`}>
          <span className="label-text me-2 text-gray-300">Male</span>
          <input type="checkbox" defaultChecked className="checkbox  border-gray-200" 
            checked={selectedGender === "male"}
            onChange={(e)=>onChangeChekBox("male")}
          />
        </label>
      </div>
      <div className="form-control">
        <label className={`label cursor-pointer ${selectedGender === "female" ? "selected":""}`}>
          <span className="label-text me-2 text-gray-300">Female</span>
          <input type="checkbox" defaultChecked className="checkbox border-gray-200"
            checked={selectedGender === "female"}
            onChange={(e)=>onChangeChekBox("female")}
          />
        </label>
      </div>
    </div>
  );
};

export default GenderCheckbox;
