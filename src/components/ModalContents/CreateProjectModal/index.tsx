import { IFormFieldType, IProjectDataType } from "@/@types";
import AuthForm from "@/components/Auth/AuthForm";
import Loading from "@/components/UI/Loading";
import { useProjects } from "@/context/ProjectsContext";
import { useUsers } from "@/context/UsersContext";
import { formatItem, translateItemKeys } from "@/services/format";
import { timestampFromNow } from "@/utils/time";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const CreateProjectModal = () => {
  const {
    sendNewProject,
    loading: projectsLoading,
    error: projectsError,
    setUpdate,
  } = useProjects();
  const router = useRouter();

  const [submitted, setSubmitted] = useState(false);
  const [confirmation, setConfirmation] = useState<boolean>(false);
  const [debtData, setDebtData] = useState<Partial<IProjectDataType>>({});

  const onSubmit = async (data: any) => {
    console.log({ data });
    setDebtData(data);
    setConfirmation(true);
  };

  const sendUpdate = async () => {
    const tempDebtData: Partial<IProjectDataType> = JSON.parse(
      JSON.stringify(debtData),
    );
    const queryId = router.asPath.split("/").pop();
    const formatedDebtData: any = {
      title: tempDebtData.title,
      desc: tempDebtData.desc,
      thumb: debtData.thumb,
      images: debtData.images,
    };

    if (queryId) {
      try {
        const res = sendNewProject(formatedDebtData);
        console.log({ res });
        setConfirmation(false);
        setSubmitted(true);
        setDebtData({});
        setUpdate(e => !e);
      } catch (err) {
        console.log(err);
      }
    } else console.log("Costumer Id not found");
  };

  const formFields: IFormFieldType = {
    title: {
      required: "Title é necessário",
      fieldLabel: "Titulo",
      fieldType: "text",
      divClassName: "col-start-1 col-end-3",
      defaultValue: String(debtData?.title || ""),
    },
    desc: {
      fieldType: "textarea",
      fieldLabel: "Descrição",
      divClassName: "col-start-1 col-end-4 row-start-2 row-end-6",
      inputClassName: "min-h-[200px] max-h-32",

      defaultValue: String(debtData?.desc || ""),
    },
    thumb: {
      fieldLabel: "Thumbnails",
      fieldType: "file",
    },
    images: {
      fieldLabel: "Imagens",
      fieldType: "file",
    },
  };

  const submitBtn = () => {
    if (projectsLoading) {
      return (
        <div className="loading-circle !h-[30px] after:!h-[10px] !border-[6px] !border-white !border-t-[transparent] after:hidden"></div>
      );
    }
    return "Submit";
  };

  const renderFormContent = () => {
    if (projectsLoading) return <Loading />;

    if (confirmation) {
      return (
        <div className="flex flex-col h-full justify-center items-center md:mx-auto text-[26px] dark:text-white">
          <div>
            <h4 className="text-center">Confirme os dados</h4>
          </div>
          <div className="md:grid md:grid-cols-2 grid-flow-row gap-4 my-4  overflow-y-auto">
            {Object.entries(debtData).map(([objEntry, objValue], i) => {
              return (
                <div key={i}>
                  <div className="flex flex-col md:flex-row gap-4">
                    <span>{translateItemKeys(objEntry)}:</span>
                    <span className="!font-light overflow-hidden text-ellipsis">
                      {formatItem(objValue, objEntry as any)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex gap-3 flex-col md:flex-row">
            <button
              className="btn !bg-transparent"
              onClick={() => setConfirmation(false)}
            >
              Cancel
            </button>
            <button className="btn" onClick={sendUpdate}>
              Confirm
            </button>
          </div>
        </div>
      );
    }

    if (submitted)
      return (
        <div className="flex flex-col h-full justify-center items-center mx-auto text-[26px] dark:text-white text-center">
          <div>
            {projectsError
              ? (projectsError as AxiosError).message
              : "Débito Criado com Sucesso"}
          </div>
        </div>
      );

    return (
      <AuthForm
        className="w-full flex justify-center items-start flex-col h-full md:items-start md:grid md:grid-cols-3 md:gap-x-4"
        handleOnSubmit={onSubmit}
        submitBtn={submitBtn}
        formFields={formFields}
      />
    );
  };

  return (
    <div className="container mx-auto min-w-[250px] md:-w-[800px] w-[300px] lg:min-w-[1000px]">
      <h2 className="px-12 mt-8 text-center text-2xl font-semibold text-blue-900 dark:text-white">
        Novo Projeto
      </h2>
      <div className="max-h-[80vh] overflow-y-scroll md:overflow-y-auto md:min-h-[60vh] flex justify-center items-start">
        {renderFormContent()}
      </div>
    </div>
  );
};

export default CreateProjectModal;
