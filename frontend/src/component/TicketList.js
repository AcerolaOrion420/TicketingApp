import axios from "axios";
import { useEffect, useState } from "react";
import "./TicketList.css"

function TicketList() {
    const [tickets, setTickets] = useState([]);

    const fetchTickets = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/tickets");
            setTickets(response.data);
        } catch (error) {
            alert("failed to fetch tickets");
        }
    }

    useEffect(() => {
        fetchTickets();
        window.addEventListener("TICKET_CREATED", fetchTickets);
        return () => {
            window.removeEventListener("TICKET_CREATED", fetchTickets);
        }
    }, []);

    const handleUpdateStatus = async (id, newStatus) => {
        try {
            await axios.patch(`http://localhost:5000/api/tickets/${id}`, { status: newStatus });
            setTickets(prevTickets => prevTickets.map(ticket => ticket._id === id ? { ...ticket, status: newStatus } : ticket));
        } catch (error) {
            alert("failed to update ticket status");
        }
    };

    const deleteTicket = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/tickets/${id}`);
            setTickets(prevTickets => prevTickets.filter(ticket => ticket._id !== id));
            alert("Ticket deleted successfully");
        } catch (error) {
            alert("failed to delete ticket");
        }
    }

    return (
        <div className="ticket-list">
            <h2>Ticket List</h2>
            {tickets.length === 0 ? (
                <p style={{ textAlign: "center", color: "#666" }}>No tickets found.</p>
            ) : (
                tickets.map((ticket) => (
                    <div key={ticket._id} className="ticket-card">
                        <h3>
                            {ticket.title}
                            <span className={`status-badge status-${ticket.status || "open"}`}>
                                {ticket.status || "open"}
                            </span>
                        </h3>
                        <p><strong>ID:</strong> {ticket.id}</p>
                        <p><strong>Owner:</strong> {ticket.owner}</p>
                        <p><strong>Effort:</strong> {ticket.effort}</p>
                        <p><strong>Due Date:</strong> {ticket.dueDate ? new Date(ticket.dueDate).toLocaleDateString() : "N/A"}</p>
                        <p><strong>Created:</strong> {ticket.createdDate ? new Date(ticket.createdDate).toLocaleDateString() : "N/A"}</p>
                        <div className="ticket-buttons">
                            <button onClick={() => handleUpdateStatus(ticket._id, "in-progress")}>
                                In Progress
                            </button>
                            <button onClick={() => handleUpdateStatus(ticket._id, "resolved")}>
                                Resolve
                            </button>
                            <button onClick={() => handleUpdateStatus(ticket._id, "open")}>
                                Open
                            </button>
                            <button className="delete-btn" onClick={() => deleteTicket(ticket._id)}>
                                Delete
                            </button>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}

export default TicketList;
