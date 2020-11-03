import React from 'react';
import Selector from '../../src';
const apiEdu = 'http://10.129.7.191:7300/mock/5f4c999a40a755002021ebc4/example/GetDataSource';
export default function () {
  const [edcatOption, setEdu] = React.useState<Array<any>>([]);

  React.useEffect(() => {
    fetch(apiEdu)
      .then((rsp) => rsp.json())
      .then((data) => {
        if (data?.length > 0) {
          const newData = data[0].dataSourceResults.map((data) => {
            return { ...data, id: Math.random(), isCheck: false, value: data?.text };
          });
          setEdu(newData);
        }
      })
      .catch((error) => {
        console.debug(error);
      });
  }, []);

  return <Selector options={edcatOption} />;
}
