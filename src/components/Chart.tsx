import { Pie } from "@ant-design/plots";
import { useMemo } from "react";
import useUserStore from "../store/store";
import { Store } from "../types/global";
import { Button } from "antd";
import { Link } from "react-router-dom";

const Chart = () => {
  const { data: mainData } = useUserStore((state: Store) => state);

  const data = useMemo(() => {
    const cityObj = Array.from(
      new Set(mainData?.map((user) => user.address.city))
    )
      .map((city) => {
        return { [city]: 0 };
      })
      .reduce((obj, city) => {
        obj[Object.keys(city)[0]] = 0;
        return obj;
      }, {});

    mainData?.forEach(({ address: { city } }) => {
      if (cityObj[city]) {
        cityObj[city] += 1;
      } else {
        cityObj[city] += 1;
      }
    });

    const cityArr = Object.keys(cityObj).map((city) => {
      if (mainData) {
        const val = (100 * Number(cityObj[city])) / mainData?.length;
        return {
          type: city,
          value: Number(val.toFixed(2)),
        };
      } else {
        return {
          type: "no cities",
          value: 0,
        };
      }
    });

    return cityArr;
  }, [mainData]);

  const config = {
    appendPadding: 10,
    data,
    angleField: "value",
    colorField: "type",
    radius: 0.8,
    label: {
      type: "outer",
    },
    interactions: [
      {
        type: "element-active",
      },
    ],
  };
  return (
    <>
      <Button style={{ fontSize: "25px" }} type="link">
        <Link to={"/"}>Home</Link>
      </Button>
      <h1 style={{ textAlign: "center" }}>Users by City (Percentage %) </h1>
      <Pie {...config} />;
    </>
  );
};

export default Chart;
