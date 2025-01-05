const TodoDataList = () => {
  const data = [
    {
      id: 1,
      title: "Interview with Design Team",
      data: "Today",
      taskStatus: "TO-DO",
      taskCategory: "Work",
    },
    {
      id: 2,
      title: "Interview with Design Team",
      data: "Today",
      taskStatus: "TO-DO",
      taskCategory: "Work",
    },
    {
      id: 3,
      title: "Interview with Design Team",
      data: "Today",
      taskStatus: "TO-DO",
      taskCategory: "Work",
    },
  ];
  return (
    <div>
      {data.map((item, i) => (
        <div key={i}>
          <h1>{item.title}</h1>
          <h1>{item.data}</h1>
          <h1>{item.taskStatus}</h1>
          <h1>{item.taskCategory}</h1>
        </div>
      ))}
    </div>
  );
};

export default TodoDataList;
