package com.secureai.exampro.service;

import com.secureai.exampro.entity.Notification;
import com.secureai.exampro.entity.NotificationType;
import com.secureai.exampro.entity.User;

import java.util.List;

public interface NotificationService {

    // Create/send a notification
    Notification createNotification(
            Notification notification
    );

    // Get all notifications
    List<Notification> getAllNotifications();

    // Get notification by ID
    Notification getNotificationById(
            Long id
    );

    // Get notifications of a specific user
    List<Notification> getNotificationsByUser(
            User user
    );

    // Get unread notifications
    List<Notification> getUnreadNotifications(
            User user
    );

    // Get notifications by type
    List<Notification> getNotificationsByType(
            NotificationType notificationType
    );

    // Count unread notifications
    long countUnreadNotifications(
            User user
    );

    // Mark notification as read
    Notification markAsRead(
            Long id
    );

    // Delete notification
    void deleteNotification(
            Long id
    );
}