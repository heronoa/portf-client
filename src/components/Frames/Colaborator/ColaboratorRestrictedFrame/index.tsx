import { IFilterOptions, IRestrictedDataType, IUserDataType } from "@/@types";
import FilterOptionsPanel from "@/components/UI/FilterOptionsPanel";
import RenderItems from "@/components/UI/RenderItems";
import { useUsers } from "@/context/UsersContext";
import { useEffect, useState } from "react";

interface Props {
  user: IUserDataType;
}

const ColaboratorRestrictedFrame = ({ user }: Props) => {
  const { getRestrictedData, loading, update } = useUsers();
  const [data, setData] = useState<IRestrictedDataType>();
  const [error, setError] = useState<string | null>();
  const [filterOptions, setFilterOptions] = useState<IFilterOptions>({
    // adress: { ASC: null },
  });

  useEffect(() => {
    const fetcher = async () => {
      const data = await getRestrictedData(user.costumer_id);
      console.log({ data });
      setData(data);
    };
    fetcher();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [update, user]);

  return (
    <div className="frame-container !px-0">
      {/* <div>
        <h4>Débitos</h4>
      </div>
      <div className="w-full flex flex-col justify-center mt-12">
        <div className="">
          <FilterOptionsPanel
            filterOptions={filterOptions}
            setFilterOptions={setFilterOptions}
            hideSearch
          />
        </div>
        <div className="w-full flex flex-col justify-center">
          {Array.isArray(data) && (
            <RenderItems
              type={"debts"}
              arrayItems={data}
              error={error}
              loading={loading}
              filterOptions={filterOptions}
            />
          )}
        </div>
      </div> */}
    </div>
  );
};

export default ColaboratorRestrictedFrame;
