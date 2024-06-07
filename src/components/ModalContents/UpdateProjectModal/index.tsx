import { IFormFieldType, IProjectDataType } from "@/@types";
import AuthForm from "@/components/Auth/AuthForm";
import Loading from "@/components/UI/Loading";
import { useProjects } from "@/context/ProjectsContext";
import { useUsers } from "@/context/UsersContext";
import { formatItem, translateItemKeys } from "@/services/format";
import { timestampFromNow } from "@/utils/time";
import { useRouter } from "next/router";
import { useState } from "react";

const UpdateProjectModal = () => {
  const {
    loading: projectsLoading,
    error: projectsError,
    setUpdate,
  } = useUsers();

  const { updateProjects, allProjects } = useProjects();
  const router = useRouter();
  const queryId = router.asPath.split("/").pop();

  // const currentDebt = allProjects?.find(e => e?.debt_id === queryId);

  const [submitted, setSubmitted] = useState(false);
  const [confirmation, setConfirmation] = useState<boolean>(false);
  // const [debtData, setDebtData] = useState<Partial<IProjectDataType>>(
  //   currentDebt || {},
  // );
  const [period, setPeriod] = useState<string>("mensal");

  const setDueDateByPeriod = (string_date: string) => {
    const periodType = period;
    const initial_date = new Date(string_date);
    const due_date = new Array(4).fill(0).map((_, i) => {
      return new Date(
        timestampFromNow({
          initial_date,
          days:
            periodType === "quinzenal"
              ? (i + 1) * 15
              : periodType === "diario"
              ? i + 1
              : 0,
          months:
            periodType === "semestral"
              ? (i + 1) * 6
              : periodType === "mensal"
              ? i + 1
              : 0,
          years: periodType === "anual" ? i + 1 : 0,
          weeks: periodType === "semanal" ? i + 1 : 0,
        }),
      );
    });
    console.log({ due_date, initial_date, periodType });
    return due_date;
  };

  // const onSubmit = async (data: any) => {
  //   console.log({ data });
  //   data.value = Number(data.initial_value) * (1 + Number(data.fee) / 100);
  //   data.due_dates = setDueDateByPeriod(data.initial_date);
  //   console.log({ data });
  //   setDebtData(data);
  //   setConfirmation(true);
  // };

  // const sendUpdate = async () => {
  //   const tempDebtData: Partial<IProjectDataType> = JSON.parse(
  //     JSON.stringify(debtData),
  //   );

  //   const formatedDebtData: any = {
  //     debt_id: queryId,
  //     callings: Number(tempDebtData.callings),
  //     value: Number(tempDebtData.value),
  //     initial_value: Number(tempDebtData.initial_value),
  //     payment_method: tempDebtData.payment_method,
  //     fee: Number(tempDebtData.fee) / 100,
  //     initial_date: new Date(tempDebtData.initial_date as unknown as string),
  //     due_dates: tempDebtData.due_dates,
  //     payed: Number(tempDebtData.payed),
  //     late_fee: Number(tempDebtData.late_fee),
  //     description: tempDebtData.description,
  //     doc: debtData.doc,
  //   };

  //   if (queryId) {
  //     try {
  //       const res = updateProjects(formatedDebtData);
  //       console.log({ res });
  //       setConfirmation(false);
  //       setSubmitted(true);
  //       setUpdate(e => !e);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   } else console.log("Costumer Id not found");
  // };

  // const formFields: IFormFieldType = {
  //   initial_value: {
  //     required: "Valor inicial é necessário",
  //     fieldLabel: "Valor Inicial (R$)",
  //     fieldType: "text",
  //     divClassName: "col-start-1 col-end-3",
  //     defaultValue: String(debtData?.initial_value || 0),
  //   },
  //   description: {
  //     fieldType: "textarea",
  //     fieldLabel: "Descrição",
  //     divClassName: "col-start-1 col-end-4 row-start-2 row-end-6",
  //     inputClassName: "max-h-32",
  //     defaultValue: String(debtData?.description || ""),
  //   },
  //   fee: {
  //     required: "Taxa é necessário",
  //     fieldLabel: "Taxa (%)",
  //     fieldType: "number",
  //     defaultValue: String(debtData?.fee || 0),
  //     min: "0",
  //     step: "0.01",
  //   },
  //   initial_date: {
  //     required: "Data de Inicio é necessário",
  //     fieldType: "date",
  //     fieldLabel: "Data de Inicio",
  //     defaultValue:
  //       new Date(String(debtData?.initial_date)).toLocaleDateString("en-CA") ||
  //       new Date(Date.now()).toLocaleDateString("en-CA"),
  //   },
  //   period: {
  //     required: "Periodicidade é necessário",
  //     fieldType: "select",
  //     fieldLabel: "Periodicidade",
  //     options: [
  //       "diario",
  //       "semanal",
  //       "quinzenal",
  //       "mensal",
  //       "semestral",
  //       "anual",
  //     ],
  //     inputClassName: "h-full w-full",

  //     _formStates: [period, setPeriod],
  //   },
  //   payed: {
  //     fieldLabel: "Pago adiatado (R$)",
  //     fieldType: "number",
  //     defaultValue: String(debtData?.payed || 0),
  //   },
  //   late_fee: {
  //     fieldLabel: "Multa por atraso (R$)",
  //     required: "Multa por Atraso é necessario",
  //     fieldType: "number",
  //     step: "0.01",
  //     defaultValue: String(debtData?.late_fee || 0),
  //   },
  //   payment_method: {
  //     fieldLabel: "Método de Pagamento",
  //     fieldType: "string",
  //     defaultValue: String(debtData?.payment_method || ""),
  //   },
  //   doc: {
  //     fieldLabel: "Documento",
  //     fieldType: "file",
  //   },
  // };

  const submitBtn = () => {
    if (projectsLoading) {
      return (
        <div className="loading-circle !h-[30px] after:!h-[10px] !border-[6px] !border-white !border-t-[transparent] after:hidden"></div>
      );
    }
    return "Submit";
  };

  // const renderFormContent = () => {
  //   if (projectsLoading) return <Loading />;

  //   if (confirmation) {
  //     return (
  //       <div className="flex flex-col h-full justify-center items-center md:mx-auto text-[26px] dark:text-white">
  //         <div>
  //           <h4 className="text-center">Confirme os dados</h4>
  //           <h4 className="px-12 mt-8 text-center text-xl font-semibold text-blue-900 dark:text-white">
  //             Essa ação é irreversível e substituirá o débito anterior
  //           </h4>
  //         </div>
  //         <div className="md:grid md:grid-cols-2 grid-flow-row gap-4 my-4  overflow-y-auto">
  //           {Object.entries(debtData).map(([objEntry, objValue], i) => {
  //             return (
  //               <div key={i}>
  //                 <div className="flex flex-col md:flex-row gap-4">
  //                   <span>{translateItemKeys(objEntry)}:</span>
  //                   {objEntry === "due_dates" ? (
  //                     <span className="flex flex-col">
  //                       {(objValue as Date[]).map((e, i) => (
  //                         <small key={i}>
  //                           {formatItem(e.toISOString(), objEntry as any)}
  //                         </small>
  //                       ))}
  //                     </span>
  //                   ) : (
  //                     <span className="!font-light">
  //                       {formatItem(String(objValue), objEntry as any)}
  //                     </span>
  //                   )}
  //                 </div>
  //               </div>
  //             );
  //           })}
  //         </div>
  //         <div className="flex gap-3 flex-col md:flex-row">
  //           <button
  //             className="btn !bg-transparent"
  //             onClick={() => setConfirmation(false)}
  //           >
  //             Cancel
  //           </button>
  //           <button className="btn" onClick={sendUpdate}>
  //             Confirm
  //           </button>
  //         </div>
  //       </div>
  //     );
  //   }

  //   if (submitted)
  //     return (
  //       <div className="flex flex-col h-full justify-center items-center mx-auto text-[26px] dark:text-white text-center">
  //         <div>
  //           {projectsError ? projectsError : "Débito Criado com Sucesso"}
  //         </div>
  //       </div>
  //     );

  //   return (
  //     <AuthForm
  //       className="w-full flex justify-center items-start flex-col h-full md:items-start md:grid md:grid-cols-3 md:gap-x-4"
  //       handleOnSubmit={onSubmit}
  //       submitBtn={submitBtn}
  //       formFields={formFields}
  //     />
  //   );
  // };

  return (
    <div className="container mx-auto min-w-[250px] md:-w-[800px] w-[300px] lg:min-w-[1000px]">
      <h2 className="px-12 mt-8 text-center text-2xl font-semibold text-blue-900 dark:text-white">
        Renegociando Débito
      </h2>
      <div className="max-h-[80vh] overflow-y-scroll md:overflow-y-auto md:min-h-[60vh] flex justify-center items-start">
        {/* {renderFormContent()} */}
      </div>
    </div>
  );
};

export default UpdateProjectModal;
