import React from 'react';

const NotificationList = ({ title, items, onItemClick }) => {
    return (
        <div className="notification-list">
            <h2>{title}</h2>
            <ul>
                {items.length > 0 ? (
                    items.map((item, index) => (
                        <li key={index} onClick={() => onItemClick(item)} className="clickable">
                            {item}
                        </li>
                    ))
                ) : (
                    <li>No hay {title.toLowerCase()}</li>
                )}
            </ul>
        </div>
    );
};

export default NotificationList;
