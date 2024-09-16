import Configuration from "./Configuration";
import { useSelector } from "react-redux";
import { Notification } from "./Notification";




const Drawer = () => {
  const modal = useSelector((state)=>state.modal);
  

  return (
    <div className="relative">
      <div className="fixed z-50 top-0 right-0 w-96 h-screen bg-[#dde4ff] border">
        {modal.type === "setting"&&<Configuration/>}
        {modal.type === "notification"&&<Notification/>}
      </div>
    </div>
  );
};

export default Drawer;
