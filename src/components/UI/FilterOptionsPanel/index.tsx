import { IFilterKeyOption, IFilterOptions } from "@/@types";
import AddButton from "@/components/Auth/AddButton";
import { useModals } from "@/context/ModalsContext";
import { useUsers } from "@/context/UsersContext";
import {
  formatItem,
  sortItemsData,
  translateItemKeys,
} from "@/services/format";
import { Dispatch, SetStateAction } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { MdOutlineRefresh } from "react-icons/md";

interface Props {
  filterOptions: IFilterOptions;
  setFilterOptions: Dispatch<SetStateAction<IFilterOptions>>;
  hideSearch?: boolean;
}

const FilterOptionsPanel = ({
  filterOptions,
  setFilterOptions,
  hideSearch = false,
}: Props) => {
  const sortedData = sortItemsData(filterOptions);
  const { setModalIsOpen, setModalContentKey } = useModals();
  const { setUpdate } = useUsers();

  const handleChangeFilter = (key: string, value: string) => {
    setFilterOptions(prevState => {
      const newState: any = { ...prevState };
      newState[key] = value;
      return newState;
    });
  };

  return (
    <div className="w-full flex-col md:flex-row md:justify-between rounded-2xl dark:border-b-0 dark:border-l-0 dark:border-r-0 md:rounded-none shadow-lg bg-white dark:bg-[#333333] dark:border dark:border-grey-200  md:bg-gray-200 md:h-[50px] mx-auto flex gap-4 justify-center h-[150px] items-center px-4">
      <div className="flex gap-4">
        <AddButton
          fn={() => {
            setModalContentKey(
              filterOptions?.email !== undefined
                ? "addcolaborator"
                : "createprojects",
            );
            setModalIsOpen(true);
          }}
        />
        <MdOutlineRefresh
          className="w-12 h-12 cursor-pointer text-blue-900"
          onClick={() => {
            setUpdate(e => !e);
          }}
        />
      </div>
      {!hideSearch && (
        <div className="flex md:h-full md:flex-row flex-col gap-4 md:gap-3">
          <div className="h-[75%] relative">
            <input
              value={filterOptions.name as string}
              onChange={evt => handleChangeFilter("title", evt.target.value)}
              className="h-full bg-transparent border-b border-b-blue-900 dark:border-b-white focus:outline-none"
              placeholder="Procure por titulo"
            />
            <div className="absolute top-[20%] right-3 text-blue-900 dark:text-white">
              <AiOutlineSearch className=" w-[24px] h-[24px] " />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterOptionsPanel;
