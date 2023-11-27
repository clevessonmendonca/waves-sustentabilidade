"use client";

import React, { useEffect, useState } from "react";
import { Card } from "./card";
import { InfoIcon } from "lucide-react";
import { getNotification } from "@/app/actions/getNotifications";
import { Notification } from "@prisma/client";
import { formatDistanceToNow } from "date-fns";

export const NotificationList = () => {
  const [notifications, setNotifications] = useState<Notification[] | null>(
    null,
  );

  useEffect(() => {
    async function fetchNotification() {
      const notifications = await getNotification();
      setNotifications(notifications);
    }

    fetchNotification();
  }, []);

  const getTimeAgo = (createdAt: Date) => {
    const now = new Date();
    const differenceInSeconds = Math.floor(
      (now.getTime() - createdAt.getTime()) / 1000,
    );

    if (differenceInSeconds < 60) {
      return `Há alguns segundos`;
    } else if (differenceInSeconds < 3600) {
      const minutes = Math.floor(differenceInSeconds / 60);
      return `Há ${minutes} ${minutes === 1 ? "minuto" : "minutos"}`;
    } else if (differenceInSeconds < 86400) {
      const hours = Math.floor(differenceInSeconds / 3600);
      return `Há ${hours} ${hours === 1 ? "hora" : "horas"}`;
    } else {
      return formatDistanceToNow(createdAt, { addSuffix: true });
    }
  };

  const notificationItems = notifications ? (
    notifications.map((notification) => (
      <div key={notification.id}>
        <Card className="flex w-full items-center gap-4 px-4 py-2">
          <InfoIcon />
          <div>
            <p className="text-sm">{notification.message}</p>
            <p className="text-xs opacity-80">
              {getTimeAgo(new Date(notification.createdAt))}
            </p>
          </div>
        </Card>
      </div>
    ))
  ) : (
    <p>Você não possui notificações.</p>
  );

  return <>{notificationItems}</>;
};
