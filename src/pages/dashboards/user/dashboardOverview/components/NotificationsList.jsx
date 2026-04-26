import React from 'react';
import NotificationItem from './NotificationItem';

const NotificationsList = ({ notifications = [] }) => {
  const defaultNotifications = [
    "Sarah replied to your post",
    "Your registered interest was received",
    "New event added in your area",
    "New event added in your area",
    "New event added in your area",
  ];

  const notificationsList = notifications.length > 0 ? notifications : defaultNotifications;

  const handleNotificationClick = (index) => {
    console.log(`Notification ${index} clicked:`, notificationsList[index]);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#111827] mb-6">Notifications</h2>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {notificationsList.map((note, index) => (
          <NotificationItem 
            key={index} 
            text={note}
            onClick={() => handleNotificationClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default NotificationsList;
