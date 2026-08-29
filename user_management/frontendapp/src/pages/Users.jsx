import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Users() {
  const apiUrl = "http://127.0.0.1:8000/api/users/";

  const [users, setUsers] = useState([]);

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    age: "",
  });

  const [errors, setErrors] = useState({});
  const [editId, setEditId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const [selectedUser, setSelectedUser] = useState(null);
  const [userToDelete, setUserToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);


  const fetchUsers = async () => {
    try {
      setLoading(true);

      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      const data = await response.json();

      setUsers(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Fetch error:", error);

      setMessage({
        type: "danger",
        text: "Failed to connect to the backend server.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);


  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((previousForm) => ({
      ...previousForm,
      [name]: value,
    }));

    setErrors((previousErrors) => ({
      ...previousErrors,
      [name]: "",
    }));
  };

 
  const validateForm = () => {
    const newErrors = {};

    const firstName = form.first_name.trim();
    const lastName = form.last_name.trim();
    const email = form.email.trim();

    if (!firstName) {
      newErrors.first_name = "First name is required.";
    } else if (firstName.length < 2) {
      newErrors.first_name =
        "First name must contain at least 2 characters.";
    } else if (firstName.length > 50) {
      newErrors.first_name =
        "First name cannot exceed 50 characters.";
    } else if (!/^[A-Za-z\s]+$/.test(firstName)) {
      newErrors.first_name =
        "First name can contain only letters and spaces.";
    }

    if (!lastName) {
      newErrors.last_name = "Last name is required.";
    } else if (lastName.length < 2) {
      newErrors.last_name =
        "Last name must contain at least 2 characters.";
    } else if (lastName.length > 50) {
      newErrors.last_name =
        "Last name cannot exceed 50 characters.";
    } else if (!/^[A-Za-z\s]+$/.test(lastName)) {
      newErrors.last_name =
        "Last name can contain only letters and spaces.";
    }

    if (!email) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Enter a valid email address.";
    }


    if (form.age === "") {
      newErrors.age = "Age is required.";
    } else if (!Number.isInteger(Number(form.age))) {
      newErrors.age = "Age must be a whole number.";
    } else if (Number(form.age) < 18) {
      newErrors.age = "User must be at least 18 years old.";
    } else if (Number(form.age) > 100) {
      newErrors.age = "Age cannot be greater than 100.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };


  const resetForm = () => {
    setForm({
      first_name: "",
      last_name: "",
      email: "",
      age: "",
    });

    setErrors({});
    setEditId(null);
  };

 
  const handleBackendErrors = (errorData) => {
    const backendErrors = {};

    if (typeof errorData !== "object" || errorData === null) {
      return;
    }

    Object.keys(errorData).forEach((field) => {
      const value = errorData[field];

      if (Array.isArray(value)) {
        backendErrors[field] = value[0];
      } else if (typeof value === "string") {
        backendErrors[field] = value;
      } else {
        backendErrors[field] = "Invalid value.";
      }
    });

    setErrors(backendErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");

    if (!validateForm()) {
      return;
    }

    try {
      setSubmitting(true);

      const userData = {
        first_name: form.first_name.trim(),
        last_name: form.last_name.trim(),
        email: form.email.trim().toLowerCase(),
        age: Number(form.age),
      };

      const url = editId
        ? `${apiUrl}${editId}/`
        : apiUrl;

      const method = editId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        let errorData = {};

        try {
          errorData = await response.json();
        } catch {
          errorData = {};
        }

        console.error(
          "Backend validation errors:",
          errorData
        );

        if (response.status === 400) {
          handleBackendErrors(errorData);

          setMessage({
            type: "danger",
            text: "Please correct the validation errors.",
          });

          return;
        }

        if (response.status === 404) {
          setMessage({
            type: "danger",
            text: "User not found.",
          });

          return;
        }

        setMessage({
          type: "danger",
          text: "Operation failed. Please try again.",
        });

        return;
      }

      const savedUser = await response.json();

      if (editId) {
        setUsers((previousUsers) =>
          previousUsers.map((user) =>
            user.id === editId ? savedUser : user
          )
        );
      } else {
        setUsers((previousUsers) => [
          ...previousUsers,
          savedUser,
        ]);
      }

      setMessage({
        type: "success",
        text: editId
          ? "User updated successfully."
          : "User added successfully.",
      });

      resetForm();

      setTimeout(() => {
        setMessage("");
      }, 3000);

    } catch (error) {
      console.error("Submit error:", error);

      setMessage({
        type: "danger",
        text: "Something went wrong. Check if the backend server is running.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!userToDelete) {
      return;
    }

    try {
      setDeleting(true);

      const response = await fetch(
        `${apiUrl}${userToDelete.id}/`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Delete failed");
      }

      setUsers((previousUsers) =>
        previousUsers.filter(
          (user) => user.id !== userToDelete.id
        )
      );

      setMessage({
        type: "success",
        text: "User deleted successfully.",
      });

      setUserToDelete(null);

      setTimeout(() => {
        setMessage("");
      }, 3000);

    } catch (error) {
      console.error("Delete error:", error);

      setMessage({
        type: "danger",
        text: "Failed to delete the user.",
      });
    } finally {
      setDeleting(false);
    }
  };


  const handleEdit = (user) => {
    setForm({
      first_name: user.first_name || "",
      last_name: user.last_name || "",
      email: user.email || "",
      age: user.age ? String(user.age) : "",
    });

    setErrors({});
    setEditId(user.id);
    setMessage("");
    setSelectedUser(null);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

 
  const filteredUsers = users.filter((user) => {
    const search = searchTerm.toLowerCase().trim();

    const fullName =
      `${user.first_name} ${user.last_name}`.toLowerCase();

    return (
      fullName.includes(search) ||
      user.email.toLowerCase().includes(search) ||
      String(user.age).includes(search)
    );
  });


  const totalUsers = users.length;

  const averageAge =
    users.length > 0
      ? (
          users.reduce(
            (total, user) => total + Number(user.age),
            0
          ) / users.length
        ).toFixed(1)
      : "0.0";

  const adultUsers = users.filter(
    (user) => Number(user.age) >= 18
  ).length;

  return (
    <div className="users-page container-fluid p-4">

    
      <div className="mb-4">
        <h1>User Management System</h1>

        <p className="text-muted">
          Add, update, view, search and manage users
        </p>
      </div>

   
      {message && (
        <div
          className={`alert alert-${message.type} alert-dismissible fade show`}
          role="alert"
        >
          {message.text}

          <button
            type="button"
            className="btn-close"
            onClick={() => setMessage("")}
          ></button>
        </div>
      )}

      <div className="row mb-4">

        <div className="col-md-4 mb-3">
          <div className="card shadow-sm">
            <div className="card-body">
              <h3>{totalUsers}</h3>
              <p className="mb-0">
                Total Users
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card shadow-sm">
            <div className="card-body">
              <h3>{averageAge}</h3>
              <p className="mb-0">
                Average Age
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card shadow-sm">
            <div className="card-body">
              <h3>{adultUsers}</h3>
              <p className="mb-0">
                Adult Users
              </p>
            </div>
          </div>
        </div>

      </div>

    
      <div className="card shadow-sm mb-4">

        <div className="card-header">
          <h4 className="mb-0">
            {editId ? "Edit User" : "Add New User"}
          </h4>
        </div>

        <div className="card-body">

          <form onSubmit={handleSubmit} noValidate>

            <div className="row">

              <div className="col-md-3 mb-3">
                <label className="form-label">
                  First Name
                </label>

                <input
                  type="text"
                  className={`form-control ${
                    errors.first_name
                      ? "is-invalid"
                      : ""
                  }`}
                  name="first_name"
                  placeholder="Enter first name"
                  value={form.first_name}
                  onChange={handleChange}
                  maxLength="50"
                  required
                />

                {errors.first_name && (
                  <div className="invalid-feedback">
                    {errors.first_name}
                  </div>
                )}
              </div>

              <div className="col-md-3 mb-3">
                <label className="form-label">
                  Last Name
                </label>

                <input
                  type="text"
                  className={`form-control ${
                    errors.last_name
                      ? "is-invalid"
                      : ""
                  }`}
                  name="last_name"
                  placeholder="Enter last name"
                  value={form.last_name}
                  onChange={handleChange}
                  maxLength="50"
                  required
                />

                {errors.last_name && (
                  <div className="invalid-feedback">
                    {errors.last_name}
                  </div>
                )}
              </div>

              <div className="col-md-3 mb-3">
                <label className="form-label">
                  Email
                </label>

                <input
                  type="email"
                  className={`form-control ${
                    errors.email
                      ? "is-invalid"
                      : ""
                  }`}
                  name="email"
                  placeholder="Enter email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />

                {errors.email && (
                  <div className="invalid-feedback">
                    {errors.email}
                  </div>
                )}
              </div>

              <div className="col-md-3 mb-3">
                <label className="form-label">
                  Age
                </label>

                <input
                  type="number"
                  min="18"
                  max="100"
                  step="1"
                  className={`form-control ${
                    errors.age
                      ? "is-invalid"
                      : ""
                  }`}
                  name="age"
                  placeholder="Enter age"
                  value={form.age}
                  onChange={handleChange}
                  required
                />

                {errors.age && (
                  <div className="invalid-feedback">
                    {errors.age}
                  </div>
                )}
              </div>

            </div>

            <button
              type="submit"
              className="btn btn-primary me-2"
              disabled={submitting}
            >
              {submitting
                ? "Please wait..."
                : editId
                ? "Update User"
                : "Add User"}
            </button>

            {editId && (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={resetForm}
                disabled={submitting}
              >
                Cancel
              </button>
            )}

          </form>

        </div>
      </div>

    
      <div className="card shadow-sm mb-4">

        <div className="card-body">

          <input
            type="text"
            className="form-control"
            placeholder="Search by name, email or age..."
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(e.target.value)
            }
          />

        </div>
      </div>


      <div className="card shadow-sm">

        <div className="card-header d-flex justify-content-between align-items-center">

          <h4 className="mb-0">
            All Users
          </h4>

          <span className="badge bg-primary">
            {filteredUsers.length} users found
          </span>

        </div>

        <div className="card-body">

          {loading ? (
            <div className="text-center p-4">
              Loading users...
            </div>
          ) : (
            <div className="table-responsive">

              <table className="table table-hover align-middle mb-0">

                <thead className="table-dark">
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Age</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>

                  {filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                      <tr key={user.id}>

                        <td>{user.id}</td>

                        <td>
                          {user.first_name} {user.last_name}
                        </td>

                        <td>{user.email}</td>

                        <td>{user.age}</td>

                        <td>

                          <button
                            type="button"
                            className="btn btn-info btn-sm me-2"
                            onClick={() =>
                              setSelectedUser(user)
                            }
                          >
                            View
                          </button>

                          <button
                            type="button"
                            className="btn btn-warning btn-sm me-2"
                            onClick={() =>
                              handleEdit(user)
                            }
                          >
                            Edit
                          </button>

                          <button
                            type="button"
                            className="btn btn-danger btn-sm"
                            onClick={() =>
                              setUserToDelete(user)
                            }
                          >
                            Delete
                          </button>

                        </td>

                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="5"
                        className="text-center p-4"
                      >
                        No users found
                      </td>
                    </tr>
                  )}

                </tbody>

              </table>

            </div>
          )}

        </div>
      </div>

     
      {selectedUser && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          role="dialog"
          style={{
            backgroundColor:
              "rgba(0, 0, 0, 0.5)",
          }}
        >
          <div className="modal-dialog modal-dialog-centered">

            <div className="modal-content">

              <div className="modal-header">

                <h5 className="modal-title">
                  User Details
                </h5>

                <button
                  type="button"
                  className="btn-close"
                  onClick={() =>
                    setSelectedUser(null)
                  }
                ></button>

              </div>

              <div className="modal-body">

                <div className="text-center mb-4">

                  <div
                    className="rounded-circle bg-primary text-white d-inline-flex align-items-center justify-content-center"
                    style={{
                      width: "70px",
                      height: "70px",
                      fontSize: "28px",
                    }}
                  >
                    {selectedUser.first_name
                      ?.charAt(0)
                      .toUpperCase()}
                  </div>

                  <h4 className="mt-3 mb-1">
                    {selectedUser.first_name}{" "}
                    {selectedUser.last_name}
                  </h4>

                  <p className="text-muted">
                    User ID: #{selectedUser.id}
                  </p>

                </div>

                <table className="table">

                  <tbody>

                    <tr>
                      <th>First Name</th>
                      <td>
                        {selectedUser.first_name}
                      </td>
                    </tr>

                    <tr>
                      <th>Last Name</th>
                      <td>
                        {selectedUser.last_name}
                      </td>
                    </tr>

                    <tr>
                      <th>Email</th>
                      <td>
                        {selectedUser.email}
                      </td>
                    </tr>

                    <tr>
                      <th>Age</th>
                      <td>
                        {selectedUser.age} years
                      </td>
                    </tr>

                    {selectedUser.created_at && (
                      <tr>
                        <th>Created At</th>

                        <td>
                          {new Date(
                            selectedUser.created_at
                          ).toLocaleString()}
                        </td>
                      </tr>
                    )}

                  </tbody>

                </table>

              </div>

              <div className="modal-footer">

                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() =>
                    setSelectedUser(null)
                  }
                >
                  Close
                </button>

                <button
                  type="button"
                  className="btn btn-warning"
                  onClick={() =>
                    handleEdit(selectedUser)
                  }
                >
                  Edit User
                </button>

              </div>

            </div>

          </div>
        </div>
      )}

    
      {userToDelete && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          role="dialog"
          style={{
            backgroundColor:
              "rgba(0, 0, 0, 0.5)",
          }}
        >
          <div className="modal-dialog modal-dialog-centered">

            <div className="modal-content">

              <div className="modal-header bg-danger text-white">

                <h5 className="modal-title">
                  Confirm Delete
                </h5>

                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() =>
                    setUserToDelete(null)
                  }
                  disabled={deleting}
                ></button>

              </div>

              <div className="modal-body">

                <div className="text-center">

                  <div
                    className="rounded-circle bg-danger text-white d-inline-flex align-items-center justify-content-center mb-3"
                    style={{
                      width: "70px",
                      height: "70px",
                      fontSize: "30px",
                    }}
                  >
                    !
                  </div>

                  <h5>
                    Are you sure?
                  </h5>

                  <p className="text-muted">

                    You are about to delete{" "}

                    <strong>
                      {userToDelete.first_name}{" "}
                      {userToDelete.last_name}
                    </strong>

                    .

                  </p>

                  <p className="text-danger small">
                    This action cannot be undone.
                  </p>

                </div>

              </div>

              <div className="modal-footer">

                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() =>
                    setUserToDelete(null)
                  }
                  disabled={deleting}
                >
                  Cancel
                </button>

                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleDelete}
                  disabled={deleting}
                >
                  {deleting
                    ? "Deleting..."
                    : "Yes, Delete User"}
                </button>

              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}

export default Users;