import { useState, useEffect, useContext } from "react";
import { getCollectionSchedulesToCollectors } from "@/app/actions/getCollectionSchedulesToCollectors";
import { UserContext } from "@/app/providers/user";
import { CollectionSchedule } from "@prisma/client";
import { Button } from "./button";
import { Dialog, DialogContent, DialogHeader, DialogOverlay } from "./dialog";
import { Card } from "./card";
import { ScheduleCard } from "./schedule-card";

interface ScheduleDialogProps {
  open: boolean;
  onClose: () => void;
}

export const ScheduleDialog: React.FC<ScheduleDialogProps> = ({
  open = true,
  onClose,
}) => {
  const userData = useContext(UserContext);
  const [schedules, setSchedules] = useState<CollectionSchedule[] | null>(null);
  const [isOpen, setIsOpen] = useState(open);

  useEffect(() => {
    const fetchSchedules = async () => {
      if (!userData?.userData) return;

      const allSchedules = await getCollectionSchedulesToCollectors(
        userData.userData.id,
      );

      if (!allSchedules) return;

      const pendingSchedules = allSchedules.filter(
        (schedule) => schedule.status === "pending",
      );

      setSchedules(pendingSchedules);
    };

    if (schedules) return;

    fetchSchedules();
  }, [schedules, userData]);

  return (
    <>
      <Dialog open={isOpen} onOpenChange={() => onClose()}>
        <DialogOverlay />
        <DialogContent>
          <DialogHeader>Agendamentos Pendentes</DialogHeader>
          {schedules ? (
            schedules.map((schedule) => (
              <ScheduleCard key={schedule.id} schedule={schedule} />
            ))
          ) : (
            <p>Nenhum agendamento pendente encontrado.</p>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
