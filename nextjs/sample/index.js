// sample data for table

const testData = {
  colNames: [
    {
      name: "Item Name",
      key: "name",
    },
    {
      name: "Age",
      key: "age",
    },
  ],
  data: [
    {
      id: 1,
      name: "Win Win",
      age: 21,
    },
  ],
  action: true,
  checkBox: false,
};

// sample data for dialog
const dialogData = {
  fields: [
    {
      name: "name",
      category: "input",
      type: "text",
      title: "Name",
    },
    {
      name: "age",
      category: "input",
      type: "number",
      title: "Age",
    },
    {
      name: "department",
      category: "select",
      title: "Department",
      keyField: "id",
      nameField: "name",
      select: [
        {
          id: "test",
          name: "Text",
        },
      ],
    },
  ],
  title: "User Information",
};
