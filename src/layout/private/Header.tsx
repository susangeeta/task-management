import { boardIcon, listIcon, logoutIcon, tasksIcon } from "../../assets/svg";

const Header = () => {
  return (
    <div className="custom-container flex gap-1.5 py-8 flex-col ">
      <div className="flex justify-between ">
        <div className="flex items-center">
          <img src={tasksIcon} className="h-8 w-8" />
          <h1 className="text-xxl text-[#2F2F2F]">TaskBuddy</h1>
        </div>
        <div className="flex gap-2 items-center">
          <img
            src="https://s3-alpha-sig.figma.com/img/f549/15dc/fd930beee5a3918d920109c2020d3ccb?Expires=1736726400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=fG6bpMjRaoiYGZAxpsNvFcV04wEas6UnRl7Q2F-uG5IvCobzqCJRlvf~VvvFrTPiUpqFpmssZYHMoX6inPMPy1I0A-IFYnUqwuOfpWlOKt2n0bAwY5cbd1PmocCZDW8Zux5jvcyU-DiaXzbqLJ36TimO-apcXKFkyayD6zQymw8vREBvLKbxUphXnV8-g-048gRpNtW9hfFZhOs3qY3B4c0fnHHjgBKT7yiKROHVzo7FyoolZadpXae1km6Up0BnebFF6hCwv-KooYjYT~GJDEpmd2WNjD1MgPVuZ09LeqIscIeyMiZH64nUwsLIqycUXRw725ATsfmutIw8StyJdA__"
            className="h-10 w-10 object-cover rounded-full"
          />
          <h1 className="text-base text-[#2F2F2F]">Aravind</h1>
        </div>
      </div>

      <section className="flex justify-between ">
        <div className="flex gap-3 px-1">
          <div className="flex items-center gap-1 ">
            <img src={listIcon} className="h-4 w-4" />
            <h1 className="text-text-tertiary text-base font-semibold">List</h1>
          </div>
          <div className="flex items-center gap-1">
            <img src={boardIcon} className="h-4 w-4" />
            <h1 className="text-text-tertiary text-base font-semibold">
              Board
            </h1>
          </div>
        </div>
        <div className="flex ml-8 ">
          <button className="bg-background-logout-color  gap-2 flex items-center rounded-xl px-2 h-[40px] w-[112px]  border border-text-primary/15">
            <img src={logoutIcon} className="h-[15px] w-[15px]" />
            <span className="text-base font-semibold">LogOut</span>
          </button>
        </div>
      </section>
    </div>
  );
};

export default Header;
