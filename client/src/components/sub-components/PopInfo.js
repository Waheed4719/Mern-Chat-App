import React, { useState } from "react";
import { Popover } from "antd";

function PopInfo(props) {
  const [visible, setVisible] = useState(false);

  const hide = () => {
    setVisible(false);
  };

  const handleVisibleChange = (visible) => {
    setVisible(visible);
  };

  return (
    <>
      <Popover
        content={<p onClick={hide}>{props.alt} unavailable</p>}
        trigger="click"
        visible={visible}
        onVisibleChange={handleVisibleChange}
      >
        <div>
          <img src={props.image} alt="props" />
        </div>
      </Popover>
    </>
  );
}

export default PopInfo;
