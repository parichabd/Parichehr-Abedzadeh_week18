import { useEffect, useState } from "react";
import InputField from "./InputField";
import AvatarModal from "./AvatarModal.jsx";
import styles from "./UserInfo.module.css";
import defaultUser from "../../assets/d8b5d0a738295345ebd8934b859fa1fca1c8c6ad.jpeg";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  user: yup
    .string()
    .required("Username is required")
    .min(7, "Minimum 7 characters")
    .matches(/[0-9!@#$%^&*]/, "Must include at least one number or symbol"),

  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format"),

  job: yup.string().required("Job is required"),

  phone: yup
    .string()
    .required("Phone is required")
    .matches(/^\d{10,15}$/, "Phone must be 10–15 digits"),
});

function UserInfo({ onAdd, editData }) {
  const [selectedImg, setSelectedImg] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      user: "",
      email: "",
      job: "",
      phone: "",
    },
  });

  useEffect(() => {
    if (editData) {
      setValue("user", editData.user);
      setValue("email", editData.email);
      setValue("job", editData.job);
      setValue("phone", editData.phone);
      setSelectedImg(editData.img);
    }
  }, [editData, setValue]);

  const onSubmit = (formData) => {
    if (!selectedImg) {
      alert("Please select an avatar image");
      return;
    }

    onAdd({
      ...formData,
      img: selectedImg,
    });

    reset();
    setSelectedImg("");
  };

  return (
    <>
      <div className={styles.UserInfoContainer}>
        <section className={styles.leftContainer}>
          <div className={styles.titleTextCont}>
            <h1>{editData ? "Edit User" : "Add User"}</h1>
            <p className={styles.titleText}>Fill the form to continue</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <InputField
              label="User Name"
              name="user"
              register={register}
              error={errors.user?.message}
              placeholder="Alex3&9"
            />

            <InputField
              label="Email"
              name="email"
              register={register}
              error={errors.email?.message}
              placeholder="abc@gmail.com"
            />

            <InputField
              label="Job"
              name="job"
              register={register}
              error={errors.job?.message}
              placeholder="Mechanic"
            />

            <InputField
              label="Phone"
              name="phone"
              register={register}
              error={errors.phone?.message}
              placeholder="0123456789"
            />

            <div className={styles.imageSelectorWrapper}>
              <label className={styles.imageLabel}>Image:</label>
              {selectedImg ? (
                <span className={styles.imageStatusSelected}>
                  Image Selected
                </span>
              ) : (
                <span className={styles.imageStatusNotSelected}>
                  Image Not Selected
                </span>
              )}
              <button
                type="button"
                className={styles.select}
                onClick={() => setOpenModal(true)}
              >
                Select Image
              </button>
            </div>

            <button type="submit" className={styles.button}>
              {editData ? "Update" : "Upload"}
            </button>
          </form>
        </section>

        <section className={styles.rightContainer}>
          {selectedImg ? (
            <img
              src={selectedImg}
              alt="Selected avatar"
              className={styles.selectedAvatar}
            />
          ) : (
            <img
              src={defaultUser}
              alt="Default avatar"
              className={styles.selectedAvatar}
            />
          )}
        </section>
      </div>

      <AvatarModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        onSelect={setSelectedImg}
      />
    </>
  );
}

export default UserInfo;
