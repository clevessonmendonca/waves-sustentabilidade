import React from "react";

interface ImpactStatProps {
  label: string;
  value: string | number;
}

export const ImpactStat = ({ label, value }: ImpactStatProps) => {
  return (
    <div className="flex flex-col justify-center gap-2 border-l-2 px-5 py-1">
      <h3 className="text-2xl font-bold">{value}</h3>
      <p className="text-sm">{label}</p>
    </div>
  );
};
