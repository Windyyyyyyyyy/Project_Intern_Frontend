import React, { useState } from "react";
import "./Post.css";
import CloudUpload from "~/assets/images/upload.png";
import axios from "axios";

function Post() {
  const [image, setImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState([]);
  const [categoryId, setCategoryId] = useState(null);
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState(null);
  const [quantity, setQuantity] = useState(null);
  const [description, setDescription] = useState("");
  const [textareaValue, setTextareaValue] = useState("");

  console.log("category: ", categoryId);

  const onImageChange = (event) => {
    const files = event.target.files;
    console.log(files);
    const newImagesArray = Array.from(files);
    const firstImage = newImagesArray[0];
    console.log(firstImage);
    if (firstImage) {
      const imageUrl = URL.createObjectURL(firstImage);
      setImage(imageUrl);
    }
    setSelectedImage((prevImages) => [...prevImages, ...newImagesArray]);
  };
  console.log("images: ", selectedImage);

  const handleTextareaChange = (event) => {
    setTextareaValue(event.target.value);
    event.target.style.height = "auto";
    event.target.style.height = event.target.scrollHeight + "px";
  };

  const onFormSubmit = async () => {
    const formData = new FormData();
    selectedImage.forEach((image) => {
      formData.append(`images`, image);
    });
    formData.append("category_id", categoryId);
    formData.append("product_name", productName);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("quantity", quantity);

    const formDataObject = {};
    formData.forEach((value, key) => {
      formDataObject[key] = value;
    });
    console.log(formDataObject);

    const getTokenFromLocalStorage = () => {
      return localStorage.getItem("token");
    };
    const result = await axios.post(
      "http://localhost:8080/user/add-product",
      formData,
      {
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log(result.data);
  };

  return (
    <div className="addProduct">
      <div className="addProduct-container">
        <div className="addProduct-fields">
          <h4>Hình ảnh sản phẩm</h4>
          {image ? (
            <>
              <div className="container__images">
                <div className="container__images__wrapper">
                  <div className="container__images__wrapper__input">
                    <div className="container__images__wrapper__input--center">
                      <input
                        type="file"
                        accept="image/*"
                        className="input-field-have-image"
                        hidden
                        multiple
                        onChange={onImageChange}
                      />
                      <i className="bi bi-plus"></i>
                    </div>
                  </div>
                  <div className="container__images__wrapper__display">
                    <div className="container__images__wrapper__display--center">
                      <i className="bi bi-x-circle-fill"></i>
                      <img src={image} alt="" height={80} />
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="insert-image">
              <form
                className="image-form"
                action=""
                onClick={() => {
                  const inputField = document.querySelector(".input-field");
                  inputField.click();
                  inputField.value = null;
                }}
              >
                <input
                  type="file"
                  accept="image/*"
                  className="input-field"
                  hidden
                  onChange={onImageChange}
                />
                <img src={CloudUpload} alt="icon upload" />
                <p>Browse File to upload</p>
              </form>
            </div>
          )}
        </div>
        <div className="addProduct-fields">
          <div className="addProduct-info">
            <div className="info-fields">
              <div className="title-post">
                <h4>Thông tin chi tiết</h4>
              </div>
              <div>
                <label className="form-label">Danh mục</label>
              </div>
              <div className="select-menu">
                <select
                  className="form-select"
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                >
                  <option value="1">Xe máy</option>
                  <option value="2">Ô tô</option>
                  <option value="3">Thú cưng</option>
                  <option value="4">Thời trang</option>
                </select>
              </div>
              <div className="formInput">
                <input
                  className="inputbox"
                  type="text"
                  placeholder="Tên sản phẩm"
                  onChange={(e) => setProductName(e.target.value)}
                />
              </div>
              <div className="formInput">
                <input
                  className="inputbox"
                  type="number"
                  placeholder="Giá"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="formInput">
                <input
                  className="inputbox"
                  type="number"
                  placeholder="Số lượng"
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className="textareaInput">
                <textarea
                  placeholder="Mô tả..."
                  value={textareaValue}
                  onChange={(e) => {
                    setDescription(e.target.value);
                    handleTextareaChange(e);
                  }}
                ></textarea>
              </div>
              <div className="button-submit">
                <button onClick={onFormSubmit}>Đăng bài</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
