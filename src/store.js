import { configureStore } from "@reduxjs/toolkit";
import authReducer from './features/auth/authSlice';
import projectReducer from './features/projects/projectSlice';
import ticketReducer from './features/ticket/ticketSlice';
import projectTicketReducer from './features/project_tickets/projectTicketsSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        Project: projectReducer,
        Ticket: ticketReducer,
        ProjectTicket: projectTicketReducer,
    }
})

export default store;