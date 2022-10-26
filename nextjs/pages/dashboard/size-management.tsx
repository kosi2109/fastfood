import React, { useCallback, useEffect, useState } from "react";
import ContentWrapper from "../../components/dashboard/ContentWrapper";
import Table from "../../components/dashboard/Table";
import DashboardLayout from "../../components/Layouts/DashboardLayout";
import { BiSearch } from "react-icons/bi";
import { menuApi } from "../../store/rtk/menus";
import TableDialog from "../../components/Dialog/TableDialog";
import { categoryApi } from "../../store/rtk/category";
import { sizeApi } from "../../store/rtk/sizes";
import ConfirmDialog from "../../components/Dialog/ConfirmDialog";

const sizeTable = {
  colNames: [
    {
      name: "Size",
      key: "name",
    },
  ],
  data: [],
  action: true,
};

const initialDialogData: { fields: any[]; initial: any; title: string } = {
  fields: [
    {
      name: "name",
      category: "input",
      type: "text",
      title: "Size",
    },
  ],
  initial: {
    name: "",
  },
  title: "Menus",
};

function SizeManagement() {
  const { data: sizes, isLoading } = sizeApi.useGetAllQuery({});
  const [addSize, { isLoading: createLoading }] = sizeApi.useAddSizeMutation();
  const [editSize, { isLoading: editLoading }] = sizeApi.useEditSizeMutation();
  const [deleteSize, { isLoading: deleteLoading }] =
    sizeApi.useDeleteSizeMutation();
  const [dialogData, setDialogData] = useState(initialDialogData);
  const [oldData, setOldData] = useState<any>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState<any>(null);

  useEffect(() => {
    if (oldData) {
      setOpenDialog(true);
    } else {
      setOpenDialog(false);
    }
  }, [oldData]);

  const onAddSize = useCallback(
    (data: any) => {
      addSize(data);
    },
    [addSize]
  );

  const onEditSize = useCallback(
    (data: any) => {
      editSize(data);
    },
    [editSize]
  );

  const onDeleteSize = useCallback(
    (id: any) => {
      deleteSize(id);
    },
    [deleteSize]
  );

  return (
    <DashboardLayout>
      {openDialog && (
        <TableDialog
          onClose={oldData ? setOldData : setOpenDialog}
          dialogData={dialogData}
          oldData={oldData}
          formAction={oldData ? onEditSize : onAddSize}
          isLoading={createLoading || editLoading}
        />
      )}
      {openDeleteDialog && (
        <ConfirmDialog
          title="Selete Confirm"
          id={openDeleteDialog?.id}
          onClose={setOpenDeleteDialog}
          formAction={onDeleteSize}
          isLoading={deleteLoading}
        />
      )}
      <ContentWrapper name="Menu Management">
        <div className="flex mb-3 items-center">
          <button
            onClick={() => setOpenDialog(true)}
            className="border mr-3 border-bgGreen py-1 px-2 rounded-full hover:bg-bgGreen hover:text-white"
          >
            Add Menu
          </button>
          <div className="border h-10 px-2 rounded-md flex items-center justify-center">
            <input className="outline-none border-none" type="text" />
            <button className="w-10 flex items-center justify-center">
              <BiSearch size={20} />
            </button>
          </div>
        </div>
        <Table
          data={sizeTable}
          tableData={sizes?.data}
          onDataEmmit={setOldData}
          onDeleteEmmit={setOpenDeleteDialog}
          isLoading={isLoading}
        />
      </ContentWrapper>
    </DashboardLayout>
  );
}

export default SizeManagement;
