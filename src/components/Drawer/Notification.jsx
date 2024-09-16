import React from "react";
import { useSelector } from "react-redux";
import { CheckDoubleIcon, CrossIcon } from "../../assets/icon/Icons";
import { useDispatch } from "react-redux";
import { openSettingModal } from "../../redux/slices/settingSlice";
import moment from "moment/moment";

export const Notification = () => {
  const auth = useSelector((state) => state.auth?.user);
  const soldCourses = useSelector((state) => state.product?.soldCourses?.data);
  console.log(soldCourses);
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
      <div className="h-[88%] overflow-y-auto">
        {soldCourses?.map((item, index) => (
          <div key={index} className="p-4">
            <div className="flex gap-2">
              <div className="w-12 h-8">
                <img
                  src={item.items[0].colorImageUrl}
                  alt=""
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div>
                <p className="text-xs text-[#1e88b9]">
                  {item?.userId?.name} has purchased {item.items[0].productName}{" "}
                  its size {item.items[0].size} and quantity is{" "}
                  {item.items[0].quantity} on {moment(item.createdAt).format("MMMM D, YYYY")}
                </p>
              </div>
            </div>
            <div className="flex justify-end">
              <CheckDoubleIcon color="#0e87f1" width="18" height="18"/>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
