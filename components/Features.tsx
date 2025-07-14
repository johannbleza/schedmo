import { features } from "@/lib/constants";

const Features = () => {
  return (
    <div className="grid grid-cols-3 gap-2 w-full">
      {features.map(({ name, description, icon }, index) => {
        const Icon = icon;
        return (
          <div
            key={name}
            className="border border-slate-200 rounded-lg flex flex-col items-center px-2 py-3 text-center gap-1 bg-white"
          >
            <div className="p-2 bg-blue-100 rounded-full text-blue-400">
              <Icon className="size-4" />
            </div>
            <h2 className="text-sm font-semibold">
              {index + 1}
              {". "}
              {name}
            </h2>
            <h3 className="text-xs text-slate-400">{description}</h3>
          </div>
        );
      })}
    </div>
  );
};

export default Features;
