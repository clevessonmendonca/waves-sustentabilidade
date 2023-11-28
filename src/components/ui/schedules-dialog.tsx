import { useState, useEffect, useContext } from "react";
import { getCollectionSchedulesToCollectors } from "@/app/actions/getCollectionSchedulesToCollectors";
import { UserContext } from "@/app/providers/user";
import { CollectionSchedule } from "@prisma/client";
import { Button } from "./button";
import { Dialog, DialogContent, DialogHeader, DialogOverlay } from "./dialog";
import { Card } from "./card";

interface ScheduleDialogProps {
  open?: boolean;
  onClose?: () => void;
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

  const handleClose = () => {
    setIsOpen(false);
    if (onClose) onClose();
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={() => (setIsOpen(false))}>
        <DialogOverlay />
        <DialogContent>
          <DialogHeader>Agendamentos Pendentes</DialogHeader>
          {schedules ? (
            schedules.map((schedule) => (
              <Card key={schedule.id} className="mb-4 p-4">
                <p>Material: {schedule.materialType}</p>
                <p>Dia da Semana: {schedule.dayOfWeek}</p>
                <p>
                  Horário: {schedule.collectionStartTime} -{" "}
                  {schedule.collectionEndTime}
                </p>
              </Card>
            ))
          ) : (
            <p>Nenhum agendamento pendente encontrado.</p>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
