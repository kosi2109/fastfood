import React, { useCallback, useEffect, useState } from "react";
import ContentWrapper from "../../components/dashboard/ContentWrapper";
import Table from "../../components/dashboard/Table";
import DashboardLayout from "../../components/Layouts/DashboardLayout";
import { BiSearch } from "react-icons/bi";
import { menuApi } from "../../store/rtk/menus";
import TableDialog from "../../components/Dialog/TableDialog";
import { categoryApi } from "../../store/rtk/category";
import ConfirmDialog from "../../components/Dialog/ConfirmDialog";

const menuTable = {
  colNames: [
    {
      name: "Image",
      key: "cover_img",
      image: true,
    },
    {
      name: "Name",
      key: "name",
    },
    {
      name: "Sizes",
      key: "sizes",
      nusted: true,
      nustedKey: "name",
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
      title: "Menu Name",
    },
    {
      name: "slug",
      category: "input",
      type: "text",
      title: "Slug",
    },
    {
      name: "description",
      category: "input",
      type: "text",
      title: "Description",
    },
    {
      name: "cover_img",
      category: "input",
      type: "text",
      title: "Image",
    },
    {
      name: "categories",
      category: "select",
      title: "Category",
      keyField: "id",
      nameField: "name",
      select: [],
    },
  ],
  initial: {
    name: "",
    slug: "",
    description: "",
    cover_img: "",
    categories: [],
  },
  title: "Menus",
};

function MenuManagement() {
  const { data: menus, isLoading } = menuApi.useGetAllQuery({});
  const { data: categories } = categoryApi.useGetAllQuery({});
  const [addMenu, {isLoading : createLoading , error}] = menuApi.useAddMenuMutation();
  const [editMenu, {isLoading : editLoading}] = menuApi.useEditMenuMutation();
  const [deleteMenu, {isLoading : deleteLoading}] = menuApi.useDeleteMenuMutation();
  const [dialogData, setDialogData] = useState(initialDialogData);
  const [oldData, setOldData] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState<any>(null);
  console.log(error);
  
  useEffect(() => {
    if (oldData) {
      setOpenDialog(true);
    } else {
      setOpenDialog(false);
    }
  }, [oldData]);

  useEffect(() => {
    let newField = dialogData.fields;
    newField[4].select = categories?.data;

    setDialogData({
      ...dialogData,
      fields: newField,
    });
  }, [categories]);

  const onAddMenu = useCallback((data : any)=> {
    addMenu(data)
  },[addMenu])

  const onEditMenu = useCallback((data : any)=> {
    editMenu(data)
  },[editMenu])

  const onDeleteMenu = useCallback(
    (id: any) => {
      deleteMenu(id);
    },
    [deleteMenu]
  );

  return (
    <DashboardLayout>
      <button onClick={onAddMenu}>Click</button>
      {openDialog && (
        <TableDialog
          onClose={oldData ? setOldData : setOpenDialog}
          dialogData={dialogData}
          oldData={oldData}
          formAction={oldData ? onEditMenu : onAddMenu}
          isLoading={createLoading || editLoading}
        />
      )}
      {openDeleteDialog && (
        <ConfirmDialog
          title="Selete Confirm"
          id={openDeleteDialog?.id}
          onClose={setOpenDeleteDialog}
          formAction={onDeleteMenu}
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
          data={menuTable}
          tableData={menus?.data}
          onDataEmmit={setOldData}
          isLoading={isLoading}
        />
      </ContentWrapper>
    </DashboardLayout>
  );
}

export default MenuManagement;