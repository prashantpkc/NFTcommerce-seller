import React from "react";
import { useSelector } from "react-redux";
import { CrossIcon } from "../../assets/icon/Icons";
import { useDispatch } from "react-redux";
import { openSettingModal } from "../../redux/slices/settingSlice";

export const Notification = () => {
  const auth = useSelector((state) => state.auth?.user);
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col h-full">
      <div className="w-full h-[12%] border-b border-[#fff] flex justify-between items-center px-4">
        <div className="flex gap-2 items-center">
          <div className="w-16 h-16">
            <img
              src={auth?.profile_pic}
              alt=""
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <div>
            <h3 className="font-bold text-[#01152061]">{auth?.email}</h3>
            <h6 className="text-xs font-semibold text-[#01152061]">
              {auth?.name}
            </h6>
          </div>
        </div>
        <div
          onClick={() => dispatch(openSettingModal({ open: false, type: "" }))}
          className="cursor-pointer"
        >
          <CrossIcon color="" width="24" height="24" />
        </div>
      </div>
      <div className="h-[88%]"></div>
    </div>
  );
};
