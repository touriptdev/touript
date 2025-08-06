import React, { forwardRef } from "react";

const Menu1 = forwardRef((props, ref) => {
  return (
    <div ref={ref} className="px-16 py-8 flex flex-col gap-4 ">
      <span className="text-xl">When to do</span>
      <div className="flex items-center justify-between gap-8">
        <div>
          <label>
            <input name="myInput" placeholder="Enter Name" />
          </label>
          <label>
            <input name="myInput" placeholder="Enter Email" />
          </label>
          <label>
            <input name="myInput" placeholder="Enter Password" />
          </label>
        </div>
        <div>
          <label>
            <input name="myInput" placeholder="Enter Name" />
          </label>
          <label>
            <input name="myInput" placeholder="Enter Email" />
          </label>
          <label>
            <input name="myInput" placeholder="Enter Password" />
          </label>
          <label>
            <input name="myInput" placeholder="Enter Confirm Password" />
          </label>
        </div>
      </div>
    </div>
  );
});

export default Menu1;
