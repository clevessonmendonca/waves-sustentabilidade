"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormCollectionValues } from "../collection/page";
import { CollectionSchedule } from "@prisma/client";
import { AlertTriangleIcon, CalendarClockIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { useToast } from "@/components/ui/use-toast";
import { editCollectionSchedule } from "@/app/actions/editCollectionSchedule";
import { deleteCollectionSchedule } from "@/app/actions/deleteCollectionSchedule";
import { ScrollArea } from "@/components/ui/scroll-area";
import { z } from "zod";

const FormCollectionSchema = z.object({
  materialType: z
    .string()
    .min(1, { message: "Tipo de Material é um campo obrigatório" }),
  quantityKg: z
    .string()
    .min(1, { message: "A quantidade deve ser maior que zero" }),
  collectionTime: z.object({
    startTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, {
      message: "Formato inválido para o horário de início",
    }),
    endTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, {
      message: "Formato inválido para o horário de fim",
    }),
  }),
  dayOfWeek: z
    .string()
    .min(1, { message: "Dia da Semana é um campo obrigatório" })
    .max(255, { message: "Dia da Semana deve ter no máximo 255 caracteres" }),
  description: z.string().optional(),
  image: z.string().nullable().optional(),
});

export const CollectionsSchedule = ({
  schedule,
}: {
  schedule: CollectionSchedule;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormCollectionValues>({
    resolver: zodResolver(FormCollectionSchema),
  });

  const { data: Session } = useSession();

  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(false);

  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isEditing, setEditing] = useState(false);
  const [editedSchedule, setEditedSchedule] = useState({ ...schedule });
  const [isConfirmationDialogOpen, setConfirmationDialogOpen] = useState(false);

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleCancelEdit = () => {
    setEditing(false);
  };

  const handleSaveEdit = handleSubmit(async (data) => {
    if (!Session?.user?.id) return;

    if (
      !isValidTimeRange(
        data.collectionTime.startTime,
        data.collectionTime.endTime,
      )
    ) {
      toast({
        title: "Erro no Horário",
        description: "O horário de início deve ser menor que o horário de fim",
        variant: "destructive",
      });
      return;
    }

    setEditing(false);

    try {
      setIsLoading(true);

      toast({
        title: "Válidando Agendamento",
        description: "Seus dados estão sendo válidados, por favor aguarde!",
      });

      await editCollectionSchedule(data, Session?.user?.id);

      toast({
        title: "Agendado com Sucesso!",
        description: "Seus dados foram válidados.",
      });
    } catch (error) {
      toast({
        title: "Uh oh! Parece que deu algo errado.",
        description:
          "Ocorreu um erro ao cadastrar seu agendamento. Tente novamente mais tarde.",
      });

      console.error("Erro ao criar agendamento de coleta:", error);
    } finally {
      setIsLoading(false);
      setDialogOpen(false);
    }
  });

  const isValidTimeRange = (startTime: string, endTime: string) => {
    const start = new Date(`2000-01-01 ${startTime}`);
    const end = new Date(`2000-01-01 ${endTime}`);
    return start < end;
  };

  const handleDelete = async () => {
    try {
      setIsLoading(true);

      toast({
        title: "Excluindo Agendamento",
        description: "Seu agendamento está sendo excluído, por favor aguarde!",
      });

      await deleteCollectionSchedule(schedule.id);

      toast({
        title: "Agendamento Excluído com Sucesso!",
        description: "Seu agendamento foi excluído com sucesso.",
      });

      setDialogOpen(false);
    } catch (error) {
      toast({
        title: "Uh oh! Parece que deu algo errado.",
        description:
          "Ocorreu um erro ao excluir seu agendamento. Tente novamente mais tarde.",
        variant: "destructive",
      });

      console.error("Erro ao excluir agendamento de coleta:", error);
    } finally {
      setConfirmationDialogOpen(false);
      setIsLoading(false);
    }
  };

  const handleConfirmDelete = async () => {
    setConfirmationDialogOpen(true);
  };

  const handleCancelDelete = () => {
    setConfirmationDialogOpen(false);
  };

  return (
    <>
      <Card className="flex flex-wrap justify-center rounded-full px-4 py-2 md:justify-between md:py-1">
        <div className="flex items-center gap-2">
          <span className="hidden rounded-full bg-accent p-4 md:inline-block">
            <CalendarClockIcon />
          </span>
          <h4 className="text-lg font-medium">Agendamentos</h4>
        </div>
        <div className="flex w-full flex-col flex-wrap items-center justify-center gap-4 md:w-auto md:flex-row md:justify-normal">
          <div className="flex items-center gap-2">
            <AlertTriangleIcon size={24} className="text-yellow-500" />
            <p className="text-sm opacity-75">
              Você tem 1 agendamento em processo
            </p>
          </div>

          <Button
            size="lg"
            className="rounded-full"
            onClick={() => setDialogOpen(true)}
          >
            Conferir
          </Button>
        </div>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={() => setDialogOpen(false)}>
        <DialogContent className="px-0">
          <DialogHeader className="px-5">
            <DialogTitle>Detalhes do Agendamento</DialogTitle>
          </DialogHeader>

          <ScrollArea className="max-h-96 px-5">
            <DialogDescription className="flex flex-col gap-4">
              <Card className="flex flex-col justify-center gap-2 px-4 py-2">
                <span>Tipo de Material</span>
                {isEditing ? (
                  <>
                    <Input
                      {...register("materialType")}
                      type="text"
                      value={editedSchedule.materialType}
                      onChange={(e) =>
                        setEditedSchedule({
                          ...editedSchedule,
                          materialType: e.target.value,
                        })
                      }
                    />
                    <p className="text-sm text-red-500">
                      {errors.materialType?.message}
                    </p>
                  </>
                ) : (
                  <p className="text-sm text-white/80">
                    {schedule.materialType}
                  </p>
                )}
              </Card>

              <Card className="flex flex-col justify-center gap-2 px-4 py-2">
                <span>Quantidade (kg)</span>
                {isEditing ? (
                  <>
                    <Input
                      {...register("quantityKg")}
                      type="number"
                      value={editedSchedule.quantityKg}
                      onChange={(e) =>
                        setEditedSchedule({
                          ...editedSchedule,
                          quantityKg: e.target.value,
                        })
                      }
                    />
                    <p className="text-sm text-red-500">
                      {errors.quantityKg?.message}
                    </p>
                  </>
                ) : (
                  <p className="text-sm text-white/80">{schedule.quantityKg}</p>
                )}
              </Card>

              <Card className="flex flex-col justify-center gap-2 px-4 py-2">
                <span>Horário Inicial</span>
                {isEditing ? (
                  <>
                    <Input
                      {...register("collectionTime.startTime")}
                      type="time"
                      value={editedSchedule.collectionStartTime}
                      onChange={(e) =>
                        setEditedSchedule({
                          ...editedSchedule,
                          collectionStartTime: e.target.value,
                        })
                      }
                    />
                    <p className="text-sm text-red-500">
                      {errors.collectionTime?.startTime?.message}
                    </p>
                  </>
                ) : (
                  <p className="text-sm text-white/80">
                    {schedule.collectionStartTime}
                  </p>
                )}
              </Card>

              <Card className="flex flex-col justify-center gap-2 px-4 py-2">
                <span>Horário Final</span>
                {isEditing ? (
                  <>
                    <Input
                      {...register("collectionTime.endTime")}
                      type="time"
                      value={editedSchedule.collectionEndTime}
                      onChange={(e) =>
                        setEditedSchedule({
                          ...editedSchedule,
                          collectionEndTime: e.target.value,
                        })
                      }
                    />
                    <p className="text-sm text-red-500">
                      {errors.collectionTime?.endTime?.message}
                    </p>
                  </>
                ) : (
                  <p className="text-sm text-white/80">
                    {schedule.collectionEndTime}
                  </p>
                )}
              </Card>

              <Card className="flex flex-col justify-center gap-2 px-4 py-2">
                <span>Dia da Semana</span>
                {isEditing ? (
                  <>
                    <Input
                      {...register("dayOfWeek")}
                      type="text"
                      value={editedSchedule.dayOfWeek}
                      onChange={(e) =>
                        setEditedSchedule({
                          ...editedSchedule,
                          dayOfWeek: e.target.value,
                        })
                      }
                    />
                    <p className="text-sm text-red-500">
                      {errors.dayOfWeek?.message}
                    </p>
                  </>
                ) : (
                  <p className="text-sm text-white/80">{schedule.dayOfWeek}</p>
                )}
              </Card>

              <Card className="flex flex-col justify-center gap-2 px-4 py-2">
                <span>Descrição</span>
                {isEditing ? (
                  <>
                    <Input
                      {...register("description")}
                      type="text"
                      value={editedSchedule.description || ""}
                      onChange={(e) =>
                        setEditedSchedule({
                          ...editedSchedule,
                          description: e.target.value,
                        })
                      }
                    />
                    <p className="text-sm text-red-500">
                      {errors.description?.message}
                    </p>
                  </>
                ) : (
                  <p className="text-sm text-white/80">
                    {schedule.description}
                  </p>
                )}
              </Card>
            </DialogDescription>
          </ScrollArea>

          <DialogFooter className="px-5">
            <div className="mt-4 flex justify-end gap-4">
              {isEditing ? (
                <>
                  <Button variant="outline" onClick={handleCancelEdit}>
                    Cancelar
                  </Button>
                  <Button onClick={handleSaveEdit}>Salvar</Button>
                </>
              ) : (
                <div className="flex justify-end gap-4">
                  <Button variant="destructive" onClick={handleConfirmDelete}>
                    Excluir
                  </Button>
                  <Button variant="secondary" onClick={handleEditClick}>
                    Editar
                  </Button>
                </div>
              )}
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog
        open={isConfirmationDialogOpen}
        onOpenChange={() => setConfirmationDialogOpen(false)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar Exclusão</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            Tem certeza de que deseja excluir este agendamento?
          </DialogDescription>
          <div className="mt-4 flex justify-end gap-4">
            <Button variant="outline" onClick={handleCancelDelete}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Confirmar Exclusão
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
