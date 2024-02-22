import { useState } from "react";
import "./CreateNewCategory.css";
import Popup from "~/component/Popup";
function CreateNewCate() {
  const [btnSubmit, setBtnSubmit] = useState(false);
  return (
    <>
      <div className="category-wrapper__btnAdd">
        <button
          className="category-wrapper__btnAdd--edited"
          onClick={() => setBtnSubmit(true)}
        >
          Create new
        </button>
      </div>
      <Popup trigger={btnSubmit} setTrigger={setBtnSubmit} title="Create New">
        <form className="formAddNewCate">
          <input type="text" placeholder="Category's Name" />
          <button type="submit">Submit</button>
        </form>
      </Popup>
    </>
  );
}
export default CreateNewCate;
