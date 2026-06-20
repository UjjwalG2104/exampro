package com.secureai.exampro.service;

import com.secureai.exampro.entity.Notification;
import com.secureai.exampro.entity.NotificationType;
import com.secureai.exampro.entity.User;
import com.secureai.exampro.repository.NotificationRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotificationServiceImpl implements NotificationService {

    private final NotificationRepository notificationRepository;

    // Constructor Injection
    public NotificationServiceImpl(
            NotificationRepository notificationRepository) {

        this.notificationRepository = notificationRepository;
    }

    // Create a new notification
    @Override
    public Notification createNotification(
            Notification notification) {

        return notificationRepository.save(notification);
    }

    // Get all notifications
    @Override
    public List<Notification> getAllNotifications() {

        return notificationRepository.findAll();
    }

    // Get notification by ID
    @Override
    public Notification getNotificationById(
            Long id) {

        return notificationRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                        "Notification not found with ID: " + id));
    }

    // Get notifications by user
    @Override
    public List<Notification> getNotificationsByUser(
            User user) {

        return notificationRepository.findByUser(user);
    }

    // Get unread notifications
    @Override
    public List<Notification> getUnreadNotifications(
            User user) {

        return notificationRepository
                .findByUserAndIsReadFalse(user);
    }

    // Get notifications by type
    @Override
    public List<Notification> getNotificationsByType(
            NotificationType notificationType) {

        return notificationRepository
                .findByNotificationType(notificationType);
    }

    // Count unread notifications
    @Override
    public long countUnreadNotifications(
            User user) {

        return notificationRepository
                .countByUserAndIsReadFalse(user);
    }

    // Mark notification as read
    @Override
    public Notification markAsRead(
            Long id) {

        Notification notification =
                getNotificationById(id);

        notification.setIsRead(true);

        return notificationRepository.save(notification);
    }

    // Delete notification
    @Override
    public void deleteNotification(
            Long id) {

        Notification notification =
                getNotificationById(id);

        notificationRepository.delete(notification);
    }
}