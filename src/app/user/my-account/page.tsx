"use client";

import { useState } from "react";
import axios, { AxiosResponse } from "axios";
import { User } from "@/types/User";
import toast from "react-hot-toast";
import { IconCloudUpload } from "@tabler/icons-react";
import { useUser } from "@/context/AuthProvider";

const MyAccount = () => {
  const { user } = useUser();
  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Please Login</h1>
          <p className="mt-2">You need to be logged in to view this page.</p>
        </div>
      </div>
    );
  }

  const [formData, setFormData] = useState<User>(user!);
  const [editing, setEditing] = useState(false);

  const handleSave = async () => {
    try {
      const res = axios.patch("/api/user/update", formData);
      toast.promise(res, {
        loading: "Updating your information...",
        success: "Information Updated Successfully",
        error: "Oops!! Something went wrong",
      });
      setEditing(false);
    } catch (err) {
      console.error("Failed to update user", err);
    }
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    folderName: string,
    imageName: string,
    mainPath: "aadharCard" | "panCard",
    path: string
  ) => {
    if (!formData.name) {
      toast.error("Name is required for images");
      return;
    }
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 5 * 1024 * 1024) {
        alert("File size exceeds 5MB");
        return;
      }
      const imageResponse = axios.postForm("/api/helper/upload-img", {
        file,
        name: imageName,
        folderName: folderName,
      });
      console.log(imageResponse);
      toast.promise(imageResponse, {
        loading: "Uploading Image...",
        success: (data: AxiosResponse) => {
          setFormData({
            ...formData,
            [mainPath]: {
              ...formData[mainPath],
              [path]: data.data.path,
            },
          });
          return "Image Uploaded Successfully";
        },
        error: (err: unknown) => `This just happened: ${err}`,
      });
    }
  };
  const handleProfileImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    folderName: string,
    imageName: string,
    path: string
  ) => {
    if (!formData.name) {
      toast.error("Name is required for images");
      return;
    }
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 5 * 1024 * 1024) {
        alert("File size exceeds 5MB");
        return;
      }
      const imageResponse = axios.postForm("/api/helper/upload-img", {
        file,
        name: imageName,
        folderName: folderName,
      });
      console.log(imageResponse);
      toast.promise(imageResponse, {
        loading: "Uploading Image...",
        success: (data: AxiosResponse) => {
          setFormData({
            ...formData,
            [path]: data.data.path,
          });
          return "Image Uploaded Successfully";
        },
        error: (err: unknown) => `This just happened: ${err}`,
      });
    }
  };

  return (
    <div className="px-10 bg-base-100">
      {/* Profile Image */}
      <div className="grid grid-cols-1 pt-6 xl:grid-cols-3 xl:gap-4">
        <div className="col-span-full xl:col-auto">
          <div className="p-4 mb-4 bg-base-200 border border-base-content rounded-lg shadow-sm">
            <div className="items-center sm:flex xl:block 2xl:flex sm:space-x-4 xl:space-x-0 2xl:space-x-4">
              <img
                className="mb-4 rounded-lg w-28 h-28 sm:mb-0 xl:mb-4 2xl:mb-0"
                src={formData.profileImage}
                alt={formData.name}
              />
              <div>
                <h3 className="mb-1 text-xl font-bold">Profile picture</h3>
                <div className="mb-4 text-sm opacity-50">JPG Max size 5MB</div>
                <input
                  type="file"
                  className="hidden"
                  id="profileImageInput"
                  accept="image/*"
                  disabled={!editing}
                  onChange={(e) => {
                    handleProfileImageChange(
                      e,
                      "profileImage",
                      formData.name,
                      "profileImage"
                    );
                  }}
                />
                <button
                  className="btn btn-primary"
                  disabled={!editing}
                  onClick={() =>
                    document.getElementById("profileImageInput")?.click()
                  }
                >
                  <IconCloudUpload size={20} />
                  Upload Image
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* General Info */}
        <div className="col-span-2">
          <div className="p-4 bg-base-300 border border-base-content rounded-lg shadow-sm">
            <h3 className="mb-3 text-xl font-semibold">General Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="label">Name</label>
                <input
                  className="input input-primary w-full"
                  value={formData.name || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  disabled={!editing}
                />
              </div>
              <div>
                <label className="label">Mobile Number</label>
                <input
                  className="input input-primary w-full"
                  value={formData.contact || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, contact: e.target.value })
                  }
                  disabled={!editing}
                />
              </div>
              <div>
                <label className="label">Email</label>
                <input
                  className="input input-primary w-full"
                  value={formData.email || ""}
                  readOnly
                />
              </div>
              <div>
                <label className="label">Job Title</label>
                <input
                  className="input input-primary w-full"
                  value={formData.jobTitle || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, jobTitle: e.target.value })
                  }
                  disabled={!editing}
                />
              </div>
              <div>
                <label className="label">Income</label>
                <input
                  type="number"
                  className="input input-primary w-full"
                  value={formData.income || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      income: e.target.value,
                    })
                  }
                  disabled={!editing}
                />
              </div>
              <div>
                <label className="label">Credit Score</label>
                <input
                  type="number"
                  className="input input-primary w-full"
                  value={formData.creditScore || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      creditScore: e.target.value,
                    })
                  }
                  disabled={!editing}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Address */}
      <div className="col-span-12">
        <div className="p-8 bg-base-300 border border-base-content rounded-lg shadow-sm mt-4">
          <h3 className="mb-3 text-xl font-semibold">Address</h3>
          <textarea
            className="textarea textarea-primary w-full"
            value={formData.location || ""}
            onChange={(e) =>
              setFormData({ ...formData, location: e.target.value })
            }
            disabled={!editing}
          />
        </div>
      </div>

      {/* Document Uploads */}
      <div className="grid md:grid-cols-3 gap-4 mt-4">
        {/* PAN */}
        <div className="p-4 bg-base-300 border border-base-content rounded-lg">
          <h3 className="text-lg font-semibold mb-2">PAN Card</h3>
          <input
            className="input input-primary w-full mb-2"
            placeholder="PAN Number"
            value={formData.panCard?.number || ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                panCard: {
                  ...formData.panCard,
                  number: e.target.value,
                },
              })
            }
            disabled={!editing}
          />
          {formData.panCard?.image && (
            <img
              src={formData.panCard.image}
              alt="PAN"
              className="w-32 h-auto mb-2"
            />
          )}
          <input
            type="file"
            className="file-input file-input-bordered w-full"
            accept="image/*"
            disabled={!editing}
            onChange={(e) => {
              handleFileChange(e, "pan", formData.name, "panCard", "image");
            }}
          />
        </div>

        {/* Aadhar */}
        <div className="p-4 bg-base-300 border border-base-content rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Aadhar Card</h3>
          <input
            className="input input-primary w-full mb-2"
            placeholder="Aadhar Number"
            value={formData.aadharCard?.number || ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                aadharCard: {
                  ...formData.aadharCard,
                  number: e.target.value,
                },
              })
            }
            disabled={!editing}
          />
          {formData.aadharCard?.image && (
            <img
              src={formData.aadharCard.image}
              alt="Aadhar"
              className="w-32 h-auto mb-2"
            />
          )}
          <input
            type="file"
            className="file-input file-input-bordered w-full"
            accept="image/*"
            disabled={!editing}
            onChange={(e) => {
              handleFileChange(
                e,
                "aadhar",
                formData.name,
                "aadharCard",
                "image"
              );
            }}
          />
        </div>

        {/* Salary Slip */}
        <div className="p-4 bg-base-300 border border-base-content rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Salary Slip</h3>
          {formData.salarySlip && (
            <img
              src={formData.salarySlip}
              alt="Salary Slip"
              className="w-32 h-auto mb-2"
            />
          )}
          <input
            type="file"
            className="file-input file-input-bordered w-full"
            accept="image/*,application/pdf"
            disabled={!editing}
            onChange={(e) => {
              handleProfileImageChange(
                e,
                "salarySlip",
                formData.name,
                "salarySlip"
              );
            }}
          />
        </div>
      </div>

      {editing ? (
        <button
          className="btn btn-outline btn-success mt-4 w-full"
          onClick={handleSave}
        >
          Save
        </button>
      ) : (
        <button
          className="btn btn-outline btn-accent mt-4 w-full"
          onClick={() => setEditing(true)}
        >
          Edit
        </button>
      )}
    </div>
  );
};

export default MyAccount;
