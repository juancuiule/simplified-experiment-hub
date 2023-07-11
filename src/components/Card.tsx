type Props = {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick?: () => void;
};

export default function Card({ icon, title, description, onClick }: Props) {
  return (
    <div
      className="flex flex-col w-60 gap-2 px-4 py-3 bg-gray-100 rounded-md hover:cursor-pointer hover:bg-gray-400"
      onClick={onClick}
    >
      <div className="flex flex-row items-center gap-1.5">
        {icon} <span className="text-sm font-semibold">{title}</span>
      </div>
      <p className="text-xs">{description}</p>
    </div>
  );
}
