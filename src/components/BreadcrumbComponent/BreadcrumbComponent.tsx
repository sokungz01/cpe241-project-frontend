import { IBreadcrumb } from "@/interface/utils.interface";
import { Breadcrumb } from "antd";

const BreadcrumbComponent = ({
  title,
  links,
}: {
  title: string;
  links: IBreadcrumb[];
}) => (
  <>
    <div className=" px-6 py-6 bg-white">
      <Breadcrumb className="w-full text-sm align-middle" items={links} />
      <div className="pt-[16px]">
        <p className="text-xl align-middle">{title}</p>
      </div>
    </div>
  </>
);

export default BreadcrumbComponent;
