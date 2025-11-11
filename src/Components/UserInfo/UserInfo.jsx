import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./UserInfo.module.css";
import img1 from "../../assets/1.jpg";
import img2 from "../../assets/2.jpg";
import img3 from "../../assets/3.jpg";
import img4 from "../../assets/4.jpg";
import img5 from "../../assets/5.jpg";
import img6 from "../../assets/6.jpg";

const images = [img1, img2, img3, img4, img5, img6];

function UserInfo({ onAdd, editData }) {
  const navigate = useNavigate();
  const [data, setData] = useState({ user: "", email: "", job: "", phone: "" });
  const [errors, setErrors] = useState({});
  const [selectedImg, setSelectedImg] = useState(null);

  useEffect(() => {
    if (editData) {
      setData({
        user: editData.user || "",
        email: editData.email || "",
        job: editData.job || "",
        phone: editData.phone || "",
      });
      setSelectedImg(editData.img || null);
    } else {
      setData({ user: "", email: "", job: "", phone: "" });
      setSelectedImg(null);
    }
  }, [editData]);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setData((p) => ({ ...p, [name]: value }));
  };

  const validate = () => {
    const temp = {};
    let ok = true;

    if (!data.user) {
      temp.user = "Username is required";
      ok = false;
    } else if (data.user.length < 7) {
      temp.user = "Username must be at least 7 characters";
      ok = false;
    } else if (!/[0-9!@#$%^&*]/.test(data.user)) {
      temp.user = "Username must include at least one number or symbol";
      ok = false;
    }

    if (!data.email) {
      temp.email = "Email is required";
      ok = false;
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      temp.email = "Email is invalid";
      ok = false;
    }

    if (!data.job) {
      temp.job = "Job is required";
      ok = false;
    }

    if (!data.phone) {
      temp.phone = "Phone is required";
      ok = false;
    } else if (!/^\d{10,15}$/.test(data.phone)) {
      temp.phone = "Phone must be 10 to 15 digits";
      ok = false;
    }

    setErrors(temp);
    return ok;
  };

  const uploadHandler = () => {
    if (!validate()) return;
    if (!selectedImg) {
      alert("Please select an avatar image!");
      return;
    }
    if (typeof onAdd === "function") onAdd({ ...data, img: selectedImg });
  };

  const cancelHandler = () => {
    setData({ user: "", email: "", job: "", phone: "" });
    setErrors({});
    setSelectedImg(null);
    navigate("/");
  };

  return (
    <div className={styles.parentInforUser}>
      <h1 className={styles.headeUserInfo}>
        {editData ? "Edit Contact" : "Add Contact"}
      </h1>
      <p className={styles.paragUserInfo}>
        {editData
          ? "Update the form below to edit the contact."
          : "Fill out the form below to add a new contact."}
      </p>

      <div className={styles.parentUserInfoPartTwo}>
        <div className={styles.inputInfo}>
          <label>
            User Name:
            <p style={{ fontSize: "10px", color: "green" }}>
              7 characters, include number & symbol ✔
            </p>
            <input
              type="text"
              name="user"
              placeholder="Alex3&9"
              value={data.user}
              onChange={changeHandler}
            />
          </label>
          {errors.user && (
            <p style={{ color: "red", fontSize: "10px" }}>{errors.user}</p>
          )}

          <label>
            Email:
            <input
              type="text"
              name="email"
              placeholder="abc@gmail.com"
              value={data.email}
              onChange={changeHandler}
            />
          </label>
          {errors.email && (
            <p style={{ color: "red", fontSize: "10px" }}>{errors.email}</p>
          )}

          <label>
            Job:
            <input
              type="text"
              name="job"
              placeholder="Mechanic"
              value={data.job}
              onChange={changeHandler}
            />
          </label>
          {errors.job && (
            <p style={{ color: "red", fontSize: "10px" }}>{errors.job}</p>
          )}

          <label>
            Phone:
            <input
              type="text"
              name="phone"
              placeholder="0123456789"
              value={data.phone}
              onChange={changeHandler}
              maxLength={15}
            />
          </label>
          {errors.phone && (
            <p style={{ color: "red", fontSize: "10px" }}>{errors.phone}</p>
          )}
        </div>

        <div style={{ display: "grid", gap: "8px", margin: "15px 0" }}>
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`avatar-${index}`}
              style={{
                width: "60px",
                height: "60px",
                borderRadius: "50%",
                border:
                  selectedImg === img ? "3px solid blue" : "1px solid gray",
                cursor: "pointer",
              }}
              onClick={() => setSelectedImg(img)}
            />
          ))}
        </div>
      </div>

      <button
        onClick={uploadHandler}
        style={{
          padding: "12px",
          borderRadius: "10px",
          margin: "8px",
          backgroundColor: "green",
          color: "#fff",
          cursor: "pointer",
        }}
      >
        {editData ? "Update" : "Upload"}
      </button>
      <button
        onClick={cancelHandler}
        style={{
          padding: "12px",
          borderRadius: "10px",
          margin: "8px",
          backgroundColor: "red",
          color: "#fff",
          cursor: "pointer",
        }}
      >
        Cancel
      </button>
    </div>
  );
}

export default UserInfo;
