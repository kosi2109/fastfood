import React, { useState } from "react";
import FormButton from "../Form/FormButton";
import Input from "../Form/Input";
import Modal from "../Modal/Modal";

function TableDialog({ dialogData, oldData = null, onClose , formAction, isLoading}: any) {
  const [formData, setFormData] = useState(oldData ? oldData : dialogData.initial);

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e : any)=> {
    e.preventDefault();
    formAction(formData);
  }
  return (
    <Modal title={dialogData?.title} onClose={onClose}>
      <form onSubmit={handleSubmit} className="flex flex-col px-5">
        {dialogData?.fields?.map((data: any, i: number) => {
          // for input
          if (data.category === "input") {
            return (
              <Input
                key={i}
                handleChange={handleChange}
                title={data?.title}
                id={data?.name}
                name={data?.name}
                type={data?.type}
                value={formData[data?.name]}
              />
            );
          }

          //   for select
          if (data.category === "select") {
            return (
              <div className="w-full flex flex-col">
                <label className="mb-2 text-textGray" htmlFor={data.title}>{data.title}</label>
                <select
                  className="h-10 rounded-md border w-full px-2 focus:outline-textGreen"
                  name={data.name}
                  id={data.title}
                  multiple
                  onChange={handleChange}
                  value={formData[data?.name]}
                >
                  <option value="" disabled>
                    Select
                  </option>
                  {data?.select?.map((d: any) => (
                    <option
                      key={d[data.keyField]}
                      value={d[data.keyField]}
                    >
                      {d[data.nameField]}
                    </option>
                  ))}
                </select>
              </div>
            );
          }

        {/* select box */}
        if (data.category === 'check-box') {
          return <div className="flex flex-col">
            <label className="mb-2 text-textGray">{data.title}</label>
            <div className="max-h-24 border-2 p-2 rounded-sm overflow-y-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
              {data?.select?.map((c : any) => (
                <div key={c[data.keyField]}>
                  <input checked={oldData && oldData[data?.name].includes(c[data.keyField])} id={data?.name + c[data?.keyField]} type="checkbox" value={c[data.keyField]} />
                  <label className="ml-2" htmlFor={data?.name + c[data?.keyField]} >{c[data.nameField]}</label>
                </div>
              ))}
            </div>
          </div>
        }
        })}


        <div className="flex">
          <button
            className="my-5 bg-white w-1/2 flex items-center justify-center h-10 rounded-md text-textGreen font-bold hover:border"
            onClick={() => onClose(false)}
            type="button"
          >
            Cancel
          </button>

          <FormButton
            loading={isLoading}
            text={oldData ? "Edit" : "Save"}
            className="w-1/2 mx-1"
          />
        </div>
      </form>
    </Modal>
  );
}

export default TableDialog;
