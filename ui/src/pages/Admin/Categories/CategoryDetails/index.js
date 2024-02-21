import "./CategoryDetails.css";
import Button from "~/component/Button";
function CategoryDetails() {
  return (
    <div className="category-details__wrapper">
      <div className="category-details__wrapper__title">
        <h2>Category Details</h2>
      </div>
      <div className="category-details__wrapper__content">
        <form className="formChangeCate">
          <div className="formChangeCate__inputs">
            <label htmlFor="category_id">ID</label>
            <input type="text" id="category_id" name="category_id" disabled />
          </div>
          <div className="formChangeCate__inputs">
            <label htmlFor="category_name">Category's Name</label>
            <input type="text" id="category_name" name="category_name" />
          </div>
          <div className="formChangeCate__inputs">
            <label htmlFor="is_active">Status</label>
            <input type="text" id="is_active" name="is_active" />
          </div>
          <div className="formChangeCate__button">
            <Button type="submit" value="Save" />
          </div>
        </form>
      </div>
    </div>
  );
}
export default CategoryDetails;
