import { useState, useEffect, useContext, Fragment } from "react";
import { getCollectionSchedulesToCollectors } from "@/app/actions/getCollectionSchedulesToCollectors";
import { UserContext } from "@/app/providers/user";
import { CollectionSchedule } from "@prisma/client";
import { Button } from "./button";
import { Dialog, DialogContent, DialogHeader, DialogOverlay } from "./dialog";
import { Card } from "./card";
import { ScheduleCard } from "./schedule-card";
import { ScrollArea } from "./scroll-area";

interface ProcessCollectionDialogProps {
  open: boolean;
  onClose: () => void;
}

export const ProcessCollectionDialog: React.FC<
  ProcessCollectionDialogProps
> = ({ open = true, onClose }) => {
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
        (schedule) => schedule.status === "in_progress",
      );

      setSchedules(pendingSchedules);
    };

    if (schedules) return;

    fetchSchedules();
  }, [schedules, userData]);

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  return (
    <>
      <Dialog open={isOpen} onOpenChange={() => (setIsOpen(false), onClose())}>
        <DialogOverlay />
        <DialogContent className="px-0">
          <DialogHeader className="px-5">Agendamentos Pendentes</DialogHeader>
          {schedules ? (
            schedules.map((schedule) => (
              <ul key={schedule.id}>
                <ScrollArea className="max-h-52 px-5">
                  <ScheduleCard schedule={schedule} />
                </ScrollArea>
              </ul>
            ))
          ) : (
            <p>Nenhum agendamento pendente encontrado.</p>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
