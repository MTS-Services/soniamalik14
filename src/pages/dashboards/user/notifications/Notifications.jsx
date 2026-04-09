import React, { useState } from 'react';
import NotificationHeader from './components/NotificationHeader';
import NotificationItem from './components/NotificationItem';

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'Sarah replied to your post', isRead: false },
    { id: 2, text: 'Your registered interest was received', isRead: false },
    { id: 3, text: 'New event added in your area', isRead: false },
    { id: 4, text: 'New event added in your area', isRead: false },
    { id: 5, text: 'New event added in your area', isRead: false },
    { id: 6, text: 'Your registered interest was received', isRead: false },
    { id: 7, text: 'Your registered interest was received', isRead: false },
    { id: 8, text: 'Your registered interest was received', isRead: false },
    { id: 9, text: 'Your registered interest was received', isRead: false },
    { id: 10, text: 'Your registered interest was received', isRead: false },
  ]);

  const [selectedNotifications, setSelectedNotifications] = useState(new Set());

  const handleToggleSelect = (id) => {
    const newSelected = new Set(selectedNotifications);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedNotifications(newSelected);
  };

  const handleMarkAllRead = () => {
    setNotifications(
      notifications.map((notif) => ({ ...notif, isRead: true }))
    );
  };

  const handleDeleteSelected = () => {
    if (selectedNotifications.size === 0) return;
    
    setNotifications(
      notifications.filter((notif) => !selectedNotifications.has(notif.id))
    );
    setSelectedNotifications(new Set());
  };

  const handleNotificationClick = (id) => {
    setNotifications(
      notifications.map((notif) =>
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    );
  };

  return (
    <div className="dashboardPy dashboardSpaceY">
      <NotificationHeader
        selectedCount={selectedNotifications.size}
        onMarkAllRead={handleMarkAllRead}
        onDeleteSelected={handleDeleteSelected}
        totalCount={notifications.length}
      />

      <div className="bg-white rounded-lg shadow overflow-hidden">
        {notifications.length > 0 ? (
          notifications.map((notif) => (
            <NotificationItem
              key={notif.id}
              id={notif.id}
              text={notif.text}
              isRead={notif.isRead}
              isSelected={selectedNotifications.has(notif.id)}
              onToggleSelect={handleToggleSelect}
              onClick={() => handleNotificationClick(notif.id)}
            />
          ))
        ) : (
          <div className="p-8 text-center">
            <p className="text-gray-500 text-lg">No notifications</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;
