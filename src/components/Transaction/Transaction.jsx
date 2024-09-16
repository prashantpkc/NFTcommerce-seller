import moment from "moment";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { CrossIcon, SearchIcon } from "../../assets/icon/Icons";
import { SkipPrevious } from "@mui/icons-material";

const Transaction = () => {
  const totalsell = useSelector(
    (state) => state.product?.soldCourses?.data || []
  );
  console.log(totalsell);
  const isDarkEnabled = useSelector((state) => state.darkmode.dark);
  const [serch, setSearch] = useState("");
  const [sale, setSale] = useState(totalsell);
  console.log(totalsell);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearch(query);
    if (query) {
      const filtered = sale.filter((item) =>
        item.items.some((sold)=>
            sold.productName.toLowerCase().includes(query)
        )
      );
      console.log(filtered)
      setSale(filtered);
    } else {
      setSale(totalsell);
    }
  };

  const clearSearch = () => {
    setSearch("");
    setSale(totalsell);
  };

  return (
    <div
      className={`w-full h-96 border ${
        isDarkEnabled ? "border-[#303030] " : "bg-[#ffffff]"
      }  rounded-2xl mb-2`}
    >
      <div
        className={`h-[15%] ${
          isDarkEnabled ? "border-b border-b-[#303030]" : "border-b"
        }  flex justify-between items-center px-4`}
      >
        <p
          className={`text-lg font-semibold ${
            isDarkEnabled ? "text-[#D3D3D3]" : "text-[#100f0f]"
          }`}
        >
          Transaction
        </p>
        <div className="flex px-2 gap-2 items-center">
          <div className="relative border rounded-full">
            <input
              type="text"
              value={serch}
              onChange={handleSearch}
              placeholder="Search..."
              className={`w-40 h-10 rounded-full  ${
                isDarkEnabled ? "bg-[#100f0f] text-[#D3D3D3]" : "text-[#D3D3D3]"
              } pl-10 focus:outline-none`}
            />
            <div className="absolute top-3 left-2">
              <SearchIcon color="#2e10dc" width="20" height="20" />
            </div>

            {serch && (
              <div
                onClick={clearSearch}
                className="absolute top-3 right-2 w-5 h-5 rounded-full bg-[#c9c8c8]"
              >
                <CrossIcon color="#2e10dc" width="20" height="20" />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="h-[85%] flex flex-wrap justify-between gap-2 p-2 overflow-y-auto">
        {sale.length > 0 ? (
          sale.map((item, index) =>
            item.items.map((sold, index) => (
              <div
                key={index}
                className="w-full md:w-[24%] h-full border rounded-2xl"
              >
                <div className="h-[20%] border-b px-2 flex justify-start items-center">
                  <div className="flex flex-start gap-2">
                    <div className="w-12 h-12 rounded-full bg-[#391515]">
                      <img
                        src={sold?.colorImageUrl}
                        alt=""
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                    <div className="">
                      <p
                        className={`text-lg font-bold ${
                          isDarkEnabled ? "text-[#D3D3D3]" : "text-[#100f0f]"
                        }`}
                      >
                        {item?.items[0].productName}
                      </p>
                      <p
                        className={`text-sm font-semibold ${
                          isDarkEnabled ? "text-[#D3D3D3]" : "text-[#100f0f]"
                        }`}
                      >
                        ₹{item?.items[0].price}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="h-[50%] border-b">
                  <img
                    src={sold?.colorImageUrl}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="h-[30%] p-1">
                  <div className="leading-5">
                    <div className="flex justify-between">
                      <p
                        className={`font-semibold ${
                          isDarkEnabled ? "text-[#D3D3D3]" : "text-[#100f0f]"
                        }`}
                      >
                        Qty/Size
                      </p>
                      <p className="font-semibold text-[#9595a3]">
                        {sold?.quantity}/{sold.size}
                      </p>
                    </div>
                    <div className="flex justify-between">
                      <p
                        className={`font-semibold ${
                          isDarkEnabled ? "text-[#D3D3D3]" : "text-[#100f0f]"
                        }`}
                      >
                        Buyer
                      </p>
                      <p className="font-semibold text-[#9595a3]">
                        {item?.userId?.name}
                      </p>
                    </div>
                    <div className="flex justify-between">
                      <p
                        className={`font-semibold ${
                          isDarkEnabled ? "text-[#D3D3D3]" : "text-[#100f0f]"
                        }`}
                      >
                        Order ID
                      </p>
                      <p className="font-semibold text-[#9595a3]">
                        {item?.orderId}
                      </p>
                    </div>
                    <div className="flex justify-between">
                      <p
                        className={`font-semibold ${
                          isDarkEnabled ? "text-[#D3D3D3]" : "text-[#100f0f]"
                        }`}
                      >
                        Date
                      </p>
                      <p className="font-semibold text-[#9595a3]">
                        {moment(item.orderDate).format("MMMM D, YYYY")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )
        ) : (
          <div className="w-full h-full flex justify-center items-center">
            <p
              className={`${
                isDarkEnabled ? "text-white" : "text-[#140505]"
              } text-2xl font-bold`}
            >
              No data found
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
export default Transaction;
