package com.secureai.exampro.repository;

import com.secureai.exampro.entity.Notification;
import com.secureai.exampro.entity.NotificationType;
import com.secureai.exampro.entity.User;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NotificationRepository
        extends JpaRepository<Notification, Long> {

    // Get all notifications of a user
    List<Notification> findByUser(User user);

    // Get unread notifications
    List<Notification> findByUserAndIsReadFalse(
            User user
    );

    // Get notifications by type
    List<Notification> findByNotificationType(
            NotificationType notificationType
    );

    // Count unread notifications
    long countByUserAndIsReadFalse(
            User user
    );

    // Get latest notifications
    List<Notification> findAllByOrderByCreatedAtDesc();
}