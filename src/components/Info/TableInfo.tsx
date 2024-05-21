import { Button, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { Link } from "react-router-dom";

const TableInfo = ({
  title,
  titleBtn,
  hrefBtn,
  columns,
  dataSource,
  loading,
}: {
  title: string;
  titleBtn?: string;
  hrefBtn?: string;
  columns: ColumnsType;
  dataSource: object[];
  loading: boolean;
}) => {
  return (
    <>
      <section className="m-6 bg-white rounded-md ">
        <div className="flex flex-col lg:flex-row w-full">
          <div className="flex-1">
            <p className="px-6 py-5 text-lg">{title}</p>
          </div>
          {titleBtn && hrefBtn && (
            <div className="flex mr-6 items-center justify-center lg:justify-end">
              <Link to={hrefBtn}>
                <Button
                  type="primary"
                  className="bg-[#0174BE] text-white flex text-sm py-3 align-middle items-center"
                >
                  {titleBtn}
                </Button>
              </Link>
            </div>
          )}
        </div>
        <div className="mx-6 text-sm overflow-x-auto">
          <Table columns={columns} loading={loading} dataSource={dataSource} />
        </div>
      </section>
    </>
  );
};

export default TableInfo;
