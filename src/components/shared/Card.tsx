interface DetailCardProps {
    title: string;
    details: { label: string; value: string | number }[];
  }
  
  export const DetailCard = ({ title, details }: DetailCardProps) => {
    return (
      <div className="p-2 md:p-4 bg-white border border-gray-300 shadow-md rounded-lg">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <ul className="space-y-2">
          {details.map((detail, index) => (
            <li key={index} className="flex flex-col gap-2 xl:flex-row justify-between border-b pb-2">
              <span className="font-semibold w-1/4">{detail.label}:</span>
              <span className="w-3/4">{detail.value}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  