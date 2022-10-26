import React, { useState } from "react";
import FormButton from "../Form/FormButton";
import Input from "../Form/Input";
import Modal from "../Modal/Modal";

function TableDialog({ dialogData, oldData = null, onClose }: any) {
  const [formData, setFormData] = useState(oldData);

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  console.log(oldData);

  return (
    <Modal title={dialogData?.title} onClose={onClose}>
      <form className="flex flex-col">
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
                value={oldData ? formData[data?.name] : ""}
              />
            );
          }

          //   for select
          if (data.category === "select") {
            return (
              <div className="w-full flex flex-col">
                <label htmlFor={data.title}>{data.title}</label>
                <select
                  className="h-10 rounded-md border w-full px-2 focus:outline-textGreen"
                  name={data.name}
                  id={data.title}
                >
                  <option value="" disabled selected>
                    Select
                  </option>
                  {data.select.map((d: any) => (
                    <option
                      key={d[data.keyField]}
                      selected={
                        oldData && d[data.keyField] === oldData[data.name]
                          ? true
                          : false
                      }
                      value={d[data.keyField]}
                    >
                      {d[data.nameField]}
                    </option>
                  ))}
                </select>
              </div>
            );
          }
        })}

        <div className="flex">
          <FormButton
            type="button"
            loading={false}
            text="Cancel"
            className="w-1/2 bg-white text-textGreen hover:bg-white mx-1 hover:border"
          />
          <FormButton
            loading={false}
            text={oldData ? "Edit" : "Save"}
            className="w-1/2 mx-1"
          />
        </div>
      </form>
    </Modal>
  );
}

export default TableDialog;
