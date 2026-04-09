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

  const handleMarkAllRead = () => {
    setNotifications(
      notifications.map((notif) => ({ ...notif, isRead: true }))
    );
  };

  const handleDeleteAll = () => {
    setNotifications([]);
  };

  const handleNotificationClick = (id) => {
    setNotifications(
      notifications.map((notif) =>
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    );
  };

  return (
    <div className="p-4 md:p-6">
      <NotificationHeader
        selectedCount={0}
        onMarkAllRead={handleMarkAllRead}
        onDeleteSelected={handleDeleteAll}
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
