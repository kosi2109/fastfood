import React, { useState } from "react";
import { FiMinus } from "react-icons/fi";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import Table from "../../components/dashboard/Table";
import DashboardLayout from "../../components/Layouts/DashboardLayout";

const activeUsersTable = {
    colNames: [
        {
          name: "Name",
          key: "name",
        },
        {
          name: "Address",
          key: "address",
        },
      ],
      data: [
        {
          id: 1,
          name: "Win Win",
          address: '1212.121,1212.121',
        },
      ]
}

const bestSellingTable = {
    colNames: [
        {
          name: "Name",
          key: "name",
        },
        {
          name: "Total Order",
          key: "totalOrder",
        },
      ],
      data: [
        {
          id: 1,
          name: "Humbarger",
          totalOrder: 10,
        },
      ]
}

const index = () => {
  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 my-3">
        <div className="w-full h-28 shadow lg:shadow-lg flex justify-between items-start p-3">
          <div>
            <h5 className="font-medium text-grey">Today</h5>
            <h4 className="font-semibold text-2xl text-textGreen">100000 KS</h4>
          </div>
          <div className="flex">
            <IoMdArrowDropup size={25} color="green" />
            <h5>10 %</h5>
          </div>
        </div>
        <div className="w-full h-28 shadow lg:shadow-lg flex justify-between items-start p-3">
          <div>
            <h5 className="font-medium text-grey">This Week</h5>
            <h4 className="font-semibold text-2xl text-textGreen">100000 KS</h4>
          </div>
          <div className="flex">
            <IoMdArrowDropdown size={25} color="red" />
            <h5>10 %</h5>
          </div>
        </div>
        <div className="w-full h-28 shadow lg:shadow-lg flex justify-between items-start p-3">
          <div>
            <h5 className="font-medium text-grey">This Month</h5>
            <h4 className="font-semibold text-2xl text-textGreen">100000 KS</h4>
          </div>
          <div className="flex">
            <FiMinus size={25} color="yellow" />
            <h5>10 %</h5>
          </div>
        </div>
      </div>

      {/* 2 row */}
        <div className="w-full shadow lg:shadow-lg p-3 mb-3">
            <h3 className="font-semibold text-2xl text-stone-300 mb-2">Active Order</h3>
            <Table data={activeUsersTable} />
        </div>
        <div className="w-full shadow lg:shadow-lg p-3 mb-3">
            <h3 className="font-semibold text-2xl text-stone-300 mb-2">Best Selling</h3>
            <Table data={bestSellingTable} />
        </div>
    </DashboardLayout>
  );
};

export default index;
