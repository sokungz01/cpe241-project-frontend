const AnalyticCard = ({
  icon,
  title,
  data,
}: {
  icon: React.ReactNode;
  title: string | React.ReactNode;
  data: string | number;
}) => {
  return (
    <>
      <div className="bg-white shadow-lg rounded-xl  p-6">
        <div className="flex flex-row justify-evenly">
          <div className="flex flex-col justify-center items-center">
            {icon}
          </div>

          <div className="flex flex-col gap-y-4">
            {typeof title === "string" ? (
              <>
                <p className="font-normal text-2xl">{title}</p>
              </>
            ) : (
              <>{title}</>
            )}
            <p className="tabular-numeric font-light text-2xl">{data}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AnalyticCard;
