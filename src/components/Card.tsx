type Props = {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick?: () => void;
};

export default function Card({ icon, title, description, onClick }: Props) {
  return (
    <div
      className="flex w-full h-full flex-col min-w-60 gap-2 px-4 py-3 bg-gray-300 rounded-md hover:cursor-pointer hover:bg-gray-800 hover:text-white transition-colors"
      onClick={onClick}
    >
      <div className="flex flex-row items-center gap-1.5">
        {icon} <span className="text-sm font-semibold">{title}</span>
      </div>
      <p className="text-xs">{description}</p>
    </div>
  );
}
