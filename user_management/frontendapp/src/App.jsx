import { useState, useEffect } from "react";
import './styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  const apiUrl = "http://127.0.0.1:8000/api/users/";
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    age: ""
  });
  const [editId, setEditId] = useState(null);

  // Fetch all users
  const fetchUsers = async () => {
    const res = await fetch(apiUrl);
    const data = await res.json();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle form input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add or update user
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await fetch(`${apiUrl}${editId}/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      setEditId(null);
    } else {
      await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
    }
    setForm({ first_name: "", last_name: "", email: "", age: "" });
    fetchUsers();
  };

  // Delete user
  const handleDelete = async (id) => {
    await fetch(`${apiUrl}${id}/`, { method: "DELETE" });
    fetchUsers();
  };

  // Edit user
  const handleEdit = (user) => {
    setForm({
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      age: user.age
    });
    setEditId(user.id);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>User Management System</h1>
      <form onSubmit={handleSubmit}>
        <input
          name="first_name"
          placeholder="First Name"
          value={form.first_name}
          onChange={handleChange}
          required
        />
        <input
          name="last_name"
          placeholder="Last Name"
          value={form.last_name}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          name="age"
          placeholder="Age"
          type="number"
          value={form.age}
          onChange={handleChange}
          required
        />
        <button type="submit">{editId ? "Update" : "Add"} User</button>
      </form>

      <h2>All Users</h2>
      <table border="1" cellPadding="8" style={{ marginTop: "20px" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.first_name} {u.last_name}</td>
              <td>{u.email}</td>
              <td>{u.age}</td>
              <td>
                <button onClick={() => handleEdit(u)}>Edit</button>
                <button onClick={() => handleDelete(u.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
