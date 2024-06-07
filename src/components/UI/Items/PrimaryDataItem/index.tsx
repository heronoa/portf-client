import {
  IFilterKeyOption,
  IFormatItem,
  IProjectDataType,
  IUserDataType,
} from "@/@types";
import {
  formatItem,
  sortItemsData,
  translateItemKeys,
} from "@/services/format";
import TinyItem from "../TinyItem";

import { FcViewDetails } from "react-icons/fc";
import Link from "next/link";

interface Props {
  data: IUserDataType | IProjectDataType;
  type: string;
}

const PrimaryDataItem = ({ data, type }: Props) => {
  const sortedData = ((data: any): any => {
    const dataCopy = JSON.parse(JSON.stringify(data));
    const dataEntries = Object.entries(dataCopy);

    const name = dataEntries.filter(e => e[0] === "title");
    const others = dataEntries.filter(e => e[0] !== "title");

    others.sort();

    return [...name, ...others];
  })(data);

  const renderValue = (
    objKey: IFilterKeyOption | "age" | undefined,
    objValue: IFormatItem,
  ) => {
    if (
      !Array.isArray(objValue) ||
      ["projects", "teamUids"].includes(objKey as string)
    ) {
      return formatItem(objValue, objKey);
    }

    // if (Array.isArray(objValue)) {
    //   return (
    //     <div className="grid grid-cols-2 grid-flow-row gap-2 ">
    //       {objValue.map((value, index) => (
    //         <div key={index} className="w-full">
    //           <TinyItem value={value as string} />
    //         </div>
    //       ))}
    //     </div>
    //   );
    // }

    return objValue;
  };

  return (
    <div
      style={{
        backgroundImage: `url(${
          (data as unknown as any)?.thumb || "/images/project_preview.png"
        })`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className=" relative z-[1] flex w-[100%] wrap first:mt-0 mt-4 md:mt-0 shadow-2xl md:shadow-none md:border-t-0 md:border-x-0 md:rounded-none border border-grey-200 md:!border-b md:!border-b-gray-300 rounded-[15px] flex-col justify-between text-lg md:hover:dark:bg-[#333333] md:hover:bg-gray-200 even:bg-gray-100 dark:even:bg-[#333333] "
    >
      <div className="absolute z-[2] inset-0 bg-[#000000aa]"></div>
      {sortedData.map(([objKey, objValue]: any[], index: number) => {
        if (["project_id", "thumb", "images", "__v", "_id"].includes(objKey)) {
          return null;
        }
        return (
          <div
            onClick={() => console.log({ sortedData })}
            key={`${
              (data as any)?.uid || (data as any)?.id
            }-${objKey}-${index}`}
            style={{ overflowWrap: "anywhere" }}
            className={`flex z-[3] flex-col border-r-gray-400 md:border-none md:border-r min-w-[50px] last:border-0 gap-2 justify-center items-center p-4 overflow-x-hidden overflow-ellipsis w-full`}
          >
            <span className="font-semibold md:hidden text-center">
              {translateItemKeys(objKey)}:
            </span>
            <span className="min-w-[100px] text-center">
              {renderValue(
                objKey as IFilterKeyOption | "age" | undefined,
                objValue as IFormatItem,
              )}
            </span>
          </div>
        );
      })}
      <div className="absolute md:static right-4  min-h-[50px] flex justify-center items-center bottom-[5%]">
        <Link
          href={`/${type}/${
            type === "costumers"
              ? (data as any).costumer_id
              : (data as any).debt_id
          } `}
        >
          <FcViewDetails className="w-[48px] h-[48px]" />
        </Link>
      </div>
    </div>
  );
};

export default PrimaryDataItem;
