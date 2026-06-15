import React, { useState } from "react";
import axios from "axios";
import "./TicketForm.css";

function TicketForm() {
    const [form, setForm] = useState({
        id: "",
        title: "",
        status: "",
        effort: "",
        owner: "",
        dueDate: "",
    });
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/api/tickets", form);
            alert("Ticket created successfully");
            setForm({
                id: "",
                title: "",
                status: "",
                effort: "",
                owner: "",
                dueDate: "",
            });
            window.dispatchEvent(new Event("TICKET_CREATED"));
        } catch (error) {
            console.error("Error creating ticket:", error);
            alert("Error creating ticket");
        }
    };

    return (
        <div className="ticket-form">
            <h2>Ticket Form</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="id">Id:</label>
                    <input
                        type="text"
                        id="id"
                        name="id"
                        value={form.id}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="status">Status:</label>
                    <select
                        id="status"
                        name="status"
                        value={form.status}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Status</option>
                        <option value="open">Open</option>
                        <option value="in-progress">In Progress</option>
                        <option value="resolved">Resolved</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="effort">Effort:</label>
                    <input
                        type="text"
                        id="effort"
                        name="effort"
                        value={form.effort}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="owner">Owner:</label>
                    <input
                        type="text"
                        id="owner"
                        name="owner"
                        value={form.owner}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="dueDate">Due Date:</label>
                    <input
                        type="text"
                        id="dueDate"
                        name="dueDate"
                        value={form.dueDate}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="submit-btn">Create Ticket</button>
            </form>
        </div>
    );
}

export default TicketForm;
