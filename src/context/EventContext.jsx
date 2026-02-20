import React, { createContext, useContext, useState, useCallback } from 'react';
import { GET, POST, PUT, DELETE } from '../services/httpMethods';
import { ENDPOINT } from '../services/httpEndpoint';
import { toast } from 'react-toastify';
import { useAuth } from './AuthContext';

const EventContext = createContext(null);

export const EventProvider = ({ children }) => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [createLoading, setCreateLoading] = useState(false);
    const [updateLoading, setUpdateLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch all events (uses authenticated token). Admins hit the public LIST endpoint,
    // regular users hit the MY_LIST endpoint.
    const { user } = useAuth();

    const fetchEvents = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            // Choose endpoint depending on role
            const endpointToUse = (user && user.role === 'admin') ? ENDPOINT.EVENTS.LIST : ENDPOINT.EVENTS.MY_LIST;
            const response = await GET(endpointToUse);


            // Backend returns: { success: true, data: { events: [...], total: 3, page: 1 } }
            let eventsList = [];
            if (response?.data) {
                if (Array.isArray(response.data)) {
                    eventsList = response.data;

                } else if (response.data.events && Array.isArray(response.data.events)) {
                    eventsList = response.data.events;
                    ;
                } else if (response.data.data && response.data.data.events && Array.isArray(response.data.data.events)) {
                    eventsList = response.data.data.events;

                } else if (response.data.data && Array.isArray(response.data.data)) {
                    eventsList = response.data.data;

                } else {
                    console.log(' Could not find events array in response structure');
                }
            }
            console.log(' Parsed events:', eventsList.length, 'events');
            setEvents(eventsList);
            return { success: true, events: eventsList };
        } catch (err) {
            console.error(' Error fetching events:', err);
            const message = err?.response?.data?.message || err?.message || 'Failed to fetch events';
            setError(message);
            toast.error(message);
            return { success: false, message };
        } finally {
            setLoading(false);
        }
    }, [user]);

    // Fetch single event details
    const fetchEventById = useCallback(async (eventId) => {
        if (!eventId) {
            toast.error('Event ID is required');
            return { success: false, message: 'Event ID is required' };
        }

        setLoading(true);
        setError(null);
        try {
            const response = await GET(ENDPOINT.EVENTS.DETAIL(eventId));
            let event = null;
            if (response?.data) {
                if (response.data.event) {
                    event = response.data.event;
                } else if (response.data.data) {
                    event = response.data.data;
                } else {
                    event = response.data;
                }
            }
            return { success: true, event };
        } catch (err) {
            const message = err?.response?.data?.message || err?.message || 'Failed to fetch event details';
            setError(message);
            toast.error(message);
            return { success: false, message };
        } finally {
            setLoading(false);
        }
    }, []);

    // Create new event (uses authenticated token)
    const createEvent = useCallback(async (eventData) => {
        setCreateLoading(true);
        setError(null);
        try {
            const response = await POST(ENDPOINT.EVENTS.CREATE, eventData);

            // Handle different response structures
            let newEvent = null;
            if (response?.data) {
                if (response.data.event) {
                    newEvent = response.data.event;
                } else if (response.data.data) {
                    newEvent = response.data.data;
                } else {
                    newEvent = response.data;
                }
            } else {
                newEvent = response;
            }

            toast.success('Event created successfully!');

            // Refetch events to get complete data from backend
            await fetchEvents();

            return { success: true, event: newEvent };
        } catch (err) {
            const message = err?.response?.data?.message || err?.message || 'Failed to create event';
            setError(message);
            toast.error(message);
            return { success: false, message };
        } finally {
            setCreateLoading(false);
        }
    }, [fetchEvents]);

    // Update event
    const updateEvent = useCallback(async (eventId, eventData) => {
        if (!eventId) {
            toast.error('Event ID is required');
            return { success: false, message: 'Event ID is required' };
        }

        setUpdateLoading(true);
        setError(null);
        try {
            const response = await PUT(ENDPOINT.EVENTS.UPDATE(eventId), eventData);

            let updatedEvent = null;
            if (response?.data) {
                if (response.data.event) {
                    updatedEvent = response.data.event;
                } else if (response.data.data) {
                    updatedEvent = response.data.data;
                } else {
                    updatedEvent = response.data;
                }
            }

            toast.success('Event updated successfully!');

            // Refetch events to get complete data from backend
            await fetchEvents();

            return { success: true, event: updatedEvent };
        } catch (err) {
            const message = err?.response?.data?.message || err?.message || 'Failed to update event';
            setError(message);
            toast.error(message);
            return { success: false, message };
        } finally {
            setUpdateLoading(false);
        }
    }, [fetchEvents]);

    // Delete event
    const deleteEvent = useCallback(async (eventId) => {
        if (!eventId) {
            toast.error('Event ID is required');
            return { success: false, message: 'Event ID is required' };
        }

        setDeleteLoading(true);
        setError(null);
        try {
            await DELETE(ENDPOINT.EVENTS.DELETE(eventId));
            toast.success('Event deleted successfully!');

            // Remove from local state
            setEvents((prev) => prev.filter((event) => event.id !== eventId));

            return { success: true };
        } catch (err) {
            const message = err?.response?.data?.message || err?.message || 'Failed to delete event';
            setError(message);
            toast.error(message);
            return { success: false, message };
        } finally {
            setDeleteLoading(false);
        }
    }, []);

    const value = {
        events,
        loading,
        createLoading,
        updateLoading,
        deleteLoading,
        error,
        fetchEvents,
        fetchEventById,
        createEvent,
        updateEvent,
        deleteEvent,
    };

    return <EventContext.Provider value={value}>{children}</EventContext.Provider>;
};

export const useEvent = () => {
    const context = useContext(EventContext);
    if (!context) {
        throw new Error('useEvent must be used within an EventProvider');
    }
    return context;
};
