import React, { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const days = [
  "Segunda",
  "Terça",
  "Quarta",
  "Quinta",
  "Sexta",
  "Sábado",
  "Domingo",
];

export const WeekDayRadioGroup = ({ form }: { form: any }) => {
  const [weekDay, setWeekDay] = useState<string | null>(null);

  const handleWeekDayChange = (day: string) => {
    setWeekDay(day);
    form.setValue("dayOfWeek", day);
  };

  return (
    <RadioGroup
      onValueChange={handleWeekDayChange}
      defaultValue={weekDay || ""}
      className="flex flex-wrap space-y-2"
    >
      {days.map((day) => (
        <div
          key={day}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <RadioGroupItem value={day} id={day} className="sr-only" />
          <label
            className={`flex h-24 w-24 cursor-pointer flex-col items-center justify-center rounded-full border-2 bg-accent p-5 ${
              weekDay === day ? "bg-primary" : "text-gray-500"
            }`}
            htmlFor={day}
            onClick={() => handleWeekDayChange(day)}
          >
            {day}
          </label>
        </div>
      ))}

      <p className="text-sm text-red-600 opacity-75">
        {form.formState.errors.dayOfWeek?.message.toString()}
      </p>
    </RadioGroup>
  );
};
